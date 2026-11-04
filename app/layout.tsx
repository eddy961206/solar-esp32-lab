import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: { default: '태양광 작업대 — 만들면서 배우는 전기', template: '%s · 태양광 작업대' },
  description: '서랍 속 태양광 키트로 시작하는 미션형 전기 실습. 3D 작업대에서 전류가 흐르는 걸 보고, 작동시키면서 배운다.',
  metadataBase: new URL('https://solar-esp32-lab.vercel.app'),
  openGraph: { title: '태양광 작업대', description: '작동시키면서 배우는 첫 전기 실습', type: 'website', locale: 'ko_KR' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f3ec' },
    { media: '(prefers-color-scheme: dark)', color: '#16171a' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <header className="site-head">
          <Link href="/" className="brand"><span aria-hidden>☀︎</span> 태양광 작업대</Link>
          <nav>
            <Link href="/">미션</Link>
            <Link href="/parts">부품 서랍</Link>
            <Link href="/traits">특성 카드</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="site-foot">
          낮은 전압 직류만 다룬다. 220V 콘센트, 배전반, 리튬 배터리 충전 회로는 이 사이트만 보고 만지지 않는다.
        </footer>
      </body>
    </html>
  );
}
