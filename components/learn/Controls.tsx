'use client';
import { useId, type ReactNode } from 'react';
export type LabProps = { onPass: () => void };
export function Slider({ label, value, min, max, step = 1, unit = '', onChange }: { label: string; value: number; min: number; max: number; step?: number; unit?: string; onChange: (v: number) => void }) {
  const id = useId();
  return <div className="learn-slider"><div><label htmlFor={id}>{label}</label><output htmlFor={id}>{Number(value.toFixed(3))}<small> {unit}</small></output></div><input id={id} type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))}/><div className="range-ends" aria-hidden="true"><span>{min} {unit}</span><span>{max} {unit}</span></div></div>;
}
export function Choices<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: { value: T; label: string }[]; onChange: (v: T) => void }) {
  return <fieldset className="learn-choices"><legend>{label}</legend><div>{options.map(o => <button key={o.value} type="button" aria-pressed={o.value === value} onClick={() => onChange(o.value)}>{o.label}</button>)}</div></fieldset>;
}
export function Metrics({ items }: { items: { label: string; value: string; unit?: string }[] }) {
  return <dl className="learn-metrics">{items.map(i => <div key={i.label}><dt>{i.label}</dt><dd>{i.value}<small> {i.unit}</small></dd></div>)}</dl>;
}
export function Note({ children, warning = false }: { children: ReactNode; warning?: boolean }) { return <p className={`learn-note${warning ? ' warning' : ''}`}>{children}</p>; }
export function LabFrame({ visual, children }: { visual: ReactNode; children: ReactNode }) { return <div className="learn-workbench"><div className="learn-canvas">{visual}</div><div className="learn-controls">{children}</div></div>; }
