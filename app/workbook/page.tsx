import fs from 'fs';
import path from 'path';
import QuizClient, { QuizSection } from './QuizClient';

export const metadata = { title: '150문제 은행' };

function parseWorkbook(): QuizSection[] {
  const file = path.join(process.cwd(), 'curriculum', 'workbook-150-questions.md');
  const raw = fs.readFileSync(file, 'utf8');
  const lines = raw.split('\n');
  const sections: QuizSection[] = [];
  let current: QuizSection | null = null;

  for (const line of lines) {
    const h = line.match(/^##\s+(.+)$/);
    if (h) {
      current = { title: h[1].trim(), questions: [] };
      sections.push(current);
      continue;
    }
    const q = line.match(/^\s*(\d+)\.\s+(.+)$/);
    if (q && current) {
      current.questions.push({ no: Number(q[1]), text: q[2].trim() });
    }
  }
  return sections.filter((s) => s.questions.length > 0);
}

export default function WorkbookPage() {
  const sections = parseWorkbook();
  const total = sections.reduce((n, s) => n + s.questions.length, 0);
  return (
    <div className="space-y-5 pt-6">
      <div>
        <p className="text-[13px] font-bold text-violet-700">📝 SELF-CHECK · {total}문제</p>
        <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">문제은행</h1>
        <p className="mt-2 text-sm leading-6 text-stone-500">
          기출 복제가 아닌 실험 기반 연습문제입니다. 아는 문제는 체크하고, 진행도는 이 기기에만
          저장됩니다. (로그인·서버전송 없음)
        </p>
      </div>
      <QuizClient sections={sections} />
    </div>
  );
}
