import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ErrorBoundary from "@/components/ErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DeepKnow (深知) - A2A 隐性知识微交易网络",
  description: "基于 SecondMe OAuth 的知识交易平台，采用中心化信令 + 去中心化执行的混合架构",
  keywords: ["知识交易", "区块链", "Solana", "SecondMe", "OAuth", "Web3"],
  authors: [{ name: "DeepKnow Team" }],
  openGraph: {
    title: "DeepKnow (深知) - A2A 隐性知识微交易网络",
    description: "基于 SecondMe OAuth 的知识交易平台",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#4f46e5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased gradient-mesh-bg grid-pattern-bg`}
      >
        {/* 环境光晕效果 */}
        <div className="ambient-glow" aria-hidden="true" />

        <ErrorBoundary>
          <Navbar />
          <main className="min-h-screen relative">
            {children}
          </main>
        </ErrorBoundary>
      </body>
    </html>
  );
}
