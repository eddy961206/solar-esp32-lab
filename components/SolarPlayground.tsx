'use client';
import { useState } from 'react';
import PartArt from './PartArt';
import LabIcon from './LabIcon';
export default function SolarPlayground() {
  const [sunny, setSunny] = useState(true);
  return <div className={`solar-playground ${sunny ? 'is-sunny' : 'is-shaded'}`}>
    <div className="solar-scene" role="img" aria-label={sunny ? '햇빛을 받는 패널과 전압을 재는 멀티미터의 개념 그림' : '패널을 가려 빛이 줄어든 개념 그림'}>
      <div className="scene-sun"><LabIcon name="sun" size={52}/></div>
      <div className="scene-light"/>
      <div className="scene-panel"><PartArt kind="panel"/></div>
      <div className="scene-meter"><PartArt kind="meter"/></div>
      <span className="scene-label scene-label-panel">01 <b>햇빛을 받는 패널</b></span>
      <span className="scene-label scene-label-meter">02 <b>전압을 보는 측정기</b></span>
      <svg className="scene-wires" viewBox="0 0 500 360" fill="none" aria-hidden="true"><path d="M205 243v30q0 22 22 22h54q22 0 22-22v-11" stroke="#ac5a42" strokeWidth="3" strokeLinecap="round"/><path d="M194 251v33q0 23 23 23h81q20 0 20-20v-17" stroke="#375b4b" strokeWidth="3" strokeLinecap="round"/></svg>
    </div>
    <div className="scene-control"><span className="scene-question">패널에 닿는 빛을 바꿔보세요</span><div className="scene-toggle" role="group" aria-label="빛 조건 예시"><button type="button" aria-pressed={sunny} onClick={()=>setSunny(true)}>햇빛</button><button type="button" aria-pressed={!sunny} onClick={()=>setSunny(false)}>가리기</button></div></div>
    <p className="scene-response" aria-live="polite">{sunny ? '빛을 받으면 패널이 전기를 만들어요.' : '빛을 가리면 만들 수 있는 전력이 줄어들어요.'}</p>
    <p className="scene-disclaimer">원리를 보여주는 그림이에요. 실제 측정값이나 배선도가 아니에요.</p>
  </div>;
}
