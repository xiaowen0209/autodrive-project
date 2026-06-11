"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  RefreshCw, FolderSearch, Package, FlaskConical,
  ChevronRight, Search, Newspaper, Loader2, Zap, TrendingUp,
  Gauge, BookOpen, Trophy, AlertTriangle, Sparkles
} from "lucide-react";
import {
  feedItemsLegacy as feedItems, hotSchemes, versionTimeline, brands,
  tagConfig, compareSchemes, testRecords, bugList,
  type FeedTag, type BrandKey,
} from "@/lib/data";
import { FavoriteButton } from "@/components/favorite-button";
import { useNews, type NewsArticle } from "@/hooks/use-news";

function BrandLogo({ brandKey }: { brandKey: BrandKey }) {
  const b = brands[brandKey];
  if (!b) return null;
  return (
    <div className="w-5 h-5 rounded-sm flex items-center justify-center text-xs font-bold"
      style={{ background: b.bg, color: b.color }}>{b.letter}</div>
  );
}

function getCategoryStyle(category: string): string {
  const styles: Record<string, string> = {
    "OTA更新": "bg-primary/15 text-primary", "新车发布": "bg-accent/15 text-accent",
    "技术突破": "bg-success/15 text-success", "行业动态": "bg-warning/15 text-warning",
    "实测评测": "bg-destructive/15 text-destructive", "政策法规": "bg-muted text-foreground",
  };
  return styles[category] || "bg-muted text-muted-foreground";
}

function LiveNewsCard({ article }: { article: NewsArticle }) {
  const [timeAgo, setTimeAgo] = useState("");
  useEffect(() => {
    const calc = () => {
      const now = Date.now();
      const diff = now - new Date(article.published_at).getTime();
      const mins = Math.floor(diff / 60000);
      if (mins < 60) return `${mins}分钟前`;
      const hrs = Math.floor(mins / 60);
      if (hrs < 24) return `${hrs}小时前`;
      return `${Math.floor(hrs / 24)}天前`;
    };
    setTimeAgo(calc());
    const timer = setInterval(() => setTimeAgo(calc()), 60000);
    return () => clearInterval(timer);
  }, [article.published_at]);

  return (
    <div className="bg-card rounded-lg shadow-card p-4 hover:bg-card/80 transition-colors group">
      <div className="flex items-center gap-2 mb-2">
        <span className={`inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium ${getCategoryStyle(article.category)}`}>{article.category}</span>
        {article.brand && <span className="text-xs text-muted-foreground">{article.brand}</span>}
        <span className="text-xs text-muted-foreground/60">{timeAgo}</span>
        <span className="text-[10px] text-muted-foreground/40 ml-auto">{article.source}</span>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <FavoriteButton size="sm" item={{ id: `news-${article.id}`, type: "feed", title: article.title, subtitle: article.summary.slice(0, 50), url: article.url }} />
        </div>
      </div>
      <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-foreground mb-1 hover:text-primary transition-colors block">
        {article.title}
      </a>
      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{article.summary}</p>
    </div>
  );
}

