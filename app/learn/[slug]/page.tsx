import Link from 'next/link';
import {notFound} from 'next/navigation';
import {MODULES,TOPICS,REFERENCES} from '@/content/learn';
import LearningClient from '@/components/learn/LearningClient';
export function generateStaticParams(){return MODULES.map(m=>({slug:m.slug}));}
export function generateMetadata({params}:{params:{slug:string}}){const m=MODULES.find(item=>item.slug===params.slug);return {title:m?m.title:'체험을 찾을 수 없어요'};}
export default function InteractiveLesson({params}:{params:{slug:string}}){
 const m=MODULES.find(item=>item.slug===params.slug);if(!m)notFound();
 const index=MODULES.findIndex(item=>item.slug===m.slug),next=MODULES[index+1];
 const references=m.topic==='electricity'?REFERENCES.slice(0,3):m.topic==='boards'?REFERENCES.slice(3,7):REFERENCES.slice(7);
 return <article className="learn-shell"><nav className="learn-breadcrumb" aria-label="현재 위치"><Link href="/">홈</Link><span aria-hidden="true">/</span><Link href="/learn">체험 학습</Link><span aria-hidden="true">/</span><span>{TOPICS[m.topic]}</span></nav>
 <header className="learn-page-heading"><h1>{m.title}</h1><p>{m.subtitle} — 직접 값을 바꾸고 결과를 관찰해요.</p><small>약 {m.minutes}분 · 실제 장비가 필요 없는 가상 체험</small></header>
 <LearningClient key={m.slug} module={m}/>
 <section className="learn-explanation"><h2>이것만 기억해요</h2><p>{m.lesson}</p><details><summary>이 모형이 설명하는 것과 생략한 것</summary><p>{m.caveat}</p><p>그림은 기능과 원리를 설명하기 위한 것이며 실제 보드의 물리적 핀 배치나 모든 안전 조건을 재현하지 않아요. 실제 부품을 연결하기 전에는 제조사 자료와 안전 수칙을 확인해요.</p><div className="learn-references">{references.map(([label,url])=><a key={url} href={url} target="_blank" rel="noopener noreferrer">{label} ↗</a>)}</div></details></section>
 <nav className="learn-next" aria-label="다른 체험"><Link href="/learn">← 전체 체험으로</Link>{next?<Link href={`/learn/${next.slug}`}>다음: {next.title} ↗</Link>:<Link href="/docs/02-safety-rules">실제 실험 전 안전 수칙 ↗</Link>}</nav>
 </article>;
}
