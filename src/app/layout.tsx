import type { Metadata } from "next";
import "./globals.css";
import { ClientShell } from "@/components/client-shell";
import { DevInspector } from "@/components/dev-inspector";

export const metadata: Metadata = {
  title: "智驾研究台",
  description: "个人自用智能驾驶研究专用平台 - 方案对比·版本追踪·实测测评",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased bg-background text-foreground">
        <DevInspector />
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
