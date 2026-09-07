/** Pure educational models: not hardware calibration or SPICE. */
export const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, Number.isFinite(n) ? n : min));
export function ohm(v: number, r: number, closed = true) {
  v = clamp(v, 0, 24); r = clamp(r, 1, 1e6);
  const current = closed ? v / r : 0;
  return { v, r, current, power: v * current };
}
export function resistors(v: number, a: number, b: number, parallel: boolean) {
  a = clamp(a, 1, 1e6); b = clamp(b, 1, 1e6);
  const resistance = parallel ? 1 / (1 / a + 1 / b) : a + b;
  const total = ohm(v, resistance);
  return { ...total, resistance, i1: parallel ? v / a : total.current, i2: parallel ? v / b : total.current, v1: parallel ? v : total.current * a, v2: parallel ? v : total.current * b };
}
export function adc(v: number, bits: number, reference = 3.3) {
  const levels = 2 ** Math.round(clamp(bits, 2, 16));
  const step = reference / levels;
  const code = Math.min(levels - 1, Math.floor(clamp(v, 0, reference) / step));
  return { code, levels, step, low: code * step, high: (code + 1) * step };
}
/** I = Isc[1-(V/Voc)^8]. Reference 10 V / 0.65 A is NOT a real panel specification. */
export function solar(irradiance: number, angle: number, temperature: number, load: number) {
  const light = clamp(irradiance, 0, 1000) / 1000 * Math.max(0, Math.cos(clamp(angle, 0, 90) * Math.PI / 180));
  const lit = light > 1e-7;
  const voc = lit ? Math.max(0, 10 * (1 - .003 * (clamp(temperature, 0, 75) - 25)) * (1 + .07 * Math.log(Math.max(.001, light)))) : 0;
  const isc = lit ? .65 * light : 0;
  const at = (v: number) => voc ? isc * Math.max(0, 1 - (clamp(v, 0, voc) / voc) ** 8) : 0;
  const mppV = voc * (1 / 9) ** (1 / 8), mppI = at(mppV), mppP = mppV * mppI;
  const r = clamp(load, 1, 1e6);
  let lo = 0, hi = voc;
  for (let n = 0; n < 64; n++) { const mid = (lo + hi) / 2; if (at(mid) > mid / r) lo = mid; else hi = mid; }
  const v = (lo + hi) / 2, current = at(v), power = v * current;
  const points = Array.from({ length: 81 }, (_, i) => { const x = voc * i / 80; return { v: x, i: at(x), p: x * at(x) }; });
  return { v, current, power, voc, isc, mppV, mppI, mppP, optimalR: mppI ? mppV / mppI : 0, efficiency: mppP ? power / mppP * 100 : 0, points };
}
export function energy(panel: number, sun: number, efficiency: number, load: number, hours: number) {
  const produced = clamp(panel, 0, 100) * clamp(sun, 0, 8) * clamp(efficiency, 0, 100) / 100;
  const consumed = clamp(load, 0, 100) * clamp(hours, 0, 24);
  return { produced, consumed, balance: produced - consumed };
}
export function breadboardGroup(hole: string, split: boolean) {
  const match = /^([a-jpn])(\d{1,2})$/.exec(hole);
  if (!match || +match[2] < 1 || +match[2] > 10) return '';
  const c = match[1], row = +match[2];
  return c === 'p' || c === 'n' ? c + (split && row > 5 ? '-bottom' : '-top') : `${c <= 'e' ? 'left' : 'right'}-${row}`;
}
export function meter(mode: string, socket: string, connection: string, power: boolean) {
  if (mode === 'Ω' && power) return { ok: false, value: 'STOP', message: '저항은 전원을 끄고 회로에서 분리한 뒤 측정해요.' };
  if ((mode === 'A' || socket === 'A') && power && connection === 'parallel') return { ok: false, value: 'STOP', message: '전류 모드나 A 단자로 전원 양단을 측정하면 단락 위험이 있어요. 가상 측정을 차단했어요.' };
  if (mode === 'V' && socket === 'VΩ' && connection === 'parallel') return { ok: true, value: power ? '5.00 V' : '0.00 V', message: '전압은 두 점 사이에 병렬로 측정해요. 검정 리드는 COM에 둬요.' };
  if (mode === 'A' && socket === 'A' && connection === 'series') return { ok: true, value: power ? '0.050 A' : '0.000 A', message: '전류는 길 중간에 직렬로 측정해요. 이 가상 회로는 5 V ÷ 100 Ω = 0.05 A예요.' };
  if (mode === 'Ω' && socket === 'VΩ' && connection === 'isolated' && !power) return { ok: true, value: '100.0 Ω', message: '전원을 끄고 분리한 저항의 양 끝을 측정해요.' };
  return { ok: false, value: 'CHECK', message: '측정 모드, 빨간 리드 단자, 연결 방법을 함께 맞춰 주세요.' };
}
