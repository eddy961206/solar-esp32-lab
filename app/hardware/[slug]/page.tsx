import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { PARTS, getPart } from '@/content/parts';
import { PHOTOS } from '@/content/photos';
import PhotoFigure from '@/components/PhotoFigure';
import Callout from '@/components/Callout';
import { LoadLoopDiagram, INA219Diagram, I2CBusDiagram, LuxScale } from '@/components/diagrams';

const METER_SLUG = 'uni-t-ut33a-plus';
function resolvePartSlug(slug: string) {
  let decoded = slug;
  try { decoded = decodeURIComponent(slug); } catch { return ''; }
  return decoded === METER_SLUG ? 'UNI-T-UT33A+' : decoded;
}
const PART_DIAGRAMS: Record<string, () => React.JSX.Element> = {
  'load-loop': LoadLoopDiagram, ina219: INA219Diagram, i2c: I2CBusDiagram, lux: LuxScale,
};
export function generateStaticParams() {
  return PARTS.map((p) => ({ slug: p.slug === 'UNI-T-UT33A+' ? METER_SLUG : p.slug }));
}
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const part = getPart(resolvePartSlug(params.slug));
  return { title: part ? part.name : '부품 없음' };
}
export default function PartPage({ params }: { params: { slug: string } }) {
  const part = getPart(resolvePartSlug(params.slug));
  if (!part) notFound();
  if (part.slug === 'UNI-T-UT33A+' && params.slug !== METER_SLUG) permanentRedirect(`/hardware/${METER_SLUG}`);
  return (
    <article className="mx-auto max-w-3xl pt-6">
      <nav className="flex items-center gap-1.5 text-[13px] font-semibold text-stone-400" aria-label="breadcrumb">
        <Link href="/" className="hover:text-stone-700">홈</Link><span>/</span>
        <Link href="/hardware" className="hover:text-stone-700">부품 도감</Link><span>/</span>
        <span className="truncate text-stone-700">{part.name}</span>
      </nav>
      <div className="mt-4 rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-7">
        <p className="text-4xl">{part.emoji}</p>
        <h1 className="mt-2 text-[24px] font-black tracking-tight sm:text-3xl">{part.name}</h1>
        <p className="mt-2 text-[15px] leading-8 text-stone-600">{part.oneliner}</p>
      </div>
      {part.photoKey && PHOTOS[part.photoKey] && <div className="mt-5"><PhotoFigure photo={PHOTOS[part.photoKey]} /></div>}
      {part.diagram && PART_DIAGRAMS[part.diagram] && <div className="mt-5">{(() => { const D = PART_DIAGRAMS[part.diagram as string]; return <D />; })()}</div>}
      <section className="mt-5" aria-label="꼭 알 것">
        <h2 className="text-lg font-black">꼭 알 것</h2>
        <dl className="mt-3 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
          {part.specs.map((s, i) => <div key={s.k} className={`grid grid-cols-[110px_1fr] gap-2 px-4 py-3 text-[14px] leading-6 ${i % 2 ? 'bg-stone-50/70' : 'bg-white'}`}><dt className="font-black text-stone-500">{s.k}</dt><dd className="font-semibold">{s.v}</dd></div>)}
        </dl>
      </section>
      <section className="mt-6" aria-label="이렇게 연결해요">
        <h2 className="text-lg font-black">이렇게 연결해요</h2>
        <ol className="mt-3 space-y-2">{part.wiring.map((w, i) => <li key={w} className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3 text-[14px] font-semibold shadow-sm"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-stone-900 text-[12px] font-black text-white">{i + 1}</span>{w}</li>)}</ol>
      </section>
      <div className="mt-6"><Callout kind="safety" title="조심할 점"><ul className="list-disc space-y-1 pl-5">{part.care.map((c) => <li key={c}>{c}</li>)}</ul></Callout></div>
      <section className="mt-6" aria-label="안 될 때"><h2 className="text-lg font-black">안 될 때 체크</h2><ul className="mt-3 space-y-2">{part.troubleshoot.map((t) => <li key={t} className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-[14px] leading-7 shadow-sm">{t}</li>)}</ul></section>
      <div className="mt-6 grid grid-cols-2 gap-2"><Link href="/hardware" className="rounded-2xl border border-stone-200 bg-white px-4 py-3.5 text-center text-sm font-bold">도감 목록</Link><Link href="/glossary" className="rounded-2xl bg-stone-900 px-4 py-3.5 text-center text-sm font-bold text-white">모르는 말 찾기</Link></div>
    </article>
  );
}
