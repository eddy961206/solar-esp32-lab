import Link from 'next/link';
import { CURRICULUM_ORDER } from '@/lib/content';
import { CURR_SUMMARIES } from '@/content/curriculum';

export const metadata = { title: '읽을거리' };

export default function CurriculumIndex() {
  return (
    <div className="space-y-6 pt-6">
      <div>
        <p className="text-[13px] font-bold text-sky-700">📚 READ MORE · 실험 뒤에 읽어요</p>
        <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">읽을거리</h1>
        <p className="mt-2 text-[15px] leading-7 text-stone-500">
          길어 보이는 글도 걱정 마세요. 각 글 맨 위에 30초 요약을 붙여놨어요.
          요약만 읽어도 되고, 원문은 접어뒀다가 펼치면 돼요.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {CURRICULUM_ORDER.map((c) => {
          const s = CURR_SUMMARIES[c.slug];
          return (
            <Link
              key={c.slug}
              href={`/curriculum/${c.slug}`}
              className="rounded-3xl border border-stone-200 bg-white p-4 shadow-sm transition hover:shadow-md active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-amber-100 to-sky-100 text-2xl">
                  {c.emoji}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[15px] font-bold">{c.label}</span>
                  <span className="block truncate text-[13px] text-stone-500">{c.desc}</span>
                </span>
                <span className="ml-auto shrink-0 font-black text-stone-300">→</span>
              </div>
              {s && (
                <p className="mt-2.5 line-clamp-2 rounded-2xl bg-stone-50 px-3 py-2 text-[13px] leading-6 text-stone-600">
                  {s.lines[0]}
                </p>
              )}
            </Link>
          );
        })}
        <Link
          href="/curriculum/experiment-note"
          className="flex items-center gap-3 rounded-3xl border border-dashed border-stone-300 bg-stone-50 p-4"
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-2xl">🧾</span>
          <span className="min-w-0">
            <span className="block text-[15px] font-bold">실험 노트 양식</span>
            <span className="block truncate text-[13px] text-stone-500">매번 같은 순서로 적어요</span>
          </span>
          <span className="ml-auto shrink-0 font-black text-stone-300">→</span>
        </Link>
      </div>
    </div>
  );
}
