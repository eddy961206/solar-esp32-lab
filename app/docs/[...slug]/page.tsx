import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LESSONS, LEVEL_LABEL, getLesson } from '@/content/lessons';
import LessonSteps from '@/components/LessonSteps';
import Callout from '@/components/Callout';
import CopyBox from '@/components/CopyBox';
import { PanelMeterDiagram, LoadLoopDiagram, INA219Diagram, I2CBusDiagram } from '@/components/diagrams';

const DIAGRAMS: Record<string, () => React.JSX.Element> = {
  'panel-meter': PanelMeterDiagram,
  'load-loop': LoadLoopDiagram,
  ina219: INA219Diagram,
  i2c: I2CBusDiagram,
};

export function generateStaticParams() {
  return LESSONS.map((l) => ({ slug: [l.slug] }));
}

export async function generateMetadata({ params }: { params: { slug: string[] } }) {
  const lesson = getLesson(params.slug[0]);
  return { title: lesson ? lesson.title : '실험 없음' };
}

export default function LessonPage({ params }: { params: { slug: string[] } }) {
  const lesson = getLesson(params.slug[0]);
  if (!lesson) notFound();

  const idx = LESSONS.findIndex((l) => l.slug === lesson.slug);
  const prev = idx > 0 ? LESSONS[idx - 1] : null;
  const next = idx < LESSONS.length - 1 ? LESSONS[idx + 1] : null;

  return (
    <article className="mx-auto max-w-3xl pt-6">
      <nav className="flex items-center gap-1.5 text-[13px] font-semibold text-stone-400" aria-label="breadcrumb">
        <Link href="/" className="hover:text-stone-700">홈</Link>
        <span>/</span>
        <Link href="/docs" className="hover:text-stone-700">실험 가이드</Link>
        <span>/</span>
        <span className="truncate text-stone-700">{lesson.title}</span>
      </nav>

      {/* 헤더 */}
      <div className="mt-4 rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-stone-900 px-3 py-1 text-[12px] font-black text-white">
            {lesson.emoji} {lesson.day}
          </span>
          <span className="rounded-full bg-stone-100 px-3 py-1 text-[12px] font-bold text-stone-500">
            약 {lesson.minutes}분 · {LEVEL_LABEL[lesson.level]}
          </span>
        </div>
        <h1 className="mt-3 text-[24px] font-black leading-[1.25] tracking-tight sm:text-3xl">
          {lesson.title}
        </h1>
        <p className="mt-1.5 text-[15px] text-stone-500">{lesson.subtitle}</p>
        <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-[13px] font-black text-emerald-800">🏁 성공 기준</p>
          <p className="mt-1 text-[14px] leading-7 text-emerald-950">{lesson.goal}</p>
        </div>
      </div>

      {/* 이야기 */}
      <div className="mt-5 space-y-3 text-[15px] leading-8 text-stone-700">
        {lesson.story.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {lesson.analogy && (
        <div className="mt-5">
          <Callout kind="why" title={lesson.analogy.title}>
            {lesson.analogy.body}
          </Callout>
        </div>
      )}

      {/* 도해 */}
      {lesson.diagram && DIAGRAMS[lesson.diagram] && (
        <div className="mt-5">
          {(() => {
            const D = DIAGRAMS[lesson.diagram as string];
            return <D />;
          })()}
        </div>
      )}

      {/* 준비물 */}
      {lesson.prepare.length > 0 && (
        <section className="mt-8" aria-label="준비물">
          <h2 className="text-lg font-black">🎒 준비물</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {lesson.prepare.map((p) => (
              <li key={p} className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-[14px] font-semibold shadow-sm">
                ☐ {p}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 단계 */}
      {lesson.steps.length > 0 && (
        <section className="mt-8" aria-label="따라하기">
          <h2 className="text-lg font-black">👣 따라하기</h2>
          <p className="mt-1 text-[13px] text-stone-500">끝낸 단계는 눌러서 체크하세요. 기록은 이 기기에만 저장돼요.</p>
          <div className="mt-3">
            <LessonSteps slug={lesson.slug} steps={lesson.steps} />
          </div>
        </section>
      )}

      {/* 공식 */}
      {lesson.formula && (
        <section className="mt-8 grid gap-2 sm:grid-cols-2" aria-label="필요한 계산">
          {lesson.formula.map((f) => (
            <div key={f.text} className="rounded-2xl bg-stone-900 p-4 text-white shadow">
              <p className="text-lg font-black tracking-tight">{f.text}</p>
              <p className="mt-1 text-[13px] leading-6 text-stone-300">{f.meaning}</p>
            </div>
          ))}
        </section>
      )}

      {/* 기록 도우미 (로그 레슨) */}
      {lesson.slug === '09-log-template' && (
        <div className="mt-6">
          <CopyBox text="시간,전압(V),전류(mA),전력(mW),밝기(lux),메모" label="컴퓨터용 기록 첫 줄 (CSV)" />
        </div>
      )}

      {/* 안전 */}
      {lesson.safety.length > 0 && (
        <div className="mt-6">
          <Callout kind="safety" title="조심할 점">
            <ul className="list-disc space-y-1 pl-5">
              {lesson.safety.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Callout>
        </div>
      )}

      {/* 기록 항목 */}
      {lesson.record.length > 0 && (
        <section className="mt-6 rounded-3xl border border-sky-200 bg-sky-50 p-4" aria-label="적어두기">
          <p className="text-sm font-black text-sky-900">🧾 적어두기</p>
          <ul className="mt-1.5 list-disc space-y-1 pl-5 text-[14px] leading-7 text-sky-950">
            {lesson.record.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </section>
      )}

      {/* 실수 */}
      {lesson.mistakes && lesson.mistakes.length > 0 && (
        <section className="mt-8" aria-label="실수 해결">
          <h2 className="text-lg font-black">🩹 이런 일 생기면</h2>
          <div className="mt-3 space-y-2.5">
            {lesson.mistakes.map((m) => (
              <details key={m.what} className="group rounded-2xl border border-stone-200 bg-white shadow-sm">
                <summary className="cursor-pointer list-none px-4 py-3.5 text-[15px] font-bold active:bg-stone-50">
                  <span className="mr-2 text-red-500">●</span>
                  {m.what}
                  <span className="float-right text-stone-300 group-open:rotate-90">›</span>
                </summary>
                <div className="border-t border-stone-100 px-4 py-3 text-[14px] leading-7">
                  <p><b>왜 그래요?</b> {m.why}</p>
                  <p className="mt-1 rounded-xl bg-emerald-50 px-3 py-2"><b>이렇게 하세요.</b> {m.fix}</p>
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* 이전/다음 */}
      <div className="mt-8 grid grid-cols-2 gap-2">
        {prev ? (
          <Link href={`/docs/${prev.slug}`} className="rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm font-bold shadow-sm">
            <span className="block text-[11px] font-medium text-stone-400">← 이전</span>
            {prev.emoji} {prev.title}
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/docs/${next.slug}`} className="rounded-2xl bg-stone-900 px-4 py-4 text-sm font-bold text-white shadow">
            <span className="block text-[11px] font-medium text-stone-400">다음 →</span>
            {next.emoji} {next.title}
          </Link>
        ) : <span />}
      </div>
    </article>
  );
}
