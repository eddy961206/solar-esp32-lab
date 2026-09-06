import Link from 'next/link';
import { CURRICULUM_ORDER } from '@/lib/content';

export const metadata = { title: '커리큘럼' };

export default function CurriculumIndex() {
  return (
    <div className="space-y-6 pt-6">
      <div>
        <p className="text-[13px] font-bold text-sky-700">📚 3-VOLUME CURRICULUM</p>
        <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">커리큘럼</h1>
        <p className="mt-2 text-sm leading-6 text-stone-500">
          전기를 모르는 상태에서 시작해도, 숫자를 보고 기록하며 전기 감각을 키우는 3권 구조입니다.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {CURRICULUM_ORDER.map((c) => (
          <Link
            key={c.slug}
            href={`/curriculum/${c.slug}`}
            className="flex items-center gap-3 rounded-3xl border border-stone-200 bg-white p-4 shadow-sm transition hover:shadow-md active:scale-[0.99]"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-amber-100 to-sky-100 text-2xl">
              {c.emoji}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[15px] font-bold">{c.label}</span>
              <span className="block truncate text-[13px] text-stone-500">{c.desc}</span>
            </span>
            <span className="ml-auto shrink-0 font-black text-stone-300">→</span>
          </Link>
        ))}
        <Link
          href="/curriculum/experiment-note"
          className="flex items-center gap-3 rounded-3xl border border-dashed border-stone-300 bg-stone-50 p-4"
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-2xl">🧾</span>
          <span className="min-w-0">
            <span className="block text-[15px] font-bold">실험 노트 템플릿</span>
            <span className="block truncate text-[13px] text-stone-500">복사해서 쓰는 기록 양식</span>
          </span>
          <span className="ml-auto shrink-0 font-black text-stone-300">→</span>
        </Link>
      </div>
    </div>
  );
}
