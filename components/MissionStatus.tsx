'use client';

import { useEffect, useState } from 'react';
import { load, type MissionProgress } from '@/lib/progress';

export default function MissionStatus({ id, total }: { id: string; total: number }) {
  const [p, setP] = useState<MissionProgress | null>(null);
  useEffect(() => {
    const read = () => setP(load(id));
    read();
    window.addEventListener('solar-lab-progress', read);
    window.addEventListener('storage', read);
    return () => {
      window.removeEventListener('solar-lab-progress', read);
      window.removeEventListener('storage', read);
    };
  }, [id]);
  if (!p) return <p className="status">&nbsp;</p>;
  return (
    <p className="status">
      <span className={p.worked ? 'ok' : ''}>{p.worked ? '작동함' : '아직'}</span>
      <span className={p.changed ? 'ok' : ''}>{p.changed ? '바꿔봄' : '바꿔보기 전'}</span>
      <span>{p.steps.length}/{total} 단계</span>
    </p>
  );
}
