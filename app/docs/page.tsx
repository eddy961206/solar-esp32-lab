import Link from 'next/link';
import { DOCS_ORDER } from '@/lib/content';

export const metadata = { title: '실험 가이드' };

export default function DocsIndex() {
  return (
    <div className="space-y-6 pt-6">
      <div>
        <p className="text-[13px] font-bold text-amber-700">🧪 HANDS-ON · 5일 실습</p>
        <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">실험 가이드</h1>
        <p className="mt-2 text-sm leading-6 text-stone-500">
          하루에 하나씩, 변수도 하나씩만 바꾸며 진행하세요. 배선을 바꿨으면 코드는 그대로.
        </p>
      </div>
      <ol className="grid gap-3 sm:grid-cols-2">
        {DOCS_ORDER.map((d, i) => (
          <li key={d.slug}>
            <Link
              href={`/docs/${d.slug}`}
              className="flex items-center gap-3 rounded-3xl border border-stone-200 bg-white p-4 shadow-sm transition hover:shadow-md active:scale-[0.99]"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-stone-900 text-sm font-black text-white">
                {i + 1}
              </span>
              <span>
                <span className="block text-[15px] font-bold">{d.emoji} {d.label}</span>
                <span className="block text-[12px] text-stone-400">/docs/{d.slug}</span>
              </span>
              <span className="ml-auto font-black text-stone-300">→</span>
            </Link>
          </li>
        ))}
      </ol>
      <div className="rounded-3xl border border-sky-200 bg-sky-50 p-5 text-sm leading-7 text-sky-900">
        💡 <b>기록 양식:</b> 매 실험마다 ①오늘의 질문 ②연결 부품 ③예상값 ④실측값
        ⑤오차 이유 ⑥전기기사 연결을 남기세요. →{' '}
        <Link href="/docs/09-log-template" className="font-bold underline">로그 템플릿</Link>
      </div>
    </div>
  );
}
