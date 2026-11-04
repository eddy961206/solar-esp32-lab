'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { Mission } from '@/content/missions';
import { FORMULAS } from '@/content/formulas';
import { GUIDE, getGuide } from '@/content/guide';
import { luxFor, operate, RESISTORS } from '@/lib/solar';
import { load, save, type MissionProgress } from '@/lib/progress';
import IVChart from './IVChart';
import Schematic from './Schematic';
import type { SceneValues } from './LabScene';

const LabScene = dynamic(() => import('./LabScene'), {
  ssr: false,
  loading: () => <div className="scene scene-loading">작업대 펼치는 중…</div>,
});

const SUN_PRESETS = [
  { label: '밤', sun: 0 },
  { label: '실내 창가', sun: 0.005 },
  { label: '흐린 바깥', sun: 0.25 },
  { label: '맑은 날', sun: 0.7 },
  { label: '한여름 정오', sun: 1 },
];

const EXTRA_PARTS: Record<string, string[]> = {
  'make-it-work': ['wago'],
  'count-current': ['breadboard'],
  'light-to-number': ['breadboard'],
};

interface Nav {
  prev?: { id: string; title: string };
  next?: { id: string; title: string };
}

export default function MissionView({ mission, nav }: { mission: Mission; nav: Nav }) {
  const [sun, setSun] = useState(mission.scene === 'meter' ? 0.005 : 0.7);
  const [rIdx, setRIdx] = useState(0);
  const [picked, setPicked] = useState<string>(mission.parts[0]);
  const [progress, setProgress] = useState<MissionProgress>({ steps: [], worked: false, changed: false, notes: '' });
  const [lines, setLines] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  useEffect(() => setProgress(load(mission.id)), [mission.id]);
  const update = (p: Partial<MissionProgress>) => {
    const next = { ...progress, ...p };
    setProgress(next);
    save(mission.id, next);
  };

  const resistor = RESISTORS[rIdx];
  const ohms = mission.scene === 'meter' ? Infinity : resistor.ohms;
  const op = useMemo(() => operate(sun, ohms), [sun, ohms]);
  const lux = luxFor(sun);
  const usesEsp = mission.scene === 'ina219' || mission.scene === 'bh1750' || mission.scene === 'logger';

  // 시리얼 모니터 흉내: 1초마다 지금 값에 약간의 흔들림을 섞어 한 줄
  useEffect(() => {
    if (!usesEsp) return;
    const id = setInterval(() => {
      const n = () => 1 + (Math.random() - 0.5) * 0.02;
      const v = op.volts * n();
      const ma = op.amps * 1000 * n();
      const line =
        mission.scene === 'ina219'
          ? `${v.toFixed(2)} V  ${ma.toFixed(1)} mA  ${(v * ma).toFixed(0)} mW`
          : mission.scene === 'logger'
            ? `${new Date().toTimeString().slice(0, 8)},${Math.round(lux * n())},${v.toFixed(2)},${ma.toFixed(1)},${(v * ma).toFixed(0)}`
            : `${Math.round(lux * n())},${v.toFixed(2)},${ma.toFixed(1)},${(v * ma).toFixed(0)}`;
      setLines((l) => [...l.slice(-11), line]);
    }, 1000);
    return () => clearInterval(id);
  }, [usesEsp, op, lux, mission.scene]);

  const values: SceneValues = useMemo(
    () => ({ sun, volts: op.volts, amps: op.amps, watts: op.watts, ohms: Number.isFinite(ohms) ? ohms : 0, rating: resistor.rating, lux, lines }),
    [sun, op, ohms, resistor.rating, lux, lines],
  );

  const partSlugs = [...mission.parts, ...(EXTRA_PARTS[mission.id] ?? [])];
  const guide = getGuide(picked) ?? (picked === 'mac' ? { slug: 'mac', name: '맥미니', role: 'ESP32가 보내는 숫자를 받아 기록하고 그래프로 보는 컴퓨터.', principle: 'USB 선 하나가 ESP32에 전원도 주고, 글자도 주고받는 통로가 돼.', use: 'ESP32를 USB로 꽂고, Arduino IDE 시리얼 모니터나 log.py로 포트를 연다. 포트는 한 번에 한 프로그램만 쓸 수 있어.' } : GUIDE[0]);
  const heat = Number.isFinite(ohms) ? op.watts / resistor.rating : 0;
  const done = progress.steps.length;

  const live: Record<string, string> = {
    ohm: `${op.volts.toFixed(2)} V = ${op.amps.toFixed(3)} A × ${Number.isFinite(ohms) ? ohms : '∞'} Ω`,
    power: `${op.watts.toFixed(2)} W = ${op.volts.toFixed(2)} V × ${op.amps.toFixed(3)} A`,
    heat: `${op.watts.toFixed(2)} W = ${op.amps.toFixed(3)}² × ${Number.isFinite(ohms) ? ohms : '∞'} Ω`,
    shunt: `${(op.amps * 1000).toFixed(0)} mA = ${(op.amps * 100).toFixed(1)} mV ÷ 0.1 Ω`,
    energy: `${op.watts.toFixed(2)} Wh = ${op.watts.toFixed(2)} W × 1 h`,
  };

  return (
    <div className="mission">
      <header className="mission-head">
        <p className="eyebrow">미션 {mission.num} · 약 {mission.minutes}분</p>
        <h1>{mission.title}</h1>
        <p className="goal"><span>오늘 작동시킬 것</span>{mission.goal}</p>
      </header>

      <section className="stage">
        <div className="stage-3d">
          <LabScene kind={mission.scene} values={values} selected={picked} onPick={setPicked} />
          <div className="stage-controls">
            <div className="ctl">
              <label htmlFor="sun">햇빛 {Math.round(sun * 100)}%</label>
              <input id="sun" type="range" min={0} max={1} step={0.005} value={sun} onChange={(e) => setSun(Number(e.target.value))} />
              <div className="chips">
                {SUN_PRESETS.map((p) => (
                  <button key={p.label} className={`chip ${Math.abs(sun - p.sun) < 0.003 ? 'on' : ''}`} onClick={() => setSun(p.sun)}>{p.label}</button>
                ))}
              </div>
            </div>
            {mission.controls.resistor && (
              <div className="ctl">
                <span className="ctl-label">시멘트 저항</span>
                <div className="chips">
                  {RESISTORS.map((r, i) => (
                    <button key={r.ohms} className={`chip ${i === rIdx ? 'on' : ''}`} onClick={() => setRIdx(i)}>{r.ohms}Ω</button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <p className="stage-hint">끌어서 돌리고, 부품을 누르면 아래에 설명이 나와. 노란 알갱이는 전류야.</p>
        </div>

        <aside className="readout">
          {mission.scene === 'meter' ? (
            <>
              <div className="big"><b>{op.volts.toFixed(2)}</b><span>V</span></div>
              <p className="muted">멀티미터가 보여줄 쉴 때 전압. 아무것도 안 달아서 전류는 0이야.</p>
            </>
          ) : (
            <>
              <div className="trio">
                <div><b>{op.volts.toFixed(2)}</b><span>V 전압</span></div>
                <div><b>{(op.amps * 1000).toFixed(0)}</b><span>mA 전류</span></div>
                <div><b>{op.watts.toFixed(2)}</b><span>W 전력</span></div>
              </div>
              {usesEsp && mission.scene !== 'ina219' && <p className="muted">밝기 약 {lux.toLocaleString()} lux</p>}
              <IVChart sun={sun} volts={op.volts} amps={op.amps} ohms={resistor.ohms} />
              <div className="heat"><span style={{ width: `${Math.min(100, heat * 100)}%` }} /><em>저항 열 {Math.round(heat * 100)}% (정격 {resistor.rating}W 기준)</em></div>
            </>
          )}
          {usesEsp && (
            <pre className="serial" aria-live="off">
              {(mission.scene === 'ina219' ? '' : mission.scene === 'logger' ? 'time,lux,volts,mA,mW\n' : 'lux,volts,mA,mW\n') + (lines.join('\n') || '…')}
            </pre>
          )}
          <p className="fine">숫자는 패널 사양으로 만든 근사 모델이야. 실제 값과 조금 달라도 정상.</p>
        </aside>
      </section>

      <section className="partbar">
        <div className="chips">
          {partSlugs.map((s) => (
            <button key={s} className={`chip ${picked === s ? 'on' : ''}`} onClick={() => setPicked(s)}>{getGuide(s)?.name ?? s}</button>
          ))}
        </div>
        <div className="partcard">
          <h3>{guide.name}</h3>
          <dl>
            <dt>이게 뭐야</dt><dd>{guide.role}</dd>
            <dt>어떻게 동작해</dt><dd>{guide.principle}</dd>
            <dt>어떻게 써</dt><dd>{guide.use}</dd>
          </dl>
          {getGuide(picked) && picked !== 'breadboard' && picked !== 'wago' && <Link href={`/parts#${picked}`} className="more">숫자 스펙 보기 →</Link>}
        </div>
      </section>

      <div className="cols">
        <div>
          <section className="card">
            <h2>해볼 순서 <small>{done}/{mission.steps.length}</small></h2>
            <ol className="steps">
              {mission.steps.map((s, i) => {
                const on = progress.steps.includes(i);
                return (
                  <li key={i} className={`${on ? 'done' : ''} ${s.safety ? 'safe' : ''}`}>
                    <label>
                      <input type="checkbox" checked={on} onChange={() => update({ steps: on ? progress.steps.filter((x) => x !== i) : [...progress.steps, i] })} />
                      <span>{s.safety && <b className="badge">안전</b>}{s.text}{s.why && <em>{s.why}</em>}</span>
                    </label>
                  </li>
                );
              })}
            </ol>
          </section>

          {mission.code?.map((c, i) => (
            <section className="card" key={i}>
              <h2>{c.label}
                <button className="copy" onClick={() => navigator.clipboard?.writeText(c.text).then(() => { setCopied(i); setTimeout(() => setCopied(null), 1500); })}>{copied === i ? '복사됨' : '복사'}</button>
              </h2>
              <pre className="code"><code>{c.text}</code></pre>
            </section>
          ))}

          <section className="card win">
            <h2>쌓였나 체크</h2>
            <p className="muted">여기서는 설명할 수 있는지가 아니라, 작동했는지와 하나 바꿔 봤는지로 쌓인 걸 세.</p>
            <label className="check"><input type="checkbox" checked={progress.worked} onChange={() => update({ worked: !progress.worked })} /><span><b>작동했어</b>{mission.worked}</span></label>
            <label className="check"><input type="checkbox" checked={progress.changed} onChange={() => update({ changed: !progress.changed })} /><span><b>하나 바꿔봤어</b>{mission.change}</span></label>
          </section>
        </div>

        <div>
          <section className="card idea">
            <h2>지금 필요한 한 가지 · {mission.idea.title}</h2>
            <p>{mission.idea.point}</p>
            <details>
              <summary>이게 어떻게 발견됐냐면</summary>
              <p>{mission.idea.story}</p>
            </details>
          </section>

          {mission.formulas.length > 0 && (
            <section className="card">
              <h2>체화할 공식 <small>지금 화면 숫자가 들어가</small></h2>
              {mission.formulas.map((k) => (
                <div className="formula" key={k}>
                  <div className="fx"><b>{FORMULAS[k].expr}</b><span>{FORMULAS[k].name}</span></div>
                  <code>{live[k]}</code>
                  <p>{FORMULAS[k].plain} <em>{FORMULAS[k].daily}</em></p>
                </div>
              ))}
              <Link href="/traits" className="more">특성 카드 더 보기 →</Link>
            </section>
          )}

          <section className="card">
            <h2>회로도로 보면</h2>
            <Schematic kind={mission.scene} ohms={resistor.ohms} />
            <p className="muted">위 3D 작업대와 같은 회로야. 기호에 익숙해지면 나중에 설계도를 읽고 그리게 돼.</p>
          </section>

          <section className="card">
            <h2>나중에 볼 가지</h2>
            <p className="muted">궁금한 게 가지를 쳐도 지금은 작동이 먼저. 여기 적어 두고 미션을 마친 뒤에 보자.</p>
            <ul className="branches">{mission.branches.map((b) => <li key={b}>{b}</li>)}</ul>
            <textarea value={progress.notes} placeholder="떠오른 궁금증을 적어 둬 (이 브라우저에만 저장돼)" onChange={(e) => update({ notes: e.target.value })} />
          </section>

          <section className="card safety">
            <h2>안전</h2>
            <ul>{mission.safety.map((s) => <li key={s}>{s}</li>)}</ul>
          </section>
        </div>
      </div>

      <nav className="mission-nav">
        {nav.prev ? <Link href={`/mission/${nav.prev.id}`}>← {nav.prev.title}</Link> : <Link href="/">← 미션 지도</Link>}
        {nav.next ? <Link href={`/mission/${nav.next.id}`}>{nav.next.title} →</Link> : <Link href="/#roadmap">그다음 길 →</Link>}
      </nav>
    </div>
  );
}
