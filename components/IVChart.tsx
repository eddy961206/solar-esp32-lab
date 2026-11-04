// 패널 I-V 곡선과 지금 일하는 점. 저항을 바꾸면 점이 곡선을 따라 움직인다.

import { curve } from '@/lib/solar';

export default function IVChart({ sun, volts, amps, ohms }: { sun: number; volts: number; amps: number; ohms: number }) {
  const W = 320;
  const H = 180;
  const pad = { l: 40, r: 12, t: 12, b: 30 };
  const x = (v: number) => pad.l + (v / 11) * (W - pad.l - pad.r);
  const y = (i: number) => H - pad.b - (i / 0.65) * (H - pad.t - pad.b);
  const pts = curve(sun, 80);
  const d = pts.map((p, k) => `${k ? 'L' : 'M'}${x(p.v).toFixed(1)} ${y(p.i).toFixed(1)}`).join(' ');
  const loadEnd = Math.min(11, 0.65 * ohms);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="ivchart" role="img" aria-label={`I-V 곡선. 지금 ${volts.toFixed(2)}V, ${(amps * 1000).toFixed(0)}mA`}>
      <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} className="axis" />
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H - pad.b} className="axis" />
      {[0, 3, 6, 9].map((v) => (
        <text key={v} x={x(v)} y={H - 10} textAnchor="middle" className="tick">{v}V</text>
      ))}
      {[0, 0.3, 0.6].map((i) => (
        <text key={i} x={pad.l - 6} y={y(i) + 4} textAnchor="end" className="tick">{i}A</text>
      ))}
      <line x1={x(0)} y1={y(0)} x2={x(loadEnd)} y2={y(loadEnd / ohms)} className="loadline" />
      <path d={d} className="ivcurve" />
      <circle cx={x(volts)} cy={y(amps)} r={6} className="ivpoint" />
      <text x={W - pad.r} y={pad.t + 10} textAnchor="end" className="tick">곡선 = 패널, 점선 = 저항 {ohms}Ω</text>
    </svg>
  );
}
