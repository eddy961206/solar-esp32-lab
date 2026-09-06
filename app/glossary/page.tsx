import GlossarySearch from '@/components/GlossarySearch';
import { TERMS } from '@/content/glossary';

export const metadata = { title: '용어 사전' };

export default function GlossaryPage() {
  return (
    <div className="space-y-5 pt-6">
      <div>
        <p className="text-[13px] font-bold text-amber-700">📖 PLAIN WORDS · {TERMS.length}개</p>
        <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">용어 사전</h1>
        <p className="mt-2 text-[15px] leading-7 text-stone-500">
          어려운 말은 여기에 다 풀어놨어요. 실험하다 막히면 검색하세요.
          한 용어당 두 줄, 예시까지만 읽으면 돼요.
        </p>
      </div>
      <GlossarySearch />
    </div>
  );
}
