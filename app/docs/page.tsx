import Link from 'next/link';
import { LESSONS, LEVEL_LABEL } from '@/content/lessons';

export const metadata = { title: '실험 가이드' };

export default function DocsIndex() {
  return (
    <div className="space-y-6 pt-6">
      <div>
        <p className="text-[13px] font-bold text-amber-700">🧪 HANDS-ON · 따라하기</p>
        <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">실험 가이드</h1>
        <p className="mt-2 text-[15px] leading-7 text-stone-500">
          어려운 말은 다 풀어썼어요. 위에서부터 하나씩 눌러 따라오면 됩니다.
          하루에 하나, 한 번에 하나씩만 바꿔요.
        </p>
      </div>
      <ol className="grid gap-3 sm:grid-cols-2">
        {LESSONS.map((l, i) => (
          <li key={l.slug}>
            <Link
              href={`/docs/${l.slug}`}
              className="flex h-full items-start gap-3 rounded-3xl border border-stone-200 bg-white p-4 shadow-sm transition hover:shadow-md active:scale-[0.99]"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 text-xl">
                {l.emoji}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12px] font-bold text-stone-400">
                  {String(i + 1).padStart(2, '0')} · {l.day} · 약 {l.minutes}분 · {LEVEL_LABEL[l.level]}
                </span>
                <span className="block truncate text-[15px] font-bold">{l.title}</span>
                <span className="block truncate text-[13px] text-stone-500">{l.subtitle}</span>
              </span>
              <span className="shrink-0 font-black text-stone-300">→</span>
            </Link>
          </li>
        ))}
      </ol>
      <div className="rounded-3xl border border-sky-200 bg-sky-50 p-5 text-[14px] leading-7 text-sky-900">
        💡 <b>모르는 말이 나오면?</b> 바로{' '}
        <Link href="/glossary" className="font-bold underline">용어 사전</Link>
        에서 검색하세요. 2줄로 쉽게 풀어놨어요.
      </div>
    </div>
  );
}
