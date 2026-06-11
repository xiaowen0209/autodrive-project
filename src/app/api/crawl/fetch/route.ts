import { NextRequest, NextResponse } from 'next/server';
import { hasCozeSDK, localFetch } from '../local-fallback';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: '请提供有效的URL' }, { status: 400 });
    }

    let parsedUrl: URL;
    try { parsedUrl = new URL(url); if (!['http:', 'https:'].includes(parsedUrl.protocol)) throw new Error(); }
    catch { return NextResponse.json({ error: 'URL格式不正确' }, { status: 400 }); }

    // Try Coze SDK first, fall back to local
    if (hasCozeSDK()) {
      try {
        const { FetchClient, Config, HeaderUtils } = require('coze-coding-dev-sdk');
        const config = new Config();
        const client = new FetchClient(config, HeaderUtils.extractForwardHeaders(request.headers));
        const response = await client.fetch(url);
        if (response.status_code !== 0) throw new Error(response.status_message || '抓取失败');
        const textParts: string[] = [];
        for (const item of response.content) { if (item.type === 'text' && item.text) textParts.push(item.text); }
        return NextResponse.json({
          title: response.title || '', url: response.url || url, publishTime: response.publish_time || '',
          text: textParts.join('\n').slice(0, 15000), textLength: textParts.join('\n').length,
          images: [], links: [], imageCount: 0, linkCount: 0,
        });
      } catch { /* fallback to local */ }
    }

    // Local fallback
    const result = await localFetch(url);
    return NextResponse.json({
      title: result.title, url, publishTime: '', text: result.text, textLength: result.text.length,
      images: [], links: [], imageCount: 0, linkCount: 0,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : '抓取失败';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
