'use client';

import { useMemo, useState } from 'react';
import { TERMS, TERM_CATS } from '@/content/glossary';

export default function GlossarySearch() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<string>('전체');

  const list = useMemo(() => {
    const needle = q.trim();
    return TERMS.filter(
      (t) =>
        (cat === '전체' || t.cat === cat) &&
        (!needle || t.t.includes(needle) || t.easy.includes(needle)),
    );
  }, [q, cat]);

  return (
    <div className="space-y-4">
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="궁금한 말 검색 — 예: 직렬, 룩스, baud"
        className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3.5 text-[15px] shadow-sm outline-none placeholder:text-stone-400 focus:border-amber-400"
        aria-label="용어 검색"
      />
      <div className="flex gap-2 overflow-x-auto pb-1" style={{ WebkitOverflowScrolling: 'touch' }}>
        {TERM_CATS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={`shrink-0 rounded-full px-4 py-2.5 text-[13px] font-bold active:scale-95 ${
              cat === c ? 'bg-stone-900 text-white' : 'border border-stone-200 bg-white text-stone-600'
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {list.map((t) => (
          <div key={t.t} className="rounded-3xl border border-stone-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-solar-100 px-2.5 py-0.5 text-[11px] font-black text-amber-800">
                {t.cat}
              </span>
              <p className="text-[15px] font-black">{t.t}</p>
            </div>
            <p className="mt-1.5 text-[14px] leading-6 text-stone-600">{t.easy}</p>
            {t.example && (
              <p className="mt-1.5 rounded-xl bg-stone-50 px-3 py-2 text-[13px] leading-6 text-stone-500">
                예) {t.example}
              </p>
            )}
            {t.link && (
              <a href={t.link} className="mt-2 inline-block text-[13px] font-bold text-sky-700">
                관련 실험 보기 →
              </a>
            )}
          </div>
        ))}
      </div>
      {list.length === 0 && (
        <p className="rounded-3xl border border-dashed border-stone-300 bg-white p-8 text-center text-sm text-stone-500">
          못 찾았어요. 다른 말로 검색해 보세요. (예: 전압, 전류, 합선)
        </p>
      )}
    </div>
  );
}
