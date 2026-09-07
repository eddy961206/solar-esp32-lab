import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PARTS, getPart } from '@/content/parts';
import { PHOTOS } from '@/content/photos';
import { PART_VISUALS } from '@/content/journey';
import PhotoFigure from '@/components/PhotoFigure';
import PartArt from '@/components/PartArt';
import LabIcon from '@/components/LabIcon';
import Callout from '@/components/Callout';
import { LoadLoopDiagram, INA219Diagram, I2CBusDiagram, LuxScale } from '@/components/diagrams';

const PART_DIAGRAMS: Record<string, () => React.JSX.Element> = {
  'load-loop': LoadLoopDiagram,
  ina219: INA219Diagram,
  i2c: I2CBusDiagram,
  lux: LuxScale,
};
export function generateStaticParams() {
  return PARTS.map(p => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: { params: { slug: string } }) {
  return { title: getPart(params.slug)?.name || '부품 없음' };
}
export default function PartPage({ params }: { params: { slug: string } }) {
  const part = getPart(params.slug);
  if (!part) notFound();
  const visual = PART_VISUALS[part.slug];
  const Diagram = part.diagram ? PART_DIAGRAMS[part.diagram] : null;
  return <article className="mx-auto max-w-3xl pt-8">
    <nav className="lab-breadcrumb" aria-label="현재 위치">
      <Link href="/">홈</Link><LabIcon name="chevron" size={12}/>
      <Link href="/hardware">부품 도감</Link><LabIcon name="chevron" size={12}/><span>{part.name}</span>
    </nav>
    <header className="part-detail-head">
      <div><p className="part-role">{visual?.role}</p><h1>{part.name}</h1><p>{visual?.summary || part.oneliner}</p></div>
      <div className="part-detail-art"><PartArt kind={visual?.kind || 'panel'}/><span>역할을 이해하는 개념 그림 · 실제 핀 배열 아님</span></div>
    </header>
    <Callout kind="safety" title="연결 전에 확인해요"><ul className="list-disc space-y-1 pl-5">{part.care.map(c => <li key={c}>{c}</li>)}</ul></Callout>
    {part.photoKey && PHOTOS[part.photoKey] && <section className="lesson-section"><h2>실물 참고 사진</h2><PhotoFigure photo={PHOTOS[part.photoKey]}/></section>}
    {Diagram && <section className="lesson-section"><h2>연결 모습 이해하기</h2><p>그림으로 흐름을 익히고, 실제 기판의 핀 이름과 제품 설명서를 확인하세요.</p><Diagram/></section>}
    <section className="lesson-section"><h2>꼭 알 것</h2>
      <dl className="overflow-hidden rounded-xl border border-stone-200 bg-white">
        {part.specs.map((s,i) => <div key={s.k} className={`grid grid-cols-[100px_minmax(0,1fr)] gap-3 px-4 py-3 text-sm leading-7 ${i % 2 ? 'bg-stone-50' : ''}`}><dt className="font-semibold text-stone-500">{s.k}</dt><dd>{s.v}</dd></div>)}
      </dl>
    </section>
    <section className="lesson-section"><h2>이렇게 연결해요</h2><ol className="space-y-3">{part.wiring.map((w,i) => <li key={w} className="flex items-start gap-3 rounded-xl border border-stone-200 bg-white px-4 py-4 text-sm leading-7"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-green-50 text-xs font-bold text-green-800">{i+1}</span><span>{w}</span></li>)}</ol></section>
    <section className="lesson-section"><h2>안 될 때 체크</h2><ul className="list-disc space-y-2 pl-5 text-sm leading-8">{part.troubleshoot.map(t => <li key={t}>{t}</li>)}</ul></section>
    <nav className="lesson-nav" aria-label="부품 학습 이동"><Link href="/hardware"><small>다른 부품도 살펴보기</small>부품 도감으로</Link><Link href="/docs"><small>준비됐다면</small>실험 가이드로</Link></nav>
  </article>;
}
