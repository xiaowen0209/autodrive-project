import { NextRequest, NextResponse } from 'next/server';
import { hasCozeSDK, localFetch } from '../local-fallback';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: '请提供有效的URL' }, { status: 400 });
    }

    // Try Coze SDK first
    if (hasCozeSDK()) {
      try {
        const { FetchClient, LLMClient, Config, HeaderUtils } = require('coze-coding-dev-sdk');
        const config = new Config();
        const h = HeaderUtils.extractForwardHeaders(request.headers);
        const fetchClient = new FetchClient(config, h);
        const resp = await fetchClient.fetch(url);
        if (resp.status_code !== 0) throw new Error(resp.status_message || '抓取失败');
        const text = resp.content.filter((item: any) => item.type === 'text').map((item: any) => item.text || '').join('\n');
        const llm = new LLMClient(config, h);
        const llmResp = await llm.invoke([
          { role: 'system', content: '从文章提取关键信息，返回JSON：{title,summary,keyPoints,dataPoints,brands,sentiment,credibility,isMarketing,tags}' },
          { role: 'user', content: text.slice(0, 8000) },
        ]);
        const jsonMatch = (llmResp.content || '').match(/```(?:json)?\s*([\s\S]*?)```/) || [null, llmResp.content || '{}'];
        let analysis: any;
        try { analysis = JSON.parse(jsonMatch[1].trim()); } catch { analysis = { rawText: llmResp.content }; }
        return NextResponse.json({ url, title: resp.title || '', publishTime: resp.publish_time || '', analysis, textLength: text.length });
      } catch { /* fallback */ }
    }

    // Local fallback: fetch + basic analysis
    const result = await localFetch(url);

    // Extract brands
    const brandMap: Record<string, string[]> = {
      '华为ADS': ['华为', 'ADS', '问界', '鸿蒙智驾'], '小鹏XNGP': ['小鹏', 'XNGP', 'G9', 'P7'],
      '特斯拉FSD': ['特斯拉', 'FSD', 'Model'], '理想AD Max': ['理想', 'AD Max', 'L7', 'L6'],
      '小米智驾': ['小米', 'SU7', 'Pilot'], '地平线HSD': ['地平线', 'HSD', '征程', 'J6P'],
      '比亚迪': ['比亚迪', 'BYD', '天神之眼'],
    };
    const brands: string[] = [];
    for (const [b, kws] of Object.entries(brandMap)) {
      if (kws.some(k => result.text.includes(k))) brands.push(b);
    }

    // Extract dates
    const dates = result.text.match(/(\d{4}[-/年]\d{1,2}[-/月]\d{1,2})/g) || [];

    // Extract numbers/parameters
    const params = result.text.match(/(\d+[\d,]*TOPS|\d+nm|\d+万像素|\d+个(?:摄像头|雷达|传感器)|L\d级)/g) || [];

    const analysis = {
      title: result.title,
      summary: result.text.slice(0, 300),
      keyPoints: result.text.match(/[^。！？.!?]+[。！？.!?]/g)?.slice(0, 5).map((s: string) => s.trim()) || [],
      dataPoints: params.map((p: string) => ({ key: '参数', value: p, context: '' })),
      brands,
      sentiment: '中性',
      credibility: '中',
      isMarketing: false,
      tags: brands,
      dates: [...new Set(dates)],
    };

    return NextResponse.json({ url, title: result.title, publishTime: dates[0] || '', analysis, textLength: result.text.length });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : '分析失败';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
