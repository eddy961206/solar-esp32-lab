import Link from 'next/link';
import { notFound } from 'next/navigation';
import Markdown from '@/components/Markdown';
import { HARDWARE_ORDER, getDoc } from '@/lib/content';

export function generateStaticParams() {
  return HARDWARE_ORDER.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const doc = getDoc('hardware', [params.slug]);
  return { title: doc ? doc.title : '부품 없음' };
}

export default function HardwarePage({ params }: { params: { slug: string } }) {
  const doc = getDoc('hardware', [params.slug]);
  if (!doc) notFound();

  return (
    <article className="mx-auto max-w-3xl pt-6">
      <nav className="flex items-center gap-1.5 text-[13px] font-semibold text-stone-400" aria-label="breadcrumb">
        <Link href="/" className="hover:text-stone-700">홈</Link>
        <span>/</span>
        <Link href="/hardware" className="hover:text-stone-700">부품 도감</Link>
        <span>/</span>
        <span className="truncate text-stone-700">{doc.title}</span>
      </nav>

      <div className="mt-4 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
        <div className="border-b border-stone-100 bg-gradient-to-r from-emerald-50 to-sky-50 px-5 py-5 sm:px-8">
          <h1 className="text-xl font-black leading-8 tracking-tight sm:text-2xl">{doc.title}</h1>
        </div>
        <div className="px-5 py-6 sm:px-8">
          <Markdown source={doc.raw} />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Link href="/hardware" className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-center text-sm font-bold">
          ← 도감 목록
        </Link>
        <Link href="/docs/02-safety-rules" className="rounded-2xl bg-red-600 px-4 py-3 text-center text-sm font-bold text-white">
          ⛑️ 안전 수칙
        </Link>
      </div>
    </article>
  );
}
