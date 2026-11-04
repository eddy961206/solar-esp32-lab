import type { Metadata } from 'next';
import Link from 'next/link';
import { PARTS } from '@/content/parts';
import { GUIDE, getGuide } from '@/content/guide';
import { MISSIONS } from '@/content/missions';

export const metadata: Metadata = { title: '부품 서랍', description: '갖고 있는 부품의 역할·원리·사용법과 숫자 스펙' };

export default function PartsPage() {
  const extras = GUIDE.filter((g) => !PARTS.some((p) => p.slug === g.slug));
  return (
    <div className="page">
      <h1>부품 서랍</h1>
      <p className="lead">갖고 있는 부품마다 이게 뭐고, 어떻게 동작하고, 어떻게 쓰는지. 숫자 스펙은 그 아래에.</p>
      <div className="parts">
        {PARTS.map((p) => {
          const g = getGuide(p.slug);
          const used = MISSIONS.filter((m) => m.parts.includes(p.slug));
          return (
            <article key={p.slug} id={p.slug} className="card part">
              <h2><span aria-hidden>{p.emoji}</span> {p.name}</h2>
              {g && (
                <dl>
                  <dt>이게 뭐야</dt><dd>{g.role}</dd>
                  <dt>어떻게 동작해</dt><dd>{g.principle}</dd>
                  <dt>어떻게 써</dt><dd>{g.use}</dd>
                </dl>
              )}
              <details>
                <summary>숫자 스펙과 주의할 점</summary>
                <table><tbody>{p.specs.map((s) => <tr key={s.k}><th>{s.k}</th><td>{s.v}</td></tr>)}</tbody></table>
                <ul>{[...p.wiring, ...p.care].map((w) => <li key={w}>{w}</li>)}</ul>
                {p.troubleshoot.length > 0 && <ul className="muted">{p.troubleshoot.map((t) => <li key={t}>{t}</li>)}</ul>}
                {p.shop && <a href={p.shop.href} target="_blank" rel="noreferrer">{p.shop.label}</a>}
              </details>
              {used.length > 0 && <p className="used">쓰는 미션: {used.map((m) => <Link key={m.id} href={`/mission/${m.id}`}>{m.num}. {m.title}</Link>)}</p>}
            </article>
          );
        })}
        {extras.map((g) => (
          <article key={g.slug} id={g.slug} className="card part">
            <h2>{g.name}</h2>
            <dl>
              <dt>이게 뭐야</dt><dd>{g.role}</dd>
              <dt>어떻게 동작해</dt><dd>{g.principle}</dd>
              <dt>어떻게 써</dt><dd>{g.use}</dd>
            </dl>
          </article>
        ))}
      </div>
      <p className="muted">전선(0.5SQ 빨강·검정 각 2m), 악어클립 10종, 점퍼선 65개, 공구 3종(롱노즈·스트리퍼·니퍼)도 서랍에 있어. 전체 목록은 저장소의 docs/03-inventory.md.</p>
    </div>
  );
}
