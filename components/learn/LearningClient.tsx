'use client';
import dynamic from 'next/dynamic';
import {useEffect,useState} from 'react';
import {MODULES,type Module} from '@/content/learn';
import type {LabProps} from './Controls';
const loading=()=> <p className="learn-loading" role="status">체험을 준비하고 있어요…</p>;
const LABS: Record<string,React.ComponentType<LabProps>> = {
 'ohms-law':dynamic(()=>import('./ElectricityLabs').then(m=>m.OhmLab),{loading}),
 'series-parallel':dynamic(()=>import('./ElectricityLabs').then(m=>m.SeriesLab),{loading}),
 'multimeter':dynamic(()=>import('./ElectricityLabs').then(m=>m.MeterLab),{loading}),
 'breadboard':dynamic(()=>import('./ElectricityLabs').then(m=>m.BreadboardLab),{loading}),
 'board-explorer':dynamic(()=>import('./BoardLabs').then(m=>m.BoardLab),{loading}),
 'pwm':dynamic(()=>import('./BoardLabs').then(m=>m.PwmLab),{loading}),
 'adc':dynamic(()=>import('./BoardLabs').then(m=>m.AdcLab),{loading}),
 'i2c':dynamic(()=>import('./BoardLabs').then(m=>m.I2cLab),{loading}),
 'solar-panel':dynamic(()=>import('./SolarLabs').then(m=>m.SolarLab),{loading}),
 'energy-budget':dynamic(()=>import('./SolarLabs').then(m=>m.EnergyLab),{loading}),
};
export const PROGRESS_KEY='solar-learning-v1';
export function readProgress():string[]{
 try{const parsed:unknown=JSON.parse(localStorage.getItem(PROGRESS_KEY)||'[]');return Array.isArray(parsed)?Array.from(new Set(parsed.filter((id):id is string=>typeof id==='string'&&MODULES.some(m=>m.slug===id)))):[];}catch{return [];}
}
export default function LearningClient({module:m}:{module:Module}){
 const [explored,setExplored]=useState(false),[answer,setAnswer]=useState<number|null>(null),[message,setMessage]=useState(''),[done,setDone]=useState(false),[revision,setRevision]=useState(0),[storageFailed,setStorageFailed]=useState(false);
 useEffect(()=>{const update=()=>setDone(readProgress().includes(m.slug));update();window.addEventListener('storage',update);return()=>window.removeEventListener('storage',update);},[m.slug]);
 const Lab=LABS[m.slug];
 function check(){
  if(!explored){setMessage('먼저 위의 작은 미션을 직접 해봐요. 조작한 뒤 답을 확인할 수 있어요.');return;}
  if(answer===null){setMessage('답 하나를 골라 주세요.');return;}
  if(answer!==m.correct){setMessage(`다시 생각해 봐요. ${m.lesson}`);return;}
  setMessage('맞았어요. 직접 바꿔 보고 원리까지 확인했어요!');setDone(true);
  try{localStorage.setItem(PROGRESS_KEY,JSON.stringify(Array.from(new Set([...readProgress(),m.slug]))));window.dispatchEvent(new Event('solar-learning-progress'));}catch{setStorageFailed(true);}
 }
 return <><div className="learn-mission"><div><small>이번 체험의 작은 미션</small><p>{m.task}</p></div><span className={`mission-state${explored?' complete':''}`} aria-live="polite">{explored?'✓ 조작 완료':'직접 해보기'}</span></div>
 <Lab key={`${m.slug}-${revision}`} onPass={()=>setExplored(true)}/>
 <div className="learn-reset-row"><span>브라우저 안에서만 동작하는 교육용 모형 · 실제 장비 연결 없음</span><button type="button" onClick={()=>{setRevision(v=>v+1);setExplored(false);setAnswer(null);setMessage('');}}>실험 값 초기화</button></div>
 <section className="learn-challenge" aria-labelledby="concept-check"><div><small>알게 된 것을 내 것으로</small><h2 id="concept-check">한 문제로 확인하기</h2><p>{m.question}</p>{done&&<span className="completion-label">✓ 학습 완료</span>}</div><div><fieldset><legend className="sr-only">답 선택</legend>{m.answers.map((a,i)=><label key={a}><input type="radio" name={`quiz-${m.slug}`} checked={answer===i} onChange={()=>{setAnswer(i);setMessage('');}}/>{a}</label>)}</fieldset><button className="learn-primary" onClick={check}>개념 확인하기</button><p className="check-feedback" role="status">{message}</p>{storageFailed&&<p className="learn-note warning">이 브라우저에서는 저장이 차단돼 있어요. 현재 화면에서는 완료됐지만 다시 열면 유지되지 않을 수 있어요.</p>}</div></section></>;
}
