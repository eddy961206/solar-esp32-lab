'use client';
import Link from 'next/link';
import {useEffect,useState} from 'react';
import PartArt,{type PartKind} from '@/components/PartArt';
import {MODULES,TOPICS,type Topic} from '@/content/learn';
import {readProgress} from './LearningClient';
const ART:Record<string,PartKind>={'ohms-law':'resistor','series-parallel':'load' as PartKind,'multimeter':'meter','breadboard':'resistor','board-explorer':'esp32','pwm':'light','adc':'esp32','i2c':'ina219','solar-panel':'panel','energy-budget':'record'};
export default function LearningHub(){
 const [topic,setTopic]=useState<Topic|'all'>('all'),[done,setDone]=useState<string[]>([]),[shade,setShade]=useState(false);
 useEffect(()=>{const update=()=>setDone(readProgress());update();window.addEventListener('storage',update);window.addEventListener('solar-learning-progress',update);return()=>{window.removeEventListener('storage',update);window.removeEventListener('solar-learning-progress',update);};},[]);
 const modules=MODULES.filter(m=>topic==='all'||m.topic===topic);
 return <div className="learn-shell"><section className="learn-hero"><div><h1>바꿔 보면,<br/><em>원리가 보여요.</em></h1><p>공식을 외우기 전에, 직접 움직여 봐요.<br/>전기부터 작은 컴퓨터, 햇빛의 에너지까지.<br/>장비 없이 브라우저에서 시작하는 10가지 체험.</p><Link className="learn-primary" href="/learn/ohms-law">첫 번째 체험 시작하기 <span aria-hidden="true">↗</span></Link></div><div className="learn-hero-play"><div className={shade?'shade':''}><PartArt kind="panel"/><PartArt kind="meter"/></div><button className="learn-secondary" aria-pressed={shade} onClick={()=>setShade(!shade)}>{shade?'햇빛 다시 비추기':'패널 가려 보기'}</button><p aria-live="polite">{shade?'빛을 가리면 발전량이 줄어들어요.':'빛을 바꾸면 전기는 어떻게 달라질까요?'}</p><small>원리 미리보기 · 실제 측정값 아님</small></div></section>
 <div className="learn-progress-summary"><div><b>나의 체험 기록</b><span>같은 브라우저에 저장돼요. 로그인은 필요 없어요.</span></div><strong>{done.length}<small> / {MODULES.length} 완료</small></strong></div>
 <nav className="learn-topic-tabs" aria-label="학습 주제"><button aria-pressed={topic==='all'} onClick={()=>setTopic('all')}>전체 체험 <small>10</small></button>{(Object.keys(TOPICS) as Topic[]).map(t=><button key={t} aria-pressed={topic===t} onClick={()=>setTopic(t)}>{TOPICS[t]} <small>{MODULES.filter(m=>m.topic===t).length}</small></button>)}</nav>
 <div className="learn-section-title"><h2>{topic==='all'?'궁금한 것부터 골라 봐요':TOPICS[topic]}</h2><p role="status">{modules.length}개의 체험</p></div>
 <div className="learn-module-grid">{modules.map(m=><Link className="learn-module-card" href={`/learn/${m.slug}`} key={m.slug}><div className="module-art"><PartArt kind={ART[m.slug]==='load' as PartKind?'resistor':ART[m.slug]}/><span>{m.minutes}분</span></div><div className="module-copy"><small>{m.subtitle}</small><h3>{m.title}</h3><p>{m.task}</p><div><b>{done.includes(m.slug)?'✓ 학습 완료':'직접 해보기'}</b><span aria-hidden="true">↗</span></div></div></Link>)}</div>
 <aside className="learn-after"><h2>이제 실제 부품으로 해볼까요?</h2><p>가상 체험과 실제 배선은 달라요. 안전 수칙부터 확인하고, 기존 5일 실험 가이드를 따라가요.</p><div><Link href="/docs/02-safety-rules">안전 수칙 읽기 ↗</Link><Link href="/docs">5일 실험 가이드 ↗</Link><Link href="/hardware/uni-t-ut33a-plus">멀티미터 알아보기 ↗</Link></div></aside>
 </div>;
}
