'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV = [
  { href: '/docs', label: '실험 가이드' },
  { href: '/curriculum', label: '커리큘럼' },
  { href: '/hardware', label: '부품 도감' },
  { href: '/workbook', label: '문제은행' },
  { href: '/calculator', label: '계산기' },
  { href: '/gallery', label: '그림' },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-white/85 backdrop-blur-lg">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-lg shadow-sm">
            ☀️
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[15px] font-extrabold tracking-tight">
              원룸 태양광 실험실
            </span>
            <span className="block truncate text-[11px] font-medium text-stone-500">
              ESP32 · INA219 · BH1750
            </span>
          </span>
        </Link>

        {/* 데스크톱 내비 */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="주 내비게이션">
          {NAV.map((n) => {
            const active = pathname === n.href || pathname?.startsWith(n.href + '/');
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                  active
                    ? 'bg-stone-900 text-white'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/docs/02-safety-rules"
            className="hidden rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700 sm:block"
          >
            ⛑️ 안전 먼저
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
            className="grid h-10 w-10 place-items-center rounded-xl border border-stone-200 bg-white text-lg font-bold text-stone-700 active:scale-95 lg:hidden"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* 모바일 내비 */}
      {open && (
        <nav
          className="border-t border-stone-100 bg-white px-4 pb-5 pt-3 lg:hidden"
          aria-label="모바일 내비게이션"
        >
          <div className="grid grid-cols-2 gap-2">
            {NAV.map((n) => {
              const active = pathname === n.href || pathname?.startsWith(n.href + '/');
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-2xl border px-4 py-3 text-center text-sm font-bold active:scale-[0.98] ${
                    active
                      ? 'border-stone-900 bg-stone-900 text-white'
                      : 'border-stone-200 bg-stone-50 text-stone-700'
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </div>
          <Link
            href="/docs/02-safety-rules"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-bold text-red-700"
          >
            ⛑️ 안전 수칙 먼저 읽기 (220V 금지)
          </Link>
        </nav>
      )}
    </header>
  );
}
