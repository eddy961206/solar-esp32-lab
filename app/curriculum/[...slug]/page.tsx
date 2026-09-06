import Link from 'next/link';
import { notFound } from 'next/navigation';
import Markdown from '@/components/Markdown';
import { CURRICULUM_ORDER, getDoc } from '@/lib/content';

export function generateStaticParams() {
  return [...CURRICULUM_ORDER.map((c) => ({ slug: [c.slug] })), { slug: ['experiment-note'] }];
}

export async function generateMetadata({ params }: { params: { slug: string[] } }) {
  const doc = getDoc('curriculum', params.slug);
  return { title: doc ? doc.title : '문서 없음' };
}

export default function CurriculumPage({ params }: { params: { slug: string[] } }) {
  const doc = getDoc('curriculum', params.slug);
  if (!doc) notFound();

  return (
    <article className="mx-auto max-w-3xl pt-6">
      <nav className="flex items-center gap-1.5 text-[13px] font-semibold text-stone-400" aria-label="breadcrumb">
        <Link href="/" className="hover:text-stone-700">홈</Link>
        <span>/</span>
        <Link href="/curriculum" className="hover:text-stone-700">커리큘럼</Link>
        <span>/</span>
        <span className="truncate text-stone-700">{doc.title}</span>
      </nav>

      <div className="mt-4 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
        <div className="border-b border-stone-100 bg-gradient-to-r from-sky-50 to-amber-50 px-5 py-5 sm:px-8">
          <h1 className="text-xl font-black leading-8 tracking-tight sm:text-2xl">{doc.title}</h1>
        </div>
        <div className="px-5 py-6 sm:px-8">
          <Markdown source={doc.raw} />
        </div>
      </div>

      <Link href="/curriculum" className="mt-4 block rounded-2xl border border-stone-200 bg-white px-4 py-3 text-center text-sm font-bold text-stone-600">
        커리큘럼 목록으로
      </Link>
    </article>
  );
}
