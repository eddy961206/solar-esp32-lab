import Link from 'next/link';
import { notFound } from 'next/navigation';
import Markdown from '@/components/Markdown';
import AtlasExplorer from '@/components/AtlasExplorer';
import { CURRICULUM_ORDER, getDoc } from '@/lib/content';
import { CURR_SUMMARIES } from '@/content/curriculum';

export function generateStaticParams() {
  return [...CURRICULUM_ORDER.map((c) => ({ slug: [c.slug] })), { slug: ['experiment-note'] }];
}

export async function generateMetadata({ params }: { params: { slug: string[] } }) {
  const doc = getDoc('curriculum', params.slug);
  return { title: doc ? doc.title : '글 없음' };
}

export default function CurriculumPage({ params }: { params: { slug: string[] } }) {
  const doc = getDoc('curriculum', params.slug);
  if (!doc) notFound();

  const summary = CURR_SUMMARIES[params.slug[0]];
  const isAtlas = params.slug[0] === 'project-atlas-60';

  return (
    <article className="mx-auto max-w-3xl pt-6">
      <nav className="flex items-center gap-1.5 text-[13px] font-semibold text-stone-400" aria-label="breadcrumb">
        <Link href="/" className="hover:text-stone-700">홈</Link>
        <span>/</span>
        <Link href="/curriculum" className="hover:text-stone-700">읽을거리</Link>
        <span>/</span>
        <span className="truncate text-stone-700">{doc.title}</span>
      </nav>

      <div className="mt-4 rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-7">
        <h1 className="text-[22px] font-black leading-[1.3] tracking-tight sm:text-2xl">{doc.title}</h1>
        {summary && (
          <div className="mt-4 space-y-2 rounded-2xl bg-gradient-to-br from-amber-50 to-sky-50 p-4">
            <p className="text-[13px] font-black text-amber-800">📖 30초 요약</p>
            {summary.lines.map((l) => (
              <p key={l} className="text-[14px] leading-7 text-stone-700">· {l}</p>
            ))}
            <p className="rounded-xl bg-white/80 px-3 py-2 text-[13px] font-semibold text-stone-500">
              이런 분에게: {summary.forWho}
            </p>
          </div>
        )}
      </div>

      {isAtlas ? (
        <div className="mt-6">
          <AtlasExplorer />
        </div>
      ) : (
        <details className="group mt-5 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
          <summary className="cursor-pointer list-none bg-stone-50 px-5 py-4 text-[15px] font-bold">
            📜 원문 펼쳐보기
            <span className="float-right text-stone-400 group-open:rotate-90">›</span>
          </summary>
          <div className="border-t border-stone-100 px-5 py-6 sm:px-8">
            <Markdown source={doc.raw} />
          </div>
        </details>
      )}

      <Link href="/curriculum" className="mt-5 block rounded-2xl border border-stone-200 bg-white px-4 py-3.5 text-center text-sm font-bold text-stone-600">
        읽을거리 목록으로
      </Link>
    </article>
  );
}
