import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const ROOT = process.cwd();

export type Section = 'docs' | 'curriculum' | 'hardware';

export interface DocMeta {
  slug: string[];
  section: Section;
  title: string;
  description: string;
  file: string;
}

function readTitle(filePath: string, fallback: string): string {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const { content } = matter(raw);
    const m = content.match(/^#\s+(.+)$/m);
    if (m) return m[1].trim();
  } catch {
    /* ignore */
  }
  return fallback;
}

function listMarkdown(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .sort();
}

/** 섹션별 문서 메타 목록 */
export function getDocs(section: Section): DocMeta[] {
  const dir =
    section === 'docs'
      ? path.join(ROOT, 'docs')
      : section === 'curriculum'
        ? path.join(ROOT, 'curriculum')
        : path.join(ROOT, 'docs', 'hardware');

  const files = listMarkdown(dir).filter((f) => f !== '_index.md');
  return files.map((file) => {
    const slug = [file.replace(/\.md$/, '')];
    const title = readTitle(path.join(dir, file), slug[0]);
    return { slug, section, title, description: '', file };
  });
}

export function getDoc(section: Section, slug: string[]): { title: string; html: string; raw: string } | null {
  const base =
    section === 'docs'
      ? path.join(ROOT, 'docs')
      : section === 'curriculum'
        ? path.join(ROOT, 'curriculum')
        : path.join(ROOT, 'docs', 'hardware');

  // templates 하위 1단계까지 허용 (experiment-note)
  const candidates = [
    path.join(base, ...slug) + '.md',
    path.join(base, ...slug, 'index.md'),
  ];
  // curriculum/templates/experiment-note
  if (section === 'curriculum' && slug.length === 1 && slug[0] === 'experiment-note') {
    candidates.unshift(path.join(ROOT, 'curriculum', 'templates', 'experiment-note.md'));
  }

  const filePath = candidates.find((c) => fs.existsSync(c));
  if (!filePath) return null;

  const rawFile = fs.readFileSync(filePath, 'utf8');
  const { content } = matter(rawFile);
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : slug.join(' / ');
  const raw = rewriteMarkdown(content, section);
  return { title, html: '', raw };
}

/** 마크다운 내 상대경로 이미지·링크를 웹 경로로 변환 */
export function rewriteMarkdown(md: string, section: Section): string {
  let out = md;

  // ../assets/images/xxx -> /images/xxx
  out = out.replace(/(\]\()(\.\.\/)*assets\/images\//g, '$1/images/');

  // hardware/xxx.md -> /hardware/xxx
  out = out.replace(/(\]\()(hardware\/)([^)]+?)\.md(\))/g, '$1/hardware/$3$4');
  // docs 내부 링크 정리: (hardware/xxx.md) 이미 처리, (xxx.md) -> 섹션 라우트로
  out = out.replace(/(\]\()\.\/([^)]+?)\.md(\))/g, (_m, p1, p2: string, p3: string) => {
    if (p2.startsWith('hardware/')) return `${p1}/hardware/${p2.replace('hardware/', '')}${p3}`;
    const prefix = section === 'docs' ? '/docs' : section === 'hardware' ? '/hardware' : '/curriculum';
    // templates/experiment-note.md 같은 경우
    const cleaned = p2.replace(/^templates\//, '');
    return `${p1}${prefix}/${cleaned}${p3}`;
  });
  out = out.replace(/(\]\()\.\.\/assets\//g, '$1/images/');

  return out;
}

/** 네비게이션용 고정 커리큘럼 순서 */
export const CURRICULUM_ORDER = [
  { slug: 'volume-1-electricity-basics', emoji: '🔌', label: '1권 · 전기 기초', desc: '전압·전류·저항·전력을 손으로 익히기' },
  { slug: 'volume-2-esp32-iot', emoji: '📡', label: '2권 · ESP32 IoT', desc: '센서·시리얼·웹·MQTT·딥슬립' },
  { slug: 'volume-3-solar-power-and-exam', emoji: '☀️', label: '3권 · 태양광과 전기기사', desc: 'I-V곡선·MPPT·에너지예산' },
  { slug: 'visual-guide', emoji: '🖼️', label: '그림 안내', desc: '6장 시각자료로 전체 잡기' },
  { slug: 'expanded-study-pack', emoji: '📦', label: '확장 학습팩', desc: '책처럼 읽고 실험처럼 다루기' },
  { slug: 'workbook-150-questions', emoji: '📝', label: '150문제 은행', desc: '옴의법칙부터 서술형까지' },
  { slug: 'project-atlas-60', emoji: '🗺️', label: '60 프로젝트', desc: '난이도별 아이디어 백과' },
  { slug: 'macos-arduino-esp32-setup', emoji: '💻', label: 'macOS 설정', desc: 'Arduino IDE + ESP32 첫 연결' },
  { slug: 'electrician-exam-bridge', emoji: '🎓', label: '전기기사 연결표', desc: '실험→필기/실기 과목 매핑' },
  { slug: 'source-index', emoji: '📚', label: '출처 색인', desc: '참고자료 모음' },
];

export const DOCS_ORDER = [
  { slug: '01-project-overview', emoji: '🎯', label: '프로젝트 개요' },
  { slug: '02-safety-rules', emoji: '⛑️', label: '안전 수칙' },
  { slug: '03-inventory', emoji: '🧰', label: '보유 장비' },
  { slug: '04-day1-panel-multimeter', emoji: '1️⃣', label: 'Day 1 · 패널과 멀티미터' },
  { slug: '05-day2-wire-and-load', emoji: '2️⃣', label: 'Day 2 · 배선과 부하' },
  { slug: '06-day3-ina219', emoji: '3️⃣', label: 'Day 3 · INA219' },
  { slug: '07-day4-bh1750', emoji: '4️⃣', label: 'Day 4 · BH1750' },
  { slug: '08-day5-esp32-serial', emoji: '5️⃣', label: 'Day 5 · ESP32 시리얼' },
  { slug: '09-log-template', emoji: '🧾', label: '로그 템플릿' },
  { slug: '10-common-mistakes', emoji: '⚠️', label: '흔한 실수' },
  { slug: '11-next-steps', emoji: '🚀', label: '다음 단계' },
];

export const HARDWARE_ORDER = [
  { slug: 'SNP-5MA', emoji: '☀️', label: 'SNP-5MA 패널', desc: '5W · Voc 10.8V' },
  { slug: 'UNI-T-UT33A+', emoji: '🔬', label: 'UT33A+ 멀티미터', desc: 'DC 600V CAT II' },
  { slug: 'ESP32-DevKitC', emoji: '🖥️', label: 'ESP32 DevKitC', desc: 'SDA 21 · SCL 22' },
  { slug: 'INA219', emoji: '⚡', label: 'INA219 센서', desc: '0x40 · 26V/3.2A' },
  { slug: 'BH1750', emoji: '💡', label: 'BH1750 조도', desc: '0x23 · 3.3V 전용' },
  { slug: 'cement-resistors', emoji: '🧱', label: '시멘트 저항', desc: '10/20/47/100Ω' },
];
