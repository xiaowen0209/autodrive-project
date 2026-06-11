// ==========================================
// 爬虫引擎 — Coze SDK / Scrapling Python / Native fallback
// ==========================================
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);
const PYTHON = 'C:/Users/86198/AppData/Local/Programs/Python/Python312/python.exe';
const SCRAPER = 'C:/Users/86198/Desktop/autodrive-project/scripts/scraper.py';

export function hasCozeSDK(): boolean {
  return !!process.env.COZE_API_BASE && !!process.env.COZE_API_TOKEN;
}

/** Call Python Scrapling scraper */
async function callScraper(cmd: string, arg: string): Promise<any> {
  try {
    const { stdout } = await execFileAsync(PYTHON, [SCRAPER, cmd, arg], {
      timeout: 30000, maxBuffer: 5 * 1024 * 1024,
    });
    // The scraper outputs log lines before JSON, find the JSON
    const lines = stdout.split('\n');
    for (let i = lines.length - 1; i >= 0; i--) {
      try { return JSON.parse(lines[i]); } catch { continue; }
    }
    throw new Error('No valid JSON in output');
  } catch (e: any) {
    // Fall back to native fetch if Python fails
    return null;
  }
}

export async function localFetch(url: string) {
  // Try Python Scrapling first
  const result = await callScraper('fetch', url);
  if (result && result.success) {
    return { title: result.title, description: result.description || '', text: result.text, url };
  }

  // Native fallback
  const resp = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AutoDriveBot/1.0)' },
    signal: AbortSignal.timeout(15000)
  });
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  const html = await resp.text();
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';
  const descMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]+)"/i);
  const text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 10000);
  return { title, description: descMatch?.[1] || '', text, url };
}

export async function localSearch(query: string, count: number = 10) {
  const result = await callScraper('search', query);
  if (result && result.success && result.results) return result.results;

  // Native Bing fallback
  const searchUrl = `https://cn.bing.com/search?q=${encodeURIComponent(query + ' 智能驾驶')}&count=${count}&setlang=zh-cn`;
  const resp = await fetch(searchUrl, { headers: { 'User-Agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(10000) });
  const html = await resp.text();
  const results: any[] = [];
  const blocks = html.split('<li class="b_algo"');
  for (let i = 1; i < blocks.length && results.length < count; i++) {
    const block = blocks[i];
    const urlMatch = block.match(/href="(https?:\/\/[^"]+)"/);
    if (!urlMatch || urlMatch[1].includes('bing.com')) continue;
    const titleMatch = block.match(/<h2>[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/i);
    const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';
    if (!title) continue;
    const snippetMatch = block.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    const snippet = snippetMatch ? snippetMatch[1].replace(/<[^>]+>/g, '').trim() : '';
    results.push({ title, url: urlMatch[1], snippet, siteName: '网页', publishTime: '' });
  }
  return results;
}
