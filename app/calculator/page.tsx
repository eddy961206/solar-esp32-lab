'use client';

import { useMemo, useState } from 'react';
import { OhmTriangle } from '@/components/diagrams';

export default function CalculatorPage() {
  const [voltage, setVoltage] = useState(5);
  const [resistance, setResistance] = useState(100);
  const [rating, setRating] = useState(5);

  const { current, power, usage, level, advice } = useMemo(() => {
    const current = resistance > 0 ? voltage / resistance : 0;
    const power = voltage * current;
    const usage = rating > 0 ? (power / rating) * 100 : 0;
    let level = '안전';
    let advice = '여유 있습니다. 그래도 발열은 손대지 말고 눈으로만 확인하세요.';
    if (usage >= 100) {
      level = '위험';
      advice = '정격 초과! 즉시 중단 — 더 큰 저항값이나 높은 정격으로 바꾸세요.';
    } else if (usage >= 70) {
      level = '주의';
      advice = '정격의 70% 이상 — 장시간 연결 금지, 짧게 재고 분리하세요.';
    } else if (usage >= 40) {
      level = '보통';
      advice = '따뜻해질 수 있습니다. 측정 후 바로 분리하는 습관을 들이세요.';
    }
    return { current, power, usage, level, advice };
  }, [voltage, resistance, rating]);

  const levelStyle =
    level === '위험'
      ? 'bg-red-600'
      : level === '주의'
        ? 'bg-orange-500'
        : level === '보통'
          ? 'bg-amber-400 text-stone-900'
          : 'bg-emerald-500';

  return (
    <div className="space-y-5 pt-6">
      <div>
        <p className="text-[13px] font-bold text-amber-700">🧮 OHM&apos;S LAW LAB TOOL</p>
        <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">옴의법칙 계산기</h1>
        <p className="mt-2 text-sm leading-6 text-stone-500">
          V = I × R · P = V × I. 저항 실험 전, 전류와 발열을 먼저 숫자로 확인하세요.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="space-y-5 rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
          <OhmTriangle />
          <Slider label="전압 V" unit="V" min={0} max={12} step={0.1} value={voltage} onChange={setVoltage} />
          <Slider label="저항 R" unit="Ω" min={5} max={1000} step={1} value={resistance} onChange={setResistance} />
          <div>
            <p className="mb-2 text-sm font-bold">저항 정격 (W)</p>
            <div className="grid grid-cols-3 gap-2">
              {[2, 5, 10].map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setRating(w)}
                  className={`rounded-2xl border px-4 py-3 text-sm font-black active:scale-95 ${
                    rating === w ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-200 bg-stone-50'
                  }`}
                >
                  {w}W
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[10, 20, 47, 100].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setResistance(r)}
                className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-2 py-2.5 text-[13px] font-bold active:scale-95"
              >
                {r}Ω
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <ResultCard label="전류 I" value={`${(current * 1000).toFixed(1)} mA`} sub={`${current.toFixed(4)} A`} />
            <ResultCard label="전력 P" value={`${power.toFixed(3)} W`} sub={`${(power * 1000).toFixed(1)} mW`} />
          </div>
          <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold">정격 대비 사용률</p>
              <span className={`rounded-full px-3 py-1 text-[12px] font-black text-white ${levelStyle}`}>{level}</span>
            </div>
            <p className="mt-1 text-3xl font-black tracking-tight">{usage.toFixed(1)}%</p>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-stone-100">
              <div
                className={`h-full rounded-full transition-all ${levelStyle}`}
                style={{ width: `${Math.min(usage, 100)}%` }}
              />
            </div>
            <p className="mt-3 text-[13px] leading-6 text-stone-600">{advice}</p>
            <p className="mt-2 rounded-2xl bg-stone-50 p-3 text-[12px] leading-5 text-stone-500">
              예: 5V ÷ 10Ω = 500mA → 2.5W. 5W 저항이면 50%라 뜨거워집니다.
              10Ω을 직사광 패널(≈10V)에 단독 연결하면 정격 초과 — 절대 금지.
            </p>
          </div>
        </section>
      </div>

      <section className="rounded-3xl border border-sky-200 bg-sky-50 p-5 text-sm leading-7 text-sky-900">
        <b>🧪 실험 연결:</b> 계산 → 멀티미터 실측 → INA219 읽기 → CSV 기록 순으로 하세요.
        예상값과 실측값이 다르면 배선·접촉·온도를 먼저 의심합니다.
      </section>
    </div>
  );
}

function Slider({
  label,
  unit,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-bold">{label}</label>
        <span className="rounded-full bg-stone-900 px-3 py-1 text-[13px] font-black text-white">
          {value} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-amber-500"
        aria-label={label}
      />
      <div className="flex justify-between text-[11px] text-stone-400">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}

function ResultCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-3xl bg-stone-900 p-5 text-white shadow-lg">
      <p className="text-[12px] font-bold text-stone-400">{label}</p>
      <p className="mt-1 text-xl font-black tracking-tight">{value}</p>
      <p className="mt-0.5 text-[12px] text-stone-400">{sub}</p>
    </div>
  );
}
