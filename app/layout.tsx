import type { Metadata, Viewport } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '원룸 태양광 실험실 — ESP32로 배우는 첫 전기 실험',
    template: '%s · 원룸 태양광 실험실',
  },
  description:
    '어려운 말 없이 배우는 전기 첫걸음. SNP-5MA 패널 · ESP32 · INA219 · BH1750 5일 따라하기, 쉬운 부품 도감, 용어 사전, 150문제, 계산기 포함.',
  metadataBase: new URL('https://solar-esp32-lab.vercel.app'),
  openGraph: {
    title: '원룸 태양광 실험실',
    description: '전기를 정확히 보는 사람이 되는 첫 실험 — 모바일 지원 웹 가이드',
    type: 'website',
    locale: 'ko_KR',
    images: [{ url: '/images/01-lab-overview.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#f59e0b',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-dvh flex flex-col">
        <Header />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-10 sm:px-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
