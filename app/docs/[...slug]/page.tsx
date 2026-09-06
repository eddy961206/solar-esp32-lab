import Link from 'next/link';
import { notFound } from 'next/navigation';
import Markdown from '@/components/Markdown';
import { DOCS_ORDER, getDoc } from '@/lib/content';

export function generateStaticParams() {
  return DOCS_ORDER.map((d) => ({ slug: [d.slug] }));
}

export async function generateMetadata({ params }: { params: { slug: string[] } }) {
  const doc = getDoc('docs', params.slug);
  return { title: doc ? doc.title : '문서 없음' };
}

export default function DocPage({ params }: { params: { slug: string[] } }) {
  const doc = getDoc('docs', params.slug);
  if (!doc) notFound();

  const idx = DOCS_ORDER.findIndex((d) => d.slug === params.slug[0]);
  const prev = idx > 0 ? DOCS_ORDER[idx - 1] : null;
  const next = idx >= 0 && idx < DOCS_ORDER.length - 1 ? DOCS_ORDER[idx + 1] : null;

  return (
    <article className="mx-auto max-w-3xl pt-6">
      <nav className="flex items-center gap-1.5 text-[13px] font-semibold text-stone-400" aria-label="breadcrumb">
        <Link href="/" className="hover:text-stone-700">홈</Link>
        <span>/</span>
        <Link href="/docs" className="hover:text-stone-700">실험 가이드</Link>
        <span>/</span>
        <span className="truncate text-stone-700">{doc.title}</span>
      </nav>

      <div className="mt-4 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
        <div className="border-b border-stone-100 bg-gradient-to-r from-amber-50 to-orange-50 px-5 py-5 sm:px-8">
          <h1 className="text-xl font-black leading-8 tracking-tight sm:text-2xl">{doc.title}</h1>
        </div>
        <div className="px-5 py-6 sm:px-8">
          <Markdown source={doc.raw} />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {prev ? (
          <Link href={`/docs/${prev.slug}`} className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm font-bold shadow-sm">
            ← {prev.label}
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/docs/${next.slug}`} className="rounded-2xl bg-stone-900 px-4 py-3 text-right text-sm font-bold text-white shadow">
            {next.label} →
          </Link>
        ) : <span />}
      </div>

      <Link href="/docs" className="mt-3 block rounded-2xl border border-stone-200 bg-white px-4 py-3 text-center text-sm font-bold text-stone-600">
        목록으로 돌아가기
      </Link>
    </article>
  );
}
