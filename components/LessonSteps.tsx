'use client';

import { useEffect, useState } from 'react';
import type { LessonStep } from '@/content/lessons';

export default function LessonSteps({ slug, steps }: { slug: string; steps: LessonStep[] }) {
  const key = `lesson-steps-${slug}`;
  const [checked, setChecked] = useState<number[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setChecked(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, [key]);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(key, JSON.stringify(checked));
    } catch {
      /* ignore */
    }
  }, [checked, ready, key]);

  const pct = steps.length ? Math.round((checked.length / steps.length) * 100) : 0;
  const toggle = (i: number) =>
    setChecked((p) => (p.includes(i) ? p.filter((n) => n !== i) : [...p, i]));

  return (
    <div>
      <div className="mb-3 flex items-center gap-3">
        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-stone-100" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="진행도">
          <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all" style={{ width: `${pct}%` }} />
        </div>
        <span className="shrink-0 text-[13px] font-black text-stone-500">
          {checked.length}/{steps.length}
        </span>
      </div>
      <ol className="space-y-3">
        {steps.map((s, i) => {
          const done = checked.includes(i);
          return (
            <li
              key={i}
              className={`overflow-hidden rounded-3xl border bg-white shadow-sm transition ${
                done ? 'border-emerald-200' : 'border-stone-200'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-pressed={done}
                className="flex w-full items-start gap-3 p-4 text-left active:bg-stone-50"
              >
                <span
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-lg font-black transition ${
                    done ? 'bg-emerald-500 text-white' : 'bg-stone-900 text-white'
                  }`}
                >
                  {done ? '✓' : i + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block text-[16px] font-bold leading-7 ${done ? 'text-stone-400 line-through' : ''}`}>
                    {s.title}
                  </span>
                  <span className="mt-1 block text-[14px] leading-6 text-stone-600">{s.body}</span>
                  {s.tip && (
                    <span className="mt-2 block rounded-xl bg-sky-50 px-3 py-2 text-[13px] leading-6 text-sky-900">
                      💡 {s.tip}
                    </span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      {pct === 100 && (
        <p className="mt-3 rounded-2xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-center text-sm font-bold text-emerald-800">
          다 했어요! 다음 단계로 가보세요 👇
        </p>
      )}
    </div>
  );
}
