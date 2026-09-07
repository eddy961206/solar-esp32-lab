import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LESSONS, LEVEL_LABEL, getLesson } from '@/content/lessons';
import { DAY_VISUALS } from '@/content/journey';
import LessonSteps from '@/components/LessonSteps';
import CopyBox from '@/components/CopyBox';
import LabIcon from '@/components/LabIcon';
import { PanelMeterDiagram, LoadLoopDiagram, INA219Diagram, I2CBusDiagram } from '@/components/diagrams';
const DIAGRAMS:Record<string,()=>React.JSX.Element>={'panel-meter':PanelMeterDiagram,'load-loop':LoadLoopDiagram,ina219:INA219Diagram,i2c:I2CBusDiagram};
export function generateStaticParams(){return LESSONS.map(l=>({slug:[l.slug]}));}
export async function generateMetadata({params}:{params:{slug:string[]}}){return {title:getLesson(params.slug[0])?.title||'실험 없음'};}
export default function LessonPage({params}:{params:{slug:string[]}}){
  const lesson=params.slug.length===1?getLesson(params.slug[0]):undefined;if(!lesson)notFound();
  const idx=LESSONS.findIndex(l=>l.slug===lesson.slug);const prev=LESSONS[idx-1];const next=LESSONS[idx+1];const Diagram=lesson.diagram?DIAGRAMS[lesson.diagram]:null;
  return <div className="lesson-layout"><aside className="lesson-sidebar"><strong>나의 실험 순서</strong><nav aria-label="전체 실험 순서">{LESSONS.map((l,i)=><Link key={l.slug} href={`/docs/${l.slug}`} aria-current={l.slug===lesson.slug?'page':undefined}><span>{String(i+1).padStart(2,'0')}</span>{DAY_VISUALS[l.slug]?.title||l.title}</Link>)}</nav><div className="sidebar-tools"><Link href="/hardware"><LabIcon name="chip" size={15}/>부품 도감</Link><Link href="/glossary"><LabIcon name="book" size={15}/>용어 사전</Link><Link href="/calculator"><LabIcon name="calculator" size={15}/>전력 계산기</Link></div></aside><article className="lesson-main"><nav className="lab-breadcrumb" aria-label="현재 위치"><Link href="/">홈</Link><LabIcon name="chevron" size={12}/><Link href="/docs">실험하기</Link><LabIcon name="chevron" size={12}/><span>{lesson.day}</span></nav><h1>{lesson.title}</h1><div className="lesson-meta"><span>{lesson.day}</span><span><LabIcon name="clock" size={15}/>약 {lesson.minutes}분</span><span>{LEVEL_LABEL[lesson.level]}</span></div><p className="lesson-intro">{lesson.subtitle}</p><div className="lesson-goal"><LabIcon name="check"/><div><b>오늘은 이것만 할 수 있으면 성공</b><p>{lesson.goal}</p></div></div>
  {lesson.safety.length>0&&<aside className="lesson-safety"><b><LabIcon name="shield" size={18}/>시작 전, 꼭 확인</b><ul>{lesson.safety.map(s=><li key={s}>{s}</li>)}</ul></aside>}
  {lesson.prepare.length>0&&<section className="lesson-section" aria-labelledby="materials-title"><h2 id="materials-title">준비물부터 확인해요</h2><p>책상 위에 준비한 항목을 체크해 보세요. 이 체크는 새로고침하면 초기화돼요.</p><div className="lesson-materials">{lesson.prepare.map(p=><label key={p}><input type="checkbox"/><span>{p}</span></label>)}</div></section>}
  {Diagram&&<section className="lesson-section" aria-labelledby="diagram-title"><h2 id="diagram-title">연결 모습, 먼저 눈으로 확인</h2><p>글을 읽다가 헷갈리면 이 그림으로 돌아오세요. 실제 보드의 핀 표기도 반드시 확인해요.</p><Diagram/></section>}
  {lesson.story.length>0&&<details className="lesson-extra"><summary>왜 이렇게 실험하나요? · 배경 설명</summary><div className="lesson-extra-body">{lesson.story.map((p,i)=><p key={i}>{p}</p>)}{lesson.analogy&&<p><b>{lesson.analogy.title}</b><br/>{lesson.analogy.body}</p>}</div></details>}
  {lesson.steps.length>0&&<section className="lesson-section" aria-labelledby="steps-title"><h2 id="steps-title">이제, 한 단계씩 따라해요</h2><p>내용을 읽는 것과 완료 표시는 별개예요. 직접 해본 뒤 완료 버튼을 누르세요.</p><LessonSteps key={lesson.slug} slug={lesson.slug} steps={lesson.steps}/></section>}
  {lesson.formula&&<section className="lesson-section"><h2>이번 실험에 쓰는 계산</h2><div className="formula-grid">{lesson.formula.map(f=><div key={f.text}><b>{f.text}</b><p>{f.meaning}</p></div>)}</div><Link href="/calculator" className="text-link">계산기로 직접 확인<LabIcon name="arrow" size={16}/></Link></section>}
  {lesson.slug==='09-log-template'&&<CopyBox text="시간,전압(V),전류(mA),전력(mW),밝기(lux),메모" label="컴퓨터용 기록 첫 줄 (CSV)"/>}
  {lesson.record.length>0&&<section className="lesson-section"><h2>오늘의 기록</h2><div className="lesson-extra-body"><ul className="list-disc pl-5">{lesson.record.map(r=><li key={r}>{r}</li>)}</ul></div></section>}
  {lesson.mistakes&&lesson.mistakes.length>0&&<section className="lesson-section"><h2>예상과 다르게 보인다면</h2>{lesson.mistakes.map(m=><details className="lesson-extra" key={m.what}><summary>{m.what}</summary><div className="lesson-extra-body"><p><b>원인</b><br/>{m.why}</p><p><b>이렇게 확인해요</b><br/>{m.fix}</p></div></details>)}</section>}
  <nav className="lesson-nav" aria-label="이전 다음 실험">{prev?<Link href={`/docs/${prev.slug}`}><small>이전 단계</small>{prev.title}</Link>:<span/>}{next?<Link href={`/docs/${next.slug}`}><small>다음 단계</small>{next.title}</Link>:<Link href="/docs"><small>실험 둘러보기</small>전체 실험으로 돌아가기</Link>}</nav></article></div>;
}
