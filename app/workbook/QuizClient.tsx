'use client';

import { useEffect, useMemo, useState } from 'react';

export interface QuizQuestion {
  no: number;
  text: string;
}
export interface QuizSection {
  title: string;
  questions: QuizQuestion[];
}

const KEY = 'solar-lab-workbook-checked-v1';

export default function QuizClient({ sections }: { sections: QuizSection[] }) {
  const [checked, setChecked] = useState<number[]>([]);
  const [filter, setFilter] = useState<string>('전체');
  const [query, setQuery] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setChecked(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(checked));
    } catch {
      /* ignore */
    }
  }, [checked, loaded]);

  const titles = useMemo(() => ['전체', ...sections.map((s) => s.title)], [sections]);

  const visible = useMemo(() => {
    const q = query.trim();
    return sections
      .filter((s) => filter === '전체' || s.title === filter)
      .map((s) => ({
        ...s,
        questions: s.questions.filter((item) =>
          q ? item.text.includes(q) || String(item.no).includes(q) : true,
        ),
      }))
      .filter((s) => s.questions.length > 0);
  }, [sections, filter, query]);

  const total = sections.reduce((n, s) => n + s.questions.length, 0);
  const done = checked.length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  const toggle = (no: number) =>
    setChecked((prev) => (prev.includes(no) ? prev.filter((n) => n !== no) : [...prev, no]));

  return (
    <div className="space-y-4">
      {/* 진행도 */}
      <div className="rounded-3xl border border-stone-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between text-sm font-bold">
          <span>내 진행도 {done}/{total} ({pct}%)</span>
          <button
            type="button"
            onClick={() => setChecked([])}
            className="rounded-full border border-stone-200 px-3 py-1.5 text-[12px] font-bold text-stone-500 active:scale-95"
          >
            초기화
          </button>
        </div>
        <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-stone-100" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* 검색 */}
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="문제 검색 — 예: 옴, MPPT, I2C, 47옴"
        className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-[15px] shadow-sm outline-none placeholder:text-stone-400 focus:border-amber-400"
      />

      {/* 섹션 필터 — 모바일 가로 스크롤 */}
      <div className="flex gap-2 overflow-x-auto pb-1" style={{ WebkitOverflowScrolling: 'touch' }}>
        {titles.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setFilter(t)}
            className={`shrink-0 rounded-full px-4 py-2.5 text-[13px] font-bold active:scale-95 ${
              filter === t ? 'bg-stone-900 text-white' : 'border border-stone-200 bg-white text-stone-600'
            }`}
          >
            {t.length > 14 ? t.slice(0, 14) + '…' : t}
          </button>
        ))}
      </div>

      {visible.map((s) => (
        <section key={s.title} className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
          <h2 className="border-b border-stone-100 bg-stone-50 px-4 py-3 text-[15px] font-black">{s.title}</h2>
          <ul className="divide-y divide-stone-100">
            {s.questions.map((q) => {
              const on = checked.includes(q.no);
              return (
                <li key={q.no}>
                  <button
                    type="button"
                    onClick={() => toggle(q.no)}
                    aria-pressed={on}
                    className={`flex w-full items-start gap-3 px-4 py-3.5 text-left active:bg-stone-50 ${on ? 'bg-emerald-50/60' : ''}`}
                  >
                    <span
                      className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[13px] font-black ${
                        on ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-stone-300 text-stone-400'
                      }`}
                    >
                      {on ? '✓' : q.no}
                    </span>
                    <span className={`text-[14px] leading-6 ${on ? 'text-stone-400 line-through' : 'text-stone-800'}`}>
                      <b className="mr-1.5 text-stone-400">{q.no}.</b>
                      {q.text}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      {visible.length === 0 && (
        <p className="rounded-3xl border border-dashed border-stone-300 bg-white p-8 text-center text-sm text-stone-500">
          검색 결과가 없습니다. 다른 키워드로 검색해 보세요.
        </p>
      )}
    </div>
  );
}
