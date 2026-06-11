import { NextRequest, NextResponse } from 'next/server';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);
const PYTHON = 'C:/Users/86198/AppData/Local/Programs/Python/Python312/python.exe';
const SCRAPER = 'C:/Users/86198/Desktop/autodrive-project/scripts/scraper.py';

export async function POST(request: NextRequest) {
  try {
    const { query, count = 10 } = await request.json();
    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: '请提供搜索关键词' }, { status: 400 });
    }

    // Use Python Scrapling directly
    let results: any[] = [];
    try {
      const { stdout } = await execFileAsync(PYTHON, [SCRAPER, 'search', query, String(count)], {
        timeout: 30000, maxBuffer: 5 * 1024 * 1024,
      });
      // Find JSON in output (skip log lines)
      const lines = stdout.split('\n');
      for (let i = lines.length - 1; i >= 0; i--) {
        try {
          const data = JSON.parse(lines[i]);
          if (data.success && data.results) {
            results = data.results.map((r: any) => ({
              title: r.title, url: r.url, snippet: r.snippet || '', summary: '',
              siteName: r.source || '网页', publishTime: '', content: '', authInfo: '', authLevel: 0,
            }));
          }
          break;
        } catch { continue; }
      }
    } catch (e: any) {
      console.error('Python scraper error:', e.message);
    }

    // Fallback: native fetch if Python fails
    if (results.length === 0) {
      const searchUrl = `https://cn.bing.com/search?q=${encodeURIComponent(query + ' 智能驾驶')}&count=${count}&setlang=zh-cn`;
      const resp = await fetch(searchUrl, { headers: { 'User-Agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(10000) });
      const html = await resp.text();
      const blocks = html.split('<li class="b_algo"');
      for (let i = 1; i < blocks.length && results.length < count; i++) {
        const block = blocks[i];
        const urlMatch = block.match(/href="(https?:\/\/[^"]+)"/);
        if (!urlMatch || urlMatch[1].includes('bing.com')) continue;
        const titleMatch = block.match(/<h2>[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/i);
        const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';
        if (!title) continue;
        const snippetMatch = block.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
        results.push({
          title, url: urlMatch[1], snippet: snippetMatch?.[1]?.replace(/<[^>]+>/g, '').trim() || '',
          siteName: '网页', publishTime: '', summary: '', content: '', authInfo: '', authLevel: 0,
        });
      }
    }

    return NextResponse.json({ query, results, resultCount: results.length });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || '搜索失败' }, { status: 500 });
  }
}
