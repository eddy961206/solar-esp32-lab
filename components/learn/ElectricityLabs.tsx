'use client';
import { useState } from 'react';
import PartArt from '@/components/PartArt';
import { ohm, resistors, meter, breadboardGroup } from '@/lib/learning-models';
import { Slider, Choices, Metrics, Note, LabFrame, type LabProps } from './Controls';

function Circuit({ v, r1, r2, parallel = false, closed = true, current }: {v: number; r1: number; r2?: number; parallel?: boolean; closed?: boolean; current: number}) {
  const path = 'M95 118V65H470V248H95V180';
  return <svg className="learn-diagram" viewBox="0 0 560 310" role="img" aria-label={`${v}볼트 전원과 ${r2 ? parallel ? '병렬' : '직렬' : '하나의'} 저항 회로. ${closed ? '연결됨' : '스위치 열림'}`}>
    <path d={path} className="circuit-wire"/>
    {closed && current > 0 && <path d={path} className="circuit-flow" style={{animationDuration: `${Math.max(.5, 2 - current * 5)}s`}}/>}
    <path d="M73 126h44M83 145h24M73 164h44M83 180h24" stroke="var(--learn-ink)" strokeWidth="4"/>
    <text x="40" y="157" textAnchor="middle">{v} V</text><text x="79" y="110">+</text><text x="80" y="202">−</text>
    {!closed && <><path d="M160 65h65" stroke="var(--learn-paper)" strokeWidth="12"/><path d="m165 65 50-25" stroke="var(--learn-ink)" strokeWidth="4"/><circle cx="220" cy="65" r="4" fill="var(--learn-ink)"/></>}
    <rect x="275" y="45" width="110" height="40" rx="4" fill="#fff" stroke="var(--learn-green)" strokeWidth="3"/><text x="330" y="72" textAnchor="middle">{r1} Ω</text>
    {r2 && (parallel ? <><path d="M180 65v95h290" className="circuit-wire"/><rect x="275" y="140" width="110" height="40" rx="4" fill="#fff" stroke="var(--learn-green)" strokeWidth="3"/><text x="330" y="167" textAnchor="middle">{r2} Ω</text><circle cx="180" cy="65" r="5" fill="var(--learn-green)"/><circle cx="470" cy="160" r="5" fill="var(--learn-green)"/></> : <><rect x="275" y="228" width="110" height="40" rx="4" fill="#fff" stroke="var(--learn-green)" strokeWidth="3"/><text x="330" y="255" textAnchor="middle">{r2} Ω</text></>)}
    <text className="diagram-caption" x="280" y="303" textAnchor="middle">{closed ? '회로를 따라 흐르는 전류' : '길이 끊기면 전류는 0'} · 원리 설명용 회로</text>
  </svg>;
}
export function OhmLab({onPass}: LabProps) {
  const [v,setV] = useState(5), [r,setR] = useState(100), [closed,setClosed] = useState(true);
  const result = ohm(v,r,closed);
  return <LabFrame visual={<><Circuit v={v} r1={r} closed={closed} current={result.current}/><Metrics items={[{label:'전류 I',value:(result.current*1000).toFixed(1),unit:'mA'},{label:'전력 P',value:result.power.toFixed(3),unit:'W'}]}/><p className="learn-equation">I = V ÷ R <span>·</span> P = V × I</p></>}>
    <Slider label="전압" value={v} min={0} max={12} step={.5} unit="V" onChange={setV}/><Slider label="저항" value={r} min={10} max={500} step={10} unit="Ω" onChange={setR}/>
    <button className="learn-secondary" aria-pressed={closed} onClick={()=>setClosed(!closed)}>{closed?'스위치 열기':'스위치 닫기'}</button>
    <button className="learn-primary" onClick={()=>{setV(6);setR(100);setClosed(true);onPass();}}>6 V · 100 Ω 비교 실험</button>
    <Note warning={result.power>1}>{result.power>1?'전력이 커졌어요. 실제 저항은 발열하고 정격을 넘으면 손상될 수 있어요.':'전압만 높여 보거나 저항만 줄여 보세요. 한 번에 하나씩 바꾸면 원인이 보여요.'}</Note>
  </LabFrame>;
}
export function SeriesLab({onPass}: LabProps) {
  const [mode,setMode] = useState('series'), [a,setA] = useState(100), [b,setB] = useState(100);
  const s = resistors(6,a,b,mode==='parallel');
  return <LabFrame visual={<><Circuit v={6} r1={a} r2={b} parallel={mode==='parallel'} current={s.current}/><Metrics items={[{label:'전체 저항',value:s.resistance.toFixed(1),unit:'Ω'},{label:'전체 전류',value:(s.current*1000).toFixed(1),unit:'mA'},{label:'저항 1 전압',value:s.v1.toFixed(2),unit:'V'},{label:'저항 2 전압',value:s.v2.toFixed(2),unit:'V'}]}/></>}>
    <Choices label="연결 방식" value={mode} options={[{value:'series',label:'직렬'},{value:'parallel',label:'병렬'}]} onChange={v=>{setMode(v);if(v==='parallel')onPass();}}/>
    <Slider label="저항 1" value={a} min={10} max={500} step={10} unit="Ω" onChange={setA}/><Slider label="저항 2" value={b} min={10} max={500} step={10} unit="Ω" onChange={setB}/>
    <Note>{mode==='parallel'?`전압은 둘 다 6 V예요. 전류는 각각 ${(s.i1*1000).toFixed(1)} mA와 ${(s.i2*1000).toFixed(1)} mA로 나뉘어요.`:`두 저항에는 같은 ${(s.current*1000).toFixed(1)} mA가 흘러요. 두 전압을 더하면 6 V예요.`}</Note>
  </LabFrame>;
}
export function MeterLab({onPass}: LabProps) {
  const [mode,setMode]=useState('V'),[socket,setSocket]=useState('VΩ'),[connection,setConnection]=useState('parallel'),[power,setPower]=useState(false);
  const [result,setResult]=useState<ReturnType<typeof meter>|null>(null);
  const change=(setter:(v:string)=>void)=>(v:string)=>{setter(v);setResult(null);};
  return <LabFrame visual={<><div className="meter-scene"><PartArt kind="meter"/><div className={`meter-display${result&&!result.ok?' blocked':''}`} role="status"><small>가상 측정값</small><strong>{result?.value??'— — —'}</strong></div></div><div className="connection-readout"><b>{power?'가상 전원 ON':'가상 전원 OFF'}</b><span>5 V 전원 · 100 Ω 저항</span><span>{connection==='parallel'?'두 점 사이에 측정기를 병렬로 연결':connection==='series'?'전류가 흐르는 길 중간에 직렬로 연결':'회로에서 분리한 저항 양 끝에 연결'}</span></div><Note warning={!!result&&!result.ok}>{result?.message??'설정을 고르고 측정 버튼을 눌러 봐요. 실제 장비에는 연결하지 않아요.'}</Note></>}>
    <Choices label="측정 모드" value={mode} options={['V','A','Ω'].map(v=>({value:v,label:v}))} onChange={change(setMode)}/>
    <Choices label="빨간 리드 단자" value={socket} options={['VΩ','A'].map(v=>({value:v,label:v}))} onChange={change(setSocket)}/>
    <Choices label="연결 방법" value={connection} options={[{value:'parallel',label:'병렬'},{value:'series',label:'직렬'},{value:'isolated',label:'분리한 저항'}]} onChange={change(setConnection)}/>
    <button className="learn-secondary" aria-pressed={power} onClick={()=>{setPower(!power);setResult(null);}}>{power?'가상 전원 끄기':'가상 전원 켜기'}</button>
    <button className="learn-primary" onClick={()=>{const s=meter(mode,socket,connection,power);setResult(s);if(s.ok&&mode==='V'&&power)onPass();}}>가상 측정하기</button>
    <Note>검정 리드는 COM에 고정돼 있어요. 위험한 조합은 결과 대신 STOP으로 표시해요.</Note>
  </LabFrame>;
}
export function BreadboardLab({onPass}: LabProps) {
  const [selected,setSelected]=useState('a3'),[probe,setProbe]=useState('f3'),[split,setSplit]=useState(true),[seenA,setSeenA]=useState(true);
  const same=breadboardGroup(selected,split)===breadboardGroup(probe,split);
  const cols=['a','b','c','d','e','f','g','h','i','j','p','n'];
  return <LabFrame visual={<><div className="breadboard" aria-label="브레드보드 내부 연결"><div className="bread-row"><span/>{cols.map(c=><small key={c}>{c==='p'?'+':c==='n'?'−':c}</small>)}</div>{Array.from({length:10},(_,i)=><div className="bread-row" key={i}><small>{i+1}</small>{cols.map(c=>{const h=`${c}${i+1}`,connected=breadboardGroup(h,split)===breadboardGroup(selected,split);return <button key={h} type="button" aria-label={`구멍 ${h}`} aria-pressed={selected===h} data-connected={connected} onClick={()=>{setSelected(h);if(h==='a3')setSeenA(true);if(h==='f3'&&seenA)onPass();}}><span/></button>;})}</div>)}</div><div className="connection-readout"><b>{selected}와 같은 내부 연결</b><span>초록색 구멍은 같은 금속 클립 또는 레일로 이어져 있어요.</span></div></>}>
    <label className="learn-select">비교할 구멍<select value={probe} onChange={e=>setProbe(e.target.value)}>{['a3','e3','f3','j3','a4','p1','p8','n1'].map(v=><option key={v}>{v}</option>)}</select></label>
    <div className={`continuity ${same?'connected':''}`} role="status"><strong>{selected} ↔ {probe}</strong><span>{same?'연결됨':'분리됨'}</span></div>
    <button className="learn-secondary" aria-pressed={split} onClick={()=>setSplit(!split)}>전원 레일 중간 단절 {split?'켜짐':'꺼짐'}</button>
    <Note>오른쪽 + / − 레일도 눌러 보세요. 가운데 홈과 전원 레일은 서로 다른 구조예요.</Note>
  </LabFrame>;
}
