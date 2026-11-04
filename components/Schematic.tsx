// 같은 회로를 회로도 기호로. 3D 작업대와 나란히 보면서 기호에 익숙해지기 위한 그림이다.

import type { SceneKind } from '@/content/missions';

const S = { stroke: 'currentColor', strokeWidth: 2, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

function Panel({ x, y }: { x: number; y: number }) {
  // 태양전지 기호: 긴 판(+)과 짧은 판(−), 빛 화살표
  return (
    <g>
      <line x1={x} y1={y - 22} x2={x} y2={y - 8} {...S} />
      <line x1={x - 16} y1={y - 8} x2={x + 16} y2={y - 8} {...S} />
      <line x1={x - 9} y1={y + 2} x2={x + 9} y2={y + 2} {...S} strokeWidth={4} />
      <line x1={x} y1={y + 2} x2={x} y2={y + 22} {...S} />
      <path d={`M${x - 40} ${y - 30} l14 14 M${x - 30} ${y - 16} l4 0 l0 -4`} {...S} strokeWidth={1.5} className="sun-ray" />
      <path d={`M${x - 46} ${y - 18} l14 14 M${x - 36} ${y - 4} l4 0 l0 -4`} {...S} strokeWidth={1.5} className="sun-ray" />
      <text x={x + 22} y={y - 10} className="sch-t">+</text>
      <text x={x + 22} y={y + 10} className="sch-t">−</text>
      <text x={x - 30} y={y + 42} className="sch-l">태양광 패널</text>
    </g>
  );
}

function Resistor({ x, y, label }: { x: number; y: number; label: string }) {
  const z = `M${x} ${y - 30} l0 8 l8 4 l-16 8 l16 8 l-16 8 l16 8 l-8 4 l0 8`;
  return (
    <g>
      <path d={z} {...S} />
      <text x={x + 14} y={y + 4} className="sch-l">{label}</text>
    </g>
  );
}

function Meter({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={14} {...S} />
      <text x={x} y={y + 5} textAnchor="middle" className="sch-t">V</text>
      <text x={x + 20} y={y + 4} className="sch-l">멀티미터</text>
    </g>
  );
}

function Chip({ x, y, w, h, name, pins }: { x: number; y: number; w: number; h: number; name: string; pins?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={4} {...S} />
      <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" className="sch-t">{name}</text>
      {pins && <text x={x + w / 2} y={y + h + 14} textAnchor="middle" className="sch-s">{pins}</text>}
    </g>
  );
}

export default function Schematic({ kind, ohms }: { kind: SceneKind; ohms: number }) {
  const r = `${ohms}Ω`;
  return (
    <svg viewBox="0 0 420 210" className="schematic" role="img" aria-label="이 미션 회로의 회로도">
      {kind === 'meter' && (
        <g>
          <Panel x={90} y={105} />
          <path d="M90 83 L90 50 L250 50 L250 91" {...S} />
          <path d="M90 127 L90 160 L250 160 L250 119" {...S} />
          <Meter x={250} y={105} />
          <text x={140} y={40} className="sch-s">전류 0 · 전압만 엿보기(병렬)</text>
        </g>
      )}
      {kind === 'load' && (
        <g>
          <Panel x={70} y={105} />
          <path d="M70 83 L70 45 L200 45 L200 75" {...S} className="flow" />
          <Resistor x={200} y={105} label={r} />
          <path d="M200 135 L200 165 L70 165 L70 127" {...S} className="flow" />
          <path d="M200 60 L320 60 L320 91 M320 119 L320 150 L200 150" {...S} strokeDasharray="4 4" />
          <Meter x={320} y={105} />
          <text x={96} y={36} className="sch-s">전류 →</text>
        </g>
      )}
      {(kind === 'ina219' || kind === 'bh1750' || kind === 'logger') && (
        <g>
          <Panel x={50} y={110} />
          <path d="M50 88 L50 40 L110 40" {...S} className="flow" />
          <rect x={110} y={28} width={60} height={24} rx={3} {...S} />
          <path d="M122 40 l4 -5 l6 10 l6 -10 l6 10 l4 -5" {...S} strokeWidth={1.5} />
          <text x={140} y={22} textAnchor="middle" className="sch-s">INA219 (션트 0.1Ω)</text>
          <path d="M170 40 L210 40 L210 80" {...S} className="flow" />
          <Resistor x={210} y={110} label={r} />
          <path d="M210 140 L210 175 L50 175 L50 132" {...S} className="flow" />
          <path d="M50 175 L50 196 L300 196 L300 150" {...S} strokeWidth={1.5} strokeDasharray="3 3" />
          <text x={120} y={192} className="sch-s">공통 GND</text>
          <path d="M140 52 L140 70 L270 70 L270 100" {...S} strokeWidth={1.5} />
          <text x={176} y={66} className="sch-s">I2C (SDA·SCL)</text>
          <Chip x={250} y={100} w={90} h={50} name="ESP32" pins="3.3V · GND · 21 · 22" />
          {(kind === 'bh1750' || kind === 'logger') && (
            <g>
              <Chip x={355} y={30} w={58} h={30} name="BH1750" />
              <path d="M384 60 L384 85 L320 85 L320 100" {...S} strokeWidth={1.5} />
            </g>
          )}
          {kind === 'logger' && (
            <g>
              <path d="M340 125 L370 125" {...S} strokeWidth={1.5} />
              <Chip x={370} y={110} w={46} h={30} name="맥" pins="USB" />
            </g>
          )}
        </g>
      )}
    </svg>
  );
}
