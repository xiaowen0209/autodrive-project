"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Cpu,
  Search,
  LayoutDashboard,
  GitCompareArrows,
  Layers,
  FlaskConical,
  Globe,
  BookOpen,
  BarChart3,
  TableProperties,
  Clock,
  Scale,
  Bookmark,
  Menu,
  X,
} from "lucide-react";
import { ToastContainer } from "@/components/toast";

const navItems = [
  { href: "/", label: "首页动态", icon: LayoutDashboard },
  { href: "/compare", label: "方案对比", icon: GitCompareArrows },
  { href: "/features", label: "功能矩阵", icon: TableProperties },
  { href: "/versions", label: "版本中心", icon: Layers },
  { href: "/ota", label: "OTA追踪", icon: Clock },
  { href: "/testing", label: "实测测评", icon: FlaskConical },
  { href: "/visualization", label: "数据可视化", icon: BarChart3 },
  { href: "/terminology", label: "术语百科", icon: BookOpen },
  { href: "/regulations", label: "法规标准", icon: Scale },
  { href: "/crawl", label: "数据采集", icon: Globe },
  { href: "/favorites", label: "我的收藏", icon: Bookmark },
];

export function AppSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="w-52 shrink-0 bg-card/60 backdrop-blur-md border-r border-border/20 overflow-y-auto h-full">
      <div className="p-3 space-y-0.5">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                isActive
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </div>
      <div className="mt-6 mx-3 pt-4 border-t border-border/20">
        <p className="text-xs text-muted-foreground/60 px-3 mb-2">快捷标签</p>
        <div className="flex flex-wrap gap-1.5 px-3">
          <Link href="/compare" onClick={onClose} className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs hover:bg-primary/20 transition-colors">华为</Link>
          <Link href="/compare" onClick={onClose} className="px-2 py-0.5 rounded-md bg-accent/10 text-accent text-xs hover:bg-accent/20 transition-colors">特斯拉</Link>
          <Link href="/compare" onClick={onClose} className="px-2 py-0.5 rounded-md bg-success/10 text-success text-xs hover:bg-success/20 transition-colors">小鹏</Link>
          <Link href="/compare" onClick={onClose} className="px-2 py-0.5 rounded-md bg-warning/10 text-warning text-xs hover:bg-warning/20 transition-colors">理想</Link>
          <Link href="/compare" onClick={onClose} className="px-2 py-0.5 rounded-md bg-destructive/10 text-destructive text-xs hover:bg-destructive/20 transition-colors">比亚迪</Link>
          <Link href="/compare" onClick={onClose} className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs hover:bg-primary/20 transition-colors">地平线</Link>
          <Link href="/terminology" onClick={onClose} className="px-2 py-0.5 rounded-md bg-success/10 text-success text-xs hover:bg-success/20 transition-colors">术语</Link>
        </div>
      </div>
    </aside>
  );
}

export function AppHeader({ onMenuToggle }: { onMenuToggle?: () => void }) {
  return (
    <header className="bg-card/80 backdrop-blur-xl sticky top-0 z-40 h-14 flex items-center justify-between px-4 md:px-5 border-b border-border/20">
      <div className="flex items-center gap-2.5">
        {onMenuToggle && (
          <button
            onClick={onMenuToggle}
            className="md:hidden w-8 h-8 rounded-md bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
          >
            <Menu className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
        <div className="w-7 h-7 rounded-md bg-primary/20 flex items-center justify-center">
          <Cpu className="text-primary w-4 h-4" />
        </div>
        <span className="font-bold text-sm tracking-wide">智驾研究台</span>
      </div>
      <div className="flex items-center gap-2 md:gap-3">
        <Link
          href="/crawl"
          className="w-8 h-8 rounded-md bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
          title="数据采集搜索"
        >
          <Search className="w-4 h-4 text-muted-foreground" />
        </Link>
        <Link
          href="/favorites"
          className="w-8 h-8 rounded-md bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
          title="我的收藏"
        >
          <Bookmark className="w-4 h-4 text-muted-foreground" />
        </Link>
        <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary">
          研
        </div>
      </div>
    </header>
  );
}
