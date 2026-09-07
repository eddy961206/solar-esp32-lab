import Link from 'next/link';
import { LESSONS } from '@/content/lessons';
import { PARTS } from '@/content/parts';
import SolarPlayground from '@/components/SolarPlayground';
import CourseJourney from '@/components/CourseJourney';
import PartCard from '@/components/PartCard';
import LabIcon from '@/components/LabIcon';

export default function Home() {
  const lessons = LESSONS.filter(l=>l.day.startsWith('Day')).map(l=>({slug:l.slug,day:l.day,title:l.title,minutes:l.minutes,goal:l.goal,count:l.steps.length,prepare:l.prepare}));
  return <div className="lab-home">
    <section className="lab-hero"><div className="lab-hero-copy"><h1>햇빛이 만드는 전기,<br/><span>직접 확인하는 재미.</span></h1><p>작은 패널로 전압을 재고, 센서로 읽고,<br className="desktop-break"/> ESP32로 기록하는 다섯 번의 실험.<br/>처음이라면 첫 번째 단계부터 함께해요.</p><Link href="/docs/02-safety-rules" className="lab-button primary hero-action">안전 확인하고 시작하기<LabIcon name="arrow"/></Link><Link href="/docs/01-project-overview" className="hero-secondary">무엇을 만드는 실험인가요?<LabIcon name="chevron" size={16}/></Link><div className="hero-footnote"><LabIcon name="clock" size={17}/><span>하루 하나씩 · 전기 지식 없이 시작 · 실험별 준비물 안내</span></div></div><SolarPlayground/></section>
    <aside className="lab-safety-strip"><LabIcon name="shield" size={21}/><p><strong>작게, 안전하게 시작해요.</strong><span>패널은 측정용 · ESP32 전원은 USB · 220V와 배터리 충전은 다루지 않아요.</span></p><Link href="/docs/02-safety-rules" aria-label="전체 안전 수칙 보기"><LabIcon name="arrow"/></Link></aside>
    <CourseJourney lessons={lessons}/>
    <section className="lab-section" aria-labelledby="parts-title"><div className="section-heading"><div><h2 id="parts-title">책상 위, 작은 실험실</h2><p>이름을 외우기 전에, 어떤 역할을 하는지부터 알아봐요.</p></div><Link className="text-link" href="/hardware">부품 6종 모두 보기<LabIcon name="arrow" size={18}/></Link></div><div className="part-grid">{PARTS.slice(0,3).map(p=><PartCard key={p.slug} part={p}/>)}</div></section>
    <section className="home-help" aria-labelledby="help-title"><div><h2 id="help-title">막힐 때는, 여기서 잠깐.</h2><p>처음부터 전부 읽을 필요 없어요.<br/>지금 궁금한 것만 찾아보세요.</p></div><div className="home-help-links"><Link href="/glossary"><LabIcon name="book"/><span><b>모르는 말이 나왔어요</b><small>쉬운 설명으로 찾는 용어 사전</small></span><LabIcon name="arrow" size={17}/></Link><Link href="/calculator"><LabIcon name="calculator"/><span><b>연결 전에 계산해 볼래요</b><small>전압·저항으로 전류와 전력 계산</small></span><LabIcon name="arrow" size={17}/></Link><Link href="/curriculum"><LabIcon name="note"/><span><b>왜 그런지 더 알고 싶어요</b><small>실험 뒤에 읽는 전기·ESP32 이야기</small></span><LabIcon name="arrow" size={17}/></Link></div></section>
  </div>;
}
