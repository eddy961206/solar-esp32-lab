'use client';
import { useEffect, useRef, useState } from 'react';
import type { LessonStep } from '@/content/lessons';
import { readProgress, writeProgress } from '@/lib/progress';
import LabIcon from './LabIcon';
export default function LessonSteps({ slug, steps }: { slug: string; steps: LessonStep[] }) {
  const [checked,setChecked]=useState<number[]>([]);
  const [current,setCurrent]=useState(0);
  const [all,setAll]=useState(false);
  const [ready,setReady]=useState(false);
  const [saved,setSaved]=useState(true);
  const buttons=useRef<(HTMLButtonElement|null)[]>([]);
  useEffect(()=>{
    setReady(false);
    const load=()=>{const values=readProgress(slug,steps.length);setChecked(values);const next=steps.findIndex((_,i)=>!values.includes(i));setCurrent(next<0?steps.length-1:next);setReady(true);};
    load();
    const sync=(event:StorageEvent)=>{if(event.key===`lesson-steps-${slug}` || event.key===null)load();};
    window.addEventListener('storage',sync);
    return()=>window.removeEventListener('storage',sync);
  },[slug,steps.length]);
  function mark(index:number,done:boolean){
    const values=done?Array.from(new Set([...checked,index])):checked.filter(i=>i!==index);
    setChecked(values);setSaved(writeProgress(slug,values));
    if(done){const next=steps.findIndex((_,i)=>i>index&&!values.includes(i));if(next>=0){setCurrent(next);requestAnimationFrame(()=>{buttons.current[next]?.focus({preventScroll:true});buttons.current[next]?.scrollIntoView({block:'nearest',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});});}}
  }
  const pct=steps.length?Math.round(checked.length/steps.length*100):0;
  return <div className="guided-steps"><div className="step-toolbar"><span>{checked.length} / {steps.length}단계 완료</span><div className="step-mode" role="group" aria-label="실험 단계 표시 방식"><button type="button" aria-pressed={!all} onClick={()=>setAll(false)}>한 단계씩</button><button type="button" aria-pressed={all} onClick={()=>setAll(true)}>전체 보기</button></div></div><div className="step-progress-track" role="progressbar" aria-label="실험 진행도" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}><div style={{width:`${pct}%`}}/></div><ol className="step-list">{steps.map((step,i)=>{const done=checked.includes(i);const expanded=all||current===i;return <li key={i} className={`step-item ${current===i?'is-current':''} ${done?'is-done':''}`}><button ref={el=>{buttons.current[i]=el;}} type="button" className="step-title" aria-expanded={expanded} aria-controls={`step-${slug}-${i}`} onClick={()=>{setCurrent(i);setAll(false);}}><span className="step-number">{done?<LabIcon name="check" size={16}/>:i+1}</span><span>{step.title}{done&&<span className="sr-only"> · 완료</span>}</span><LabIcon name="chevron"/></button><div id={`step-${slug}-${i}`} className="step-body" hidden={!expanded}><p>{step.body}</p>{step.tip&&<div className="step-tip"><b>기억할 점</b><br/>{step.tip}</div>}<div className="step-actions">{done?<><span className="text-link"><LabIcon name="check" size={17}/>완료한 단계</span><button type="button" className="step-undo" disabled={!ready} onClick={()=>mark(i,false)}>완료 취소</button></>:<button type="button" className="lab-button primary" disabled={!ready} onClick={()=>mark(i,true)}>{i===steps.length-1?'이 단계 완료':'완료하고 다음 단계'}<LabIcon name="check" size={17}/></button>}</div></div></li>;})}</ol>{pct===100&&steps.length>0&&<p className="steps-complete" role="status"><LabIcon name="check"/><span>모든 단계를 완료했어요. 아래에서 다음 실험으로 이동할 수 있어요.</span></p>}{!saved&&<p className="storage-warning" role="status">브라우저가 저장을 허용하지 않아 새로고침하면 이번 진도가 사라질 수 있어요.</p>}</div>;
}
