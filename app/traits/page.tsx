import type { Metadata } from 'next';
import { FORMULAS, TRAITS } from '@/content/formulas';

export const metadata: Metadata = { title: '특성 카드', description: '외워 두면 일상과 회로가 다르게 보이는 공식과 부품의 성질' };

export default function TraitsPage() {
  return (
    <div className="page">
      <h1>특성 카드</h1>
      <p className="lead">시험용 공식 말고, 외워 두면 일상과 회로가 다르게 보이는 것들. 각 카드에 네 키트 어디에 있는지도 적었어.</p>
      <h2 className="section">기본 공식</h2>
      <div className="traits">
        {Object.values(FORMULAS).map((f) => (
          <article key={f.key} className="card trait">
            <p className="sym">{f.expr}</p>
            <h3>{f.name}</h3>
            <p>{f.plain}</p>
            <p className="daily">{f.daily}</p>
          </article>
        ))}
      </div>
      <h2 className="section">부품과 현상의 성질</h2>
      <div className="traits">
        {TRAITS.map((t) => (
          <article key={t.name} className="card trait">
            <p className="sym">{t.symbol}</p>
            <h3>{t.name}</h3>
            <p><b>{t.rule}</b></p>
            <p>{t.memo}</p>
            <p className="daily">일상: {t.daily}</p>
            {t.inKit && <p className="kit">내 키트: {t.inKit}</p>}
          </article>
        ))}
      </div>
    </div>
  );
}
