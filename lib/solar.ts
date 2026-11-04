// SNP-5MA 패널을 흉내 내는 단순 모델. 실측값이 아니라 감을 잡기 위한 근사다.
// 사양: Voc 10.8V, Vmp 약 9V, Isc 약 0.61A, 최대 5W (햇빛 1000W/m² 기준).

const ISC = 0.61;
const VOC = 10.8;
const CURVE = 0.7; // 무릎 모양. 이 값에서 최대 전력점이 약 9V·5W가 된다.

export interface Panel {
  sun: number; // 0~1, 1 = 한여름 직사광선
  isc: number;
  voc: number;
  current: (v: number) => number;
}

export function panel(sun: number): Panel {
  const g = Math.max(0, Math.min(1, sun));
  const isc = ISC * g;
  const voc = g <= 0 ? 0 : Math.max(0, VOC + 0.9 * Math.log(Math.max(g, 0.001)));
  const denom = Math.expm1(voc / CURVE) || 1;
  const current = (v: number) => (voc <= 0 ? 0 : Math.max(0, isc * (1 - Math.expm1(v / CURVE) / denom)));
  return { sun: g, isc, voc, current };
}

export interface Operating {
  volts: number;
  amps: number;
  watts: number;
}

/** 저항 하나를 달았을 때 패널이 일하는 점. 저항이 없으면(Infinity) 쉴 때 전압. */
export function operate(sun: number, ohms: number): Operating {
  const p = panel(sun);
  if (!Number.isFinite(ohms)) return { volts: p.voc, amps: 0, watts: 0 };
  let lo = 0;
  let hi = p.voc;
  for (let k = 0; k < 60; k++) {
    const v = (lo + hi) / 2;
    if (p.current(v) > v / ohms) lo = v;
    else hi = v;
  }
  const amps = lo / ohms;
  return { volts: lo, amps, watts: lo * amps };
}

/** I-V 곡선 점들 (그래프용). */
export function curve(sun: number, steps = 60): { v: number; i: number }[] {
  const p = panel(sun);
  return Array.from({ length: steps + 1 }, (_, k) => {
    const v = (p.voc * k) / steps;
    return { v, i: p.current(v) };
  });
}

/** 햇빛 값에 대응하는 대략적인 밝기(lux). 직사광선 약 100,000 lux. */
export function luxFor(sun: number): number {
  return Math.round(100000 * Math.max(0, Math.min(1, sun)));
}

export const RESISTORS = [
  { ohms: 100, rating: 10 },
  { ohms: 47, rating: 5 },
  { ohms: 20, rating: 10 },
  { ohms: 10, rating: 10 },
] as const;
