import Image from 'next/image';
import Link from 'next/link';
import { CURRICULUM_ORDER, DOCS_ORDER, HARDWARE_ORDER } from '@/lib/content';

const STATS = [
  { v: '5일', l: '손 실습 루트' },
  { v: '3권', l: '전기→IoT→태양광' },
  { v: '150', l: '연습 문제' },
  { v: '60', l: '프로젝트 아이디어' },
];

const JOURNEY = [
  { d: 'Day 1', t: '패널 극성과 전압 재기', s: '04-day1-panel-multimeter', c: 'bg-amber-100 text-amber-900' },
  { d: 'Day 2', t: '배선과 시멘트 저항 부하', s: '05-day2-wire-and-load', c: 'bg-orange-100 text-orange-900' },
  { d: 'Day 3', t: 'INA219로 전압·전류 읽기', s: '06-day3-ina219', c: 'bg-sky-100 text-sky-900' },
  { d: 'Day 4', t: 'BH1750으로 밝기 읽기', s: '07-day4-bh1750', c: 'bg-emerald-100 text-emerald-900' },
  { d: 'Day 5', t: 'ESP32 시리얼 로그 저장', s: '08-day5-esp32-serial', c: 'bg-violet-100 text-violet-900' },
];

export default function Home() {
  return (
    <div className="space-y-10 pt-6 sm:pt-10">
      {/* 히어로 */}
      <section className="overflow-hidden rounded-3xl border border-amber-200/70 bg-gradient-to-br from-amber-50 via-orange-50 to-sky-50 shadow-sm">
        <div className="grid gap-6 p-6 sm:p-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/70 bg-white/80 px-3 py-1 text-[12px] font-bold text-amber-800">
              ☀️ 6V 5W 패널 · ESP32 · INA219 · BH1750
            </p>
            <h1 className="mt-4 text-[28px] font-black leading-[1.15] tracking-tight sm:text-5xl sm:leading-[1.1]">
              전기를 모으기 전에,
              <br />
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                정확히 보는 법
              </span>
              부터.
            </h1>
            <p className="mt-4 text-[15px] leading-7 text-stone-600 sm:text-base">
              멀티미터로 패널 전압을 재고, 저항 부하를 걸고, ESP32로 숫자를 읽어 CSV에
              저장하는 5일 입문 실험실. 모바일에서도 편하게 따라할 수 있게
              웹으로 정리했습니다.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Link
                href="/docs/04-day1-panel-multimeter"
                className="rounded-2xl bg-stone-900 px-5 py-3.5 text-center text-[15px] font-bold text-white shadow-lg active:scale-[0.98]"
              >
                🧪 Day 1부터 시작하기
              </Link>
              <Link
                href="/curriculum"
                className="rounded-2xl border border-stone-300 bg-white px-5 py-3.5 text-center text-[15px] font-bold text-stone-800 active:scale-[0.98]"
              >
                📚 3권 커리큘럼 보기
              </Link>
            </div>
            <dl className="mt-6 grid grid-cols-4 gap-2">
              {STATS.map((s) => (
                <div key={s.l} className="rounded-2xl border border-white/60 bg-white/70 px-2 py-3 text-center backdrop-blur">
                  <dt className="order-2 mt-1 block text-[11px] font-semibold text-stone-500">{s.l}</dt>
                  <dd className="text-xl font-black text-stone-900 sm:text-2xl">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-white/60 shadow-xl">
              <Image
                src="/images/01-lab-overview.png"
                alt="원룸 태양광 실험실 전체 개요도"
                width={1200}
                height={800}
                priority
                className="h-auto w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <p className="mt-2 text-center text-[12px] text-stone-500">
              전체 구조: 패널은 측정 대상 · ESP32는 USB 전원의 측정 조수
            </p>
          </div>
        </div>
      </section>

      {/* 안전 배너 */}
      <section className="rounded-3xl border border-red-200 bg-gradient-to-r from-red-50 to-orange-50 p-5 sm:p-6" aria-label="안전 경계">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-black text-red-800">⛑️ 안전 경계 — 이것만은 꼭</p>
            <ul className="mt-2 grid gap-1 text-[13px] font-medium leading-6 text-red-900/90 sm:grid-cols-2 sm:text-sm">
              <li>· ESP32 GPIO에 5V·패널 직접 연결 금지</li>
              <li>· BH1750은 3.3V 전용 (5V 파손)</li>
              <li>· 220V·인버터·리튬충전 다루지 않음</li>
              <li>· 발열·냄새·불꽃 나면 즉시 중단</li>
            </ul>
          </div>
          <Link
            href="/docs/02-safety-rules"
            className="shrink-0 rounded-2xl bg-red-600 px-5 py-3 text-center text-sm font-bold text-white shadow active:scale-[0.98]"
          >
            안전 수칙 읽기 →
          </Link>
        </div>
      </section>

      {/* 5일 여정 */}
      <section aria-label="5일 실습">
        <div className="flex items-end justify-between">
          <h2 className="text-xl font-black tracking-tight sm:text-2xl">🧪 5일 실습 루트</h2>
          <Link href="/docs" className="text-sm font-bold text-sky-700">전체 보기 →</Link>
        </div>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {JOURNEY.map((j, i) => (
            <li key={j.s}>
              <Link
                href={`/docs/${j.s}`}
                className="block h-full rounded-3xl border border-stone-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99]"
              >
                <span className={`inline-block rounded-full px-2.5 py-1 text-[12px] font-black ${j.c}`}>
                  {j.d}
                </span>
                <p className="mt-2.5 text-[15px] font-bold leading-6">{j.t}</p>
                <p className="mt-1 text-[13px] font-semibold text-stone-400">STEP {i + 1} →</p>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* 부품 */}
      <section aria-label="부품 도감">
        <div className="flex items-end justify-between">
          <h2 className="text-xl font-black tracking-tight sm:text-2xl">🧰 부품 도감</h2>
          <Link href="/hardware" className="text-sm font-bold text-sky-700">전체 보기 →</Link>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3">
          {HARDWARE_ORDER.map((h) => (
            <Link
              key={h.slug}
              href={`/hardware/${h.slug}`}
              className="rounded-3xl border border-stone-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99]"
            >
              <p className="text-2xl">{h.emoji}</p>
              <p className="mt-2 text-[15px] font-bold leading-6">{h.label}</p>
              <p className="mt-0.5 text-[13px] text-stone-500">{h.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 커리큘럼 */}
      <section aria-label="커리큘럼">
        <div className="flex items-end justify-between">
          <h2 className="text-xl font-black tracking-tight sm:text-2xl">📚 3권 + 확장팩</h2>
          <Link href="/curriculum" className="text-sm font-bold text-sky-700">전체 보기 →</Link>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {CURRICULUM_ORDER.slice(0, 6).map((c) => (
            <Link
              key={c.slug}
              href={`/curriculum/${c.slug}`}
              className="flex items-center gap-3 rounded-3xl border border-stone-200 bg-white p-4 shadow-sm transition hover:shadow-md active:scale-[0.99]"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-solar-100 text-xl">{c.emoji}</span>
              <span className="min-w-0">
                <span className="block truncate text-[15px] font-bold">{c.label}</span>
                <span className="block truncate text-[13px] text-stone-500">{c.desc}</span>
              </span>
              <span className="ml-auto shrink-0 font-black text-stone-300">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 도구 */}
      <section className="grid gap-3 sm:grid-cols-3" aria-label="학습 도구">
        {[
          { href: '/calculator', e: '🧮', t: '옴의법칙 계산기', d: 'V·I·R·P + 저항 발열 체크' },
          { href: '/workbook', e: '📝', t: '150문제 은행', d: '섹션별 필터 · 진행도 저장' },
          { href: '/gallery', e: '🖼️', t: '그림 자료 6장', d: 'I-V곡선·배선·로드맵' },
        ].map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-3xl bg-stone-900 p-5 text-white shadow-lg transition hover:-translate-y-0.5 active:scale-[0.99]"
          >
            <p className="text-2xl">{c.e}</p>
            <p className="mt-2 font-black">{c.t}</p>
            <p className="mt-1 text-[13px] text-stone-300">{c.d}</p>
          </Link>
        ))}
      </section>

      {/* 순서 안내 */}
      <section className="rounded-3xl border border-stone-200 bg-white p-5 sm:p-6" aria-label="읽는 순서">
        <h2 className="text-lg font-black">🗺️ 처음 오셨다면 이 순서</h2>
        <ol className="mt-3 space-y-2">
          {DOCS_ORDER.slice(0, 8).map((d, i) => (
            <li key={d.slug}>
              <Link href={`/docs/${d.slug}`} className="flex items-center gap-3 rounded-2xl px-2 py-2 hover:bg-stone-50">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-stone-900 text-[12px] font-black text-white">
                  {i + 1}
                </span>
                <span className="text-sm font-bold">{d.emoji} {d.label}</span>
                <span className="ml-auto text-stone-300">→</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
