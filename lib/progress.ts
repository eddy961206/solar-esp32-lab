// 진도는 이 브라우저에만 저장한다. 계정이나 서버 없이 쓰는 개인 실험 노트.

export interface MissionProgress {
  steps: number[];
  worked: boolean;
  changed: boolean;
  notes: string;
}

const KEY = 'solar-lab:v2';
const empty = (): MissionProgress => ({ steps: [], worked: false, changed: false, notes: '' });

function readAll(): Record<string, MissionProgress> {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}');
  } catch {
    return {};
  }
}

export function load(id: string): MissionProgress {
  return { ...empty(), ...(readAll()[id] ?? {}) };
}

export function save(id: string, p: MissionProgress) {
  try {
    const all = readAll();
    all[id] = p;
    localStorage.setItem(KEY, JSON.stringify(all));
    window.dispatchEvent(new Event('solar-lab-progress'));
  } catch {
    // 저장이 막힌 브라우저에서도 화면은 그대로 쓸 수 있다.
  }
}

export function loadAll(): Record<string, MissionProgress> {
  return readAll();
}
