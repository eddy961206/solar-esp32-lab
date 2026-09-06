'use client';

import { useMemo, useState } from 'react';
import { ATLAS, ATLAS_ROUTES } from '@/content/curriculum';

const LEVELS = ['전체', '1', '2', '3', '4', '5'] as const;
const LEVEL_NAME: Record<string, string> = {
  '1': '멀티미터',
  '2': '센서 읽기',
  '3': '저장·웹',
  '4': '절전·전원',
  '5': '후반 도전',
};

export default function AtlasExplorer() {
  const [level, setLevel] = useState<string>('전체');
  const [q, setQ] = useState('');
  const [route, setRoute] = useState<string | null>(null);

  const routeIds = useMemo(() => {
    const r = ATLAS_ROUTES.find((x) => x.name === route);
    return r ? new Set(r.ids) : null;
  }, [route]);

  const list = useMemo(() => {
    const needle = q.trim();
    return ATLAS.filter(
      (p) =>
        (level === '전체' || String(p.level) === level) &&
        (!routeIds || routeIds.has(p.id)) &&
        (!needle || p.name.includes(needle) || p.learn.includes(needle)),
    );
  }, [level, q, routeIds]);

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-sm font-black">어떤 길로 갈까요?</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {ATLAS_ROUTES.map((r) => (
            <button
              key={r.name}
              type="button"
              onClick={() => setRoute((v) => (v === r.name ? null : r.name))}
              className={`rounded-2xl border px-3 py-3 text-[13px] font-bold active:scale-95 ${
                route === r.name
                  ? 'border-stone-900 bg-stone-900 text-white'
                  : 'border-stone-200 bg-white text-stone-700'
              }`}
            >
              {r.name}
              <span className="block text-[11px] font-medium opacity-70">10개 코스</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1" style={{ WebkitOverflowScrolling: 'touch' }} aria-label="난이도 필터">
        {LEVELS.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLevel(l)}
            className={`shrink-0 rounded-full px-4 py-2.5 text-[13px] font-bold active:scale-95 ${
              level === l ? 'bg-stone-900 text-white' : 'border border-stone-200 bg-white text-stone-600'
            }`}
          >
            {l === '전체' ? '전체' : `${l}단계·${LEVEL_NAME[l]}`}
          </button>
        ))}
      </div>

      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="찾는 놀이 검색 — 예: 그래프, 충전, 추적기"
        className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-[15px] shadow-sm outline-none placeholder:text-stone-400 focus:border-amber-400"
        aria-label="프로젝트 검색"
      />

      <p className="text-[13px] font-bold text-stone-500">{list.length}개 찾았어요</p>
      <ol className="grid gap-2.5 sm:grid-cols-2">
        {list.map((p) => (
          <li key={p.id} className="flex items-start gap-3 rounded-3xl border border-stone-200 bg-white p-4 shadow-sm">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-stone-900 text-sm font-black text-white">
              {p.id}
            </span>
            <span className="min-w-0">
              <span className="block text-[15px] font-bold leading-6">{p.name}</span>
              <span className="mt-1 flex flex-wrap gap-1.5">
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-black text-amber-800">
                  {p.level}단계
                </span>
                <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[11px] font-bold text-stone-500">
                  {p.group}
                </span>
              </span>
              <span className="mt-1 block text-[13px] text-stone-500">배우는 것: {p.learn}</span>
            </span>
          </li>
        ))}
      </ol>
      {list.length === 0 && (
        <p className="rounded-3xl border border-dashed border-stone-300 bg-white p-8 text-center text-sm text-stone-500">
          조건에 맞는 놀이가 없어요. 필터를 풀어보세요.
        </p>
      )}
    </div>
  );
}
