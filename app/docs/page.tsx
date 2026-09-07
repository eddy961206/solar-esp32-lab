import Link from 'next/link';
import { LESSONS } from '@/content/lessons';
import CourseJourney from '@/components/CourseJourney';
import LabIcon from '@/components/LabIcon';
export const metadata = { title: '5일 실험 가이드' };
export default function DocsIndex() {
  const days=LESSONS.filter(l=>l.day.startsWith('Day')).map(l=>({slug:l.slug,day:l.day,title:l.title,minutes:l.minutes,goal:l.goal,count:l.steps.length,prepare:l.prepare}));
  return <div><header className="lab-page-head"><nav className="lab-breadcrumb" aria-label="현재 위치"><Link href="/">홈</Link><LabIcon name="chevron" size={12}/><span>실험하기</span></nav><h1>처음부터, 하나씩 따라해요.</h1><p>오늘은 한 가지 목표만. 준비물을 확인하고, 그림을 보고, 한 단계씩 진행해요. 다섯 번의 실험이 끝나면 햇빛을 직접 측정하고 기록할 수 있어요.</p></header><div className="preparation-row"><Link href="/docs/01-project-overview"><LabIcon name="sun"/><span><strong>전체 흐름 이해하기</strong><small>어떤 실험인지 먼저 알아봐요</small></span><LabIcon name="arrow"/></Link><Link href="/docs/02-safety-rules"><LabIcon name="shield"/><span><strong>안전 수칙 확인하기</strong><small>실험 전, 반드시 읽어주세요</small></span><LabIcon name="arrow"/></Link><Link href="/docs/03-inventory"><LabIcon name="grid"/><span><strong>준비물 확인하기</strong><small>필요한 부품과 도구를 살펴봐요</small></span><LabIcon name="arrow"/></Link></div><CourseJourney lessons={days}/><section className="lab-section"><div className="section-heading"><div><h2>기록하거나, 막히거나, 더 하고 싶을 때</h2><p>실험 중 필요한 내용만 찾아보세요.</p></div></div><div className="reference-list">{LESSONS.slice(8).map(l=><Link key={l.slug} href={`/docs/${l.slug}`}><div><b>{l.title}</b><p>{l.subtitle}</p></div><LabIcon name="arrow"/></Link>)}</div></section></div>;
}