// Mini radar chart using CSS/SVG
function MiniRadar({ schemes }: { schemes: typeof hotSchemes }) {
  const dims = ["城区", "高速", "泊车"];
  const keys = ["city", "highway", "parking"] as const;
  const size = 180, cx = size / 2, cy = size / 2, maxR = 65;
  const top4 = schemes.slice(0, 4);

  return (
    <div className="flex items-center gap-4">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {[0.4, 0.6, 0.8, 1].map(level => (
          <polygon key={level}
            points={dims.map((_, i) => {
              const a = (Math.PI * 2 * i) / 3 - Math.PI / 2;
              const r = maxR * level;
              return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
            }).join(" ")}
            fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"
          />
        ))}
        {dims.map((d, i) => {
          const a = (Math.PI * 2 * i) / 3 - Math.PI / 2;
          return (
            <text key={d} x={cx + (maxR + 18) * Math.cos(a)} y={cy + (maxR + 18) * Math.sin(a)} textAnchor="middle" dominantBaseline="middle" fill="#9AA7C7" fontSize="10">{d}</text>
          );
        })}
        {top4.map((s, si) => {
          const colors = ["#7C5CFF", "#69E7FF", "#62FAD3", "#FF6B6B"];
          const vals = keys.map(k => Number(s[k as keyof typeof s]) || 0);
          const avg = vals.reduce((a: number, b: number) => a + b, 0) / 3;
          const allVals = [...vals, avg];
          const points = dims.map((_, i) => {
            const a = (Math.PI * 2 * i) / 3 - Math.PI / 2;
            const r = (allVals[i] / 10) * maxR;
            return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
          }).join(" ");
          return <polygon key={si} points={points} fill={`${colors[si]}20`} stroke={colors[si]} strokeWidth="1.5" />;
        })}
      </svg>
      <div className="flex flex-col gap-1">
        {top4.map((s, si) => {
          const b = brands[s.brand];
          const avg = ((s.city + s.highway + s.parking) / 3).toFixed(1);
          const colors = ["#7C5CFF", "#69E7FF", "#62FAD3", "#FF6B6B"];
          return (
            <div key={si} className="flex items-center gap-2 text-xs">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ background: colors[si] }} />
              <span className="text-[#F7FAFF] font-medium">{b?.name}</span>
              <span className="text-[#9AA7C7]">{avg}</span>
            </div>
          );
        })}
        <Link href="/compare" className="text-primary text-xs hover:underline mt-1 inline-flex items-center gap-1">
          完整对比 <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState<FeedTag | "all">("all");
  const [refreshing, setRefreshing] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [feedMode, setFeedMode] = useState<"curated" | "live">("live");
  const [crawling, setCrawling] = useState(false);
  const { articles: liveNews, total: newsTotal, loading: newsLoading, refetch: refetchNews } = useNews(30);

  const computedStats = useMemo(() => ({
    schemeCount: compareSchemes.length,
    versionCount: versionTimeline.length,
    testCount: testRecords.length,
    brandCount: Object.keys(brands).length,
  }), []);

  const filteredFeed = useMemo(() => {
    let items = activeFilter === "all" ? feedItems : feedItems.filter(item => item.tag === activeFilter);
    if (globalSearch.trim()) {
      const q = globalSearch.toLowerCase();
      items = items.filter(item => item.title.toLowerCase().includes(q) || item.summary.toLowerCase().includes(q));
    }
    return items;
  }, [activeFilter, globalSearch]);

  const topSchemes = useMemo(() =>
    [...hotSchemes].sort((a, b) => ((b.city + b.highway + b.parking) / 3) - ((a.city + a.highway + a.parking) / 3)).slice(0, 3)
  , []);

  const handleRefresh = () => { setRefreshing(true); refetchNews(); setTimeout(() => setRefreshing(false), 800); };
  const handleCrawl = async () => {
    try { setCrawling(true); const res = await fetch("/api/news/crawl", { method: "POST" }); const data = await res.json(); if (data.success) refetchNews(); }
    catch {} finally { setCrawling(false); }
  };

  const filterTabs: { key: FeedTag | "all"; label: string }[] = [
    { key: "all", label: "全部" }, { key: "OTA", label: "OTA" }, { key: "实测", label: "实测" },
    { key: "评测", label: "评测" }, { key: "口碑", label: "口碑" }, { key: "行业", label: "行业" },
  ];

  return (
    <>
      {/* Hero Banner */}
      <div className="relative mb-8 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-card to-accent/5 border border-white/[0.06] overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">智能驾驶研究台</h1>
              <p className="text-sm text-muted-foreground">12大品牌 · 80+专业术语 · 实时资讯 · 多维对比</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            <Link href="/compare" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-all">
              <Gauge className="w-4 h-4" /> 方案对比
            </Link>
            <Link href="/versions" className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.06] text-foreground rounded-lg text-sm font-medium hover:bg-white/[0.1] transition-all">
              <Package className="w-4 h-4" /> 版本中心
            </Link>
            <Link href="/terminology" className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.06] text-foreground rounded-lg text-sm font-medium hover:bg-white/[0.1] transition-all">
              <BookOpen className="w-4 h-4" /> 术语百科
            </Link>
            <Link href="/visualization" className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.06] text-foreground rounded-lg text-sm font-medium hover:bg-white/[0.1] transition-all">
              <TrendingUp className="w-4 h-4" /> 数据可视化
            </Link>
          </div>
        </div>
      </div>

      {/* 搜索栏 */}
      {showSearch && (
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" value={globalSearch} onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="搜索动态标题或摘要..." autoFocus
              className="w-full pl-10 pr-4 py-2.5 bg-card rounded-lg border border-border/20 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30" />
            {globalSearch && <button onClick={() => { setGlobalSearch(""); setShowSearch(false); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground">清除</button>}
          </div>
        </div>
      )}

      {/* 模块1：统计 + 排行榜 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
        <Link href="/compare" className="bg-card rounded-lg shadow-card p-4 hover:bg-card/80 transition-colors cursor-pointer group">
          <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center mb-3"><FolderSearch className="w-4 h-4 text-primary" /></div>
          <p className="text-2xl font-bold text-foreground">{computedStats.schemeCount}</p>
          <p className="text-xs text-muted-foreground mt-1">监测方案</p>
        </Link>
        <Link href="/versions" className="bg-card rounded-lg shadow-card p-4 hover:bg-card/80 transition-colors cursor-pointer group">
          <div className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center mb-3"><Package className="w-4 h-4 text-accent" /></div>
          <p className="text-2xl font-bold text-foreground">{computedStats.versionCount}</p>
          <p className="text-xs text-muted-foreground mt-1">版本更新</p>
        </Link>
        <Link href="/testing" className="bg-card rounded-lg shadow-card p-4 hover:bg-card/80 transition-colors cursor-pointer group">
          <div className="w-9 h-9 rounded-lg bg-success/15 flex items-center justify-center mb-3"><FlaskConical className="w-4 h-4 text-success" /></div>
          <p className="text-2xl font-bold text-foreground">{computedStats.testCount}</p>
          <p className="text-xs text-muted-foreground mt-1">实测记录</p>
        </Link>
        <Link href="/terminology" className="bg-card rounded-lg shadow-card p-4 hover:bg-card/80 transition-colors cursor-pointer group">
          <div className="w-9 h-9 rounded-lg bg-warning/15 flex items-center justify-center mb-3"><BookOpen className="w-4 h-4 text-warning" /></div>
          <p className="text-2xl font-bold text-foreground">80+</p>
          <p className="text-xs text-muted-foreground mt-1">专业术语</p>
        </Link>
      </div>

      {/* 模块2：三栏布局 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* 左栏：动态Feed */}
        <div className="col-span-1 md:col-span-7">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-base font-semibold text-foreground">最新动态{globalSearch && <span className="ml-2 text-xs text-muted-foreground font-normal">找到 {filteredFeed.length} 条</span>}</h2>
              <div className="flex items-center bg-muted rounded-md p-0.5">
                <button onClick={() => setFeedMode("live")} className={`px-2.5 py-1 rounded text-xs font-medium transition-all inline-flex items-center gap-1.5 ${feedMode === "live" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                  <Zap className="w-3 h-3" />实时{newsTotal > 0 && <span className={`text-[10px] px-1 py-0 rounded-full ${feedMode === "live" ? "bg-primary-foreground/20" : "bg-muted-foreground/20"}`}>{newsTotal}</span>}
                </button>
                <button onClick={() => setFeedMode("curated")} className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${feedMode === "curated" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>精选</button>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setShowSearch(!showSearch)} className="bg-muted text-foreground px-3 py-2 rounded-md text-sm font-medium hover:bg-muted/80 transition-all inline-flex items-center gap-2"><Search className="w-3.5 h-3.5" />搜索</button>
              <button onClick={handleRefresh} className="bg-muted text-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-muted/80 transition-all inline-flex items-center gap-2"><RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />刷新</button>
              {feedMode === "live" && (
                <button onClick={handleCrawl} disabled={crawling} className="px-2.5 py-1 rounded-md text-xs font-medium text-primary hover:bg-primary/10 transition-colors inline-flex items-center gap-1 disabled:opacity-50">
                  {crawling ? <Loader2 className="w-3 h-3 animate-spin" /> : <Newspaper className="w-3 h-3" />}{crawling ? "抓取中..." : "抓取最新"}
                </button>
              )}
              {feedMode === "curated" && filterTabs.map(tab => (
                <button key={tab.key} onClick={() => setActiveFilter(tab.key)} className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${activeFilter === tab.key ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"}`}>{tab.label}</button>
              ))}
            </div>
          </div>

          {feedMode === "live" && (
            <>
              {newsLoading ? (
                <div className="bg-card rounded-lg shadow-card p-8 text-center"><Loader2 className="w-5 h-5 animate-spin text-primary mx-auto mb-2" /><p className="text-sm text-muted-foreground">加载实时新闻...</p></div>
              ) : liveNews.length === 0 ? (
                <div className="bg-card rounded-lg shadow-card p-8 text-center"><Newspaper className="w-8 h-8 text-muted-foreground/40 mx-auto mb-3" /><p className="text-sm text-muted-foreground mb-3">暂无实时新闻</p>
                  <button onClick={handleCrawl} disabled={crawling} className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 inline-flex items-center gap-2 disabled:opacity-50">{crawling ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5" />}立即抓取</button>
                </div>
              ) : (
                <div className="space-y-3">{liveNews.map(article => <LiveNewsCard key={article.id} article={article} />)}</div>
              )}
            </>
          )}
          {feedMode === "curated" && (
            <>
              {filteredFeed.length === 0 ? (
                <div className="bg-card rounded-lg shadow-card p-8 text-center"><p className="text-muted-foreground">暂无匹配的动态</p></div>
              ) : (
                <div className="space-y-3">
                  {filteredFeed.map((item, idx) => (
                    <div key={idx} className="bg-card rounded-lg shadow-card p-4 hover:bg-card/80 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs text-muted-foreground">{item.date}</span>
                        <BrandLogo brandKey={item.brand} />
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium ${tagConfig[item.tag].className}`}>{tagConfig[item.tag].label}</span>
                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                          <FavoriteButton size="sm" item={{ id: `feed-${idx}`, type: "feed", title: item.title, subtitle: item.summary.slice(0, 50), url: "/" }} />
                        </div>
                      </div>
                      <h3 className="text-sm font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.summary}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* 右栏 */}
        <div className="col-span-1 md:col-span-5 space-y-6">
          {/* 排行榜 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-foreground inline-flex items-center gap-2"><Trophy className="w-4 h-4 text-warning" />综合排行</h2>
              <Link href="/compare" className="text-xs text-primary hover:underline inline-flex items-center gap-1">查看全部<ChevronRight className="w-3 h-3" /></Link>
            </div>
            <div className="space-y-2">
              {topSchemes.map((s, i) => {
                const b = brands[s.brand]; if (!b) return null;
                const avg = ((s.city + s.highway + s.parking) / 3).toFixed(1);
                const medals = ["🏅", "🥈", "🥉"];
                return (
                  <Link key={i} href="/compare" className="bg-card rounded-lg shadow-card p-3 flex items-center gap-3 hover:bg-card/80 transition-colors">
                    <span className="text-lg">{medals[i]}</span>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: b.bg, color: b.color }}>{b.letter}</div>
                    <div className="flex-1"><p className="text-sm font-semibold text-foreground">{b.name}</p><p className="text-xs text-muted-foreground">{s.version}</p></div>
                    <div className="text-right"><p className="text-lg font-bold" style={{ color: b.color }}>{avg}</p><p className="text-[10px] text-muted-foreground">综合分</p></div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* 迷你雷达图 */}
          <div>
            <h2 className="text-base font-semibold text-foreground mb-4 inline-flex items-center gap-2"><Gauge className="w-4 h-4 text-primary" />能力雷达</h2>
            <div className="bg-card rounded-lg shadow-card p-4"><MiniRadar schemes={hotSchemes} /></div>
          </div>

          {/* 版本时间线 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-foreground">近期版本更新</h2>
              <Link href="/versions" className="text-xs text-primary hover:underline inline-flex items-center gap-1">版本中心<ChevronRight className="w-3 h-3" /></Link>
            </div>
            <div className="relative pl-6">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border/30" />
              {versionTimeline.slice(0, 5).map((item, idx) => {
                const b = brands[item.brand]; if (!b) return null;
                return (
                  <div key={idx} className={`relative ${idx < Math.min(versionTimeline.length, 5) - 1 ? "pb-5" : ""}`}>
                    <div className="absolute left-[-18px] top-1.5 w-3 h-3 rounded-full border-2 border-background" style={{ backgroundColor: item.dotColor || b.color }} />
                    <div className="bg-card rounded-lg shadow-card p-3.5 group">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <BrandLogo brandKey={item.brand} />
                          <span className="text-sm font-semibold text-foreground">{b.name} {item.version}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <FavoriteButton size="sm" item={{ id: `version-${idx}`, type: "version", title: `${b.name} ${item.version}`, subtitle: Array.isArray(item.highlights) ? item.highlights[0] : undefined, url: "/versions" }} />
                          </div>
                          <span className="text-xs text-muted-foreground">{item.date}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{Array.isArray(item.highlights) ? item.highlights.join("、") : item.highlights}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 问题追踪 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-foreground inline-flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-destructive" />问题追踪</h2>
              <Link href="/testing" className="text-xs text-primary hover:underline inline-flex items-center gap-1">查看全部<ChevronRight className="w-3 h-3" /></Link>
            </div>
            <div className="space-y-2">
              {bugList.slice(0, 4).map((bug, idx) => {
                const b = brands[bug.brand]; if (!b) return null;
                return (
                  <div key={idx} className="bg-card rounded-lg shadow-card p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <BrandLogo brandKey={bug.brand} />
                      <span className="text-xs font-medium text-foreground">{b.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${bug.level === "P0" ? "bg-destructive/15 text-destructive" : bug.level === "P1" ? "bg-warning/15 text-warning" : "bg-accent/15 text-accent"}`}>{bug.level}</span>
                      <span className="text-[10px] text-muted-foreground ml-auto">{bug.date}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{bug.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
