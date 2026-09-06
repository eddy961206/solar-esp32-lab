import Image from 'next/image';
import Link from 'next/link';
import { LESSONS } from '@/content/lessons';
import { PARTS } from '@/content/parts';

const STATS = [
  { v: '5일', l: '따라하기 코스' },
  { v: '30개', l: '쉬운 용어' },
  { v: '150', l: '연습 문제' },
  { v: '60', l: '다음 놀이' },
];

const DAY_LESSONS = LESSONS.filter((l) => l.day.startsWith('Day'));

export default function Home() {
  return (
    <div className="space-y-10 pt-6 sm:pt-10">
      {/* 히어로 */}
      <section className="overflow-hidden rounded-3xl border border-amber-200/70 bg-gradient-to-br from-amber-50 via-orange-50 to-sky-50 shadow-sm">
        <div className="grid gap-6 p-6 sm:p-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/70 bg-white/80 px-3 py-1 text-[12px] font-bold text-amber-800">
              ☀️ 전공 지식 없이 시작하는 전기 첫걸음
            </p>
            <h1 className="mt-4 text-[28px] font-black leading-[1.2] tracking-tight sm:text-5xl sm:leading-[1.12]">
              어려운 말 없이,
              <br />
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                햇빛으로 숫자 읽기
              </span>
              부터.
            </h1>
            <p className="mt-4 text-[15px] leading-8 text-stone-600 sm:text-base">
              패널에 측정기를 갖다 대고, 저항을 달아보고, 밝기를 재는 5일 코스.
              전문 용어가 나오면 그 자리에서 쉽게 풀어줘요.
              모르는 말은 용어 사전에서 2줄로 확인하세요.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Link
                href="/docs/04-day1-panel-multimeter"
                className="rounded-2xl bg-stone-900 px-5 py-4 text-center text-[15px] font-bold text-white shadow-lg active:scale-[0.98]"
              >
                🧪 Day 1부터 따라하기
              </Link>
              <Link
                href="/glossary"
                className="rounded-2xl border border-stone-300 bg-white px-5 py-4 text-center text-[15px] font-bold text-stone-800 active:scale-[0.98]"
              >
                📖 용어부터 훑어보기
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
              전체 구조: 패널은 구경하는 대상 · ESP32는 USB로 켜는 검침원
            </p>
          </div>
        </div>
      </section>

      {/* 10분 맛보기 */}
      <section className="rounded-3xl bg-stone-900 p-5 text-white shadow-lg sm:p-6" aria-label="10분 맛보기">
        <h2 className="text-lg font-black">⏱️ 10분 맛보기 (아무것도 없어도 돼요)</h2>
        <ol className="mt-3 space-y-2">
          {[
            { href: '/docs/01-project-overview', t: '이 실험실이 뭔지 5분 읽기', d: '전체 그림 잡기' },
            { href: '/docs/02-safety-rules', t: '안전 3분 읽기', d: '이것만 지키면 돼요' },
            { href: '/glossary', t: '전압·전류·저항 3개만 보기', d: '용어 사전에서 검색' },
          ].map((s, i) => (
            <li key={s.href}>
              <Link href={s.href} className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3.5 active:bg-white/20">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-amber-400 text-sm font-black text-stone-900">
                  {i + 1}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[15px] font-bold">{s.t}</span>
                  <span className="block text-[12px] text-stone-300">{s.d}</span>
                </span>
                <span className="ml-auto shrink-0 text-stone-400">→</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* 안전 배너 */}
      <section className="rounded-3xl border border-red-200 bg-gradient-to-r from-red-50 to-orange-50 p-5 sm:p-6" aria-label="안전 경계">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-black text-red-800">⛑️ 이것만 지키면 안전해요</p>
            <ul className="mt-2 grid gap-1 text-[13px] font-medium leading-6 text-red-900/90 sm:grid-cols-2 sm:text-sm">
              <li>· ESP32는 USB로만 켜기 (패널 연결 금지)</li>
              <li>· 밝기 센서는 3.3V에만 꽂기</li>
              <li>· 220V·배터리 충전은 안 해요</li>
              <li>· 뜨겁거나 냄새나면 바로 손 떼기</li>
            </ul>
          </div>
          <Link
            href="/docs/02-safety-rules"
            className="shrink-0 rounded-2xl bg-red-600 px-5 py-3.5 text-center text-sm font-bold text-white shadow active:scale-[0.98]"
          >
            쉽게 읽는 안전 수칙 →
          </Link>
        </div>
      </section>

      {/* 5일 코스 */}
      <section aria-label="5일 코스">
        <div className="flex items-end justify-between">
          <h2 className="text-xl font-black tracking-tight sm:text-2xl">🧪 5일 따라하기</h2>
          <Link href="/docs" className="text-sm font-bold text-sky-700">전체 보기 →</Link>
        </div>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {DAY_LESSONS.map((l) => (
            <li key={l.slug}>
              <Link
                href={`/docs/${l.slug}`}
                className="block h-full rounded-3xl border border-stone-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99]"
              >
                <span className="inline-block rounded-full bg-amber-100 px-2.5 py-1 text-[12px] font-black text-amber-900">
                  {l.day} · {l.minutes}분
                </span>
                <p className="mt-2.5 text-[15px] font-bold leading-6">{l.title}</p>
                <p className="mt-1 line-clamp-2 text-[13px] leading-5 text-stone-500">{l.subtitle}</p>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* 도구 */}
      <section className="grid gap-3 sm:grid-cols-3" aria-label="바로 쓰는 도구">
        {[
          { href: '/calculator', e: '🧮', t: '전력 계산기', d: '달기 전에 뜨거울지 먼저 확인' },
          { href: '/glossary', e: '📖', t: '용어 사전', d: '모르는 말 2줄로 바로 이해' },
          { href: '/workbook', e: '📝', t: '150문제', d: '배운 게 내 것인지 확인' },
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

      {/* 부품 */}
      <section aria-label="부품 도감">
        <div className="flex items-end justify-between">
          <h2 className="text-xl font-black tracking-tight sm:text-2xl">🧰 부품, 만져보며 알기</h2>
          <Link href="/hardware" className="text-sm font-bold text-sky-700">전체 보기 →</Link>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3">
          {PARTS.map((p) => (
            <Link
              key={p.slug}
              href={`/hardware/${p.slug}`}
              className="rounded-3xl border border-stone-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99]"
            >
              <p className="text-2xl">{p.emoji}</p>
              <p className="mt-2 text-[15px] font-bold leading-6">{p.name}</p>
              <p className="mt-0.5 line-clamp-2 text-[13px] leading-5 text-stone-500">{p.oneliner}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
