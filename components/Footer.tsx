import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="text-sm font-extrabold">☀️ 원룸 태양광 실험실</p>
            <p className="mt-2 text-[13px] leading-6 text-stone-500">
              낮은 전압 DC · 센서 측정 · 로그 기록 중심의
              <br />
              안전한 첫 전기 실험실입니다.
            </p>
            <p className="mt-3 inline-block rounded-full bg-red-50 border border-red-200 px-3 py-1 text-[12px] font-bold text-red-700">
              220V · 인버터 · 리튬충전은 다루지 않음
            </p>
          </div>
          <nav aria-label="푸터 내비게이션" className="grid grid-cols-2 gap-2 text-sm">
            <Link className="rounded-lg px-2 py-1.5 font-semibold text-stone-600 hover:bg-stone-100" href="/docs">실험 가이드</Link>
            <Link className="rounded-lg px-2 py-1.5 font-semibold text-stone-600 hover:bg-stone-100" href="/curriculum">커리큘럼</Link>
            <Link className="rounded-lg px-2 py-1.5 font-semibold text-stone-600 hover:bg-stone-100" href="/hardware">부품 도감</Link>
            <Link className="rounded-lg px-2 py-1.5 font-semibold text-stone-600 hover:bg-stone-100" href="/workbook">문제은행</Link>
            <Link className="rounded-lg px-2 py-1.5 font-semibold text-stone-600 hover:bg-stone-100" href="/calculator">옴의법칙 계산기</Link>
            <Link className="rounded-lg px-2 py-1.5 font-semibold text-stone-600 hover:bg-stone-100" href="/gallery">그림 자료</Link>
          </nav>
          <div className="text-[13px] leading-6 text-stone-500">
            <p className="font-bold text-stone-700">학습 원칙</p>
            <p className="mt-1">“처음에는 전기를 많이 쓰는 사람이 아니라, 전기를 정확히 보는 사람이 된다.”</p>
            <p className="mt-3 text-[12px]">정적 웹페이지 · 로그인 없음 · 수집 없음</p>
          </div>
        </div>
        <p className="mt-8 border-t border-stone-100 pt-4 text-center text-[12px] text-stone-400">
          solar-esp32-lab · SNP-5MA 6V 5W · ESP32 DevKitC · Vercel 정적 호스팅
        </p>
      </div>

      {/* 모바일 하단 바로가기 */}
      <nav
        aria-label="모바일 하단 바로가기"
        className="sticky bottom-0 grid grid-cols-5 gap-px border-t border-stone-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
      >
        {[
          { href: '/', label: '홈', icon: '🏠' },
          { href: '/docs', label: '실험', icon: '🧪' },
          { href: '/calculator', label: '계산기', icon: '🧮' },
          { href: '/workbook', label: '문제', icon: '📝' },
          { href: '/hardware', label: '부품', icon: '🧰' },
        ].map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className="flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-bold text-stone-600 active:bg-stone-100"
          >
            <span className="text-lg leading-none">{n.icon}</span>
            {n.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
