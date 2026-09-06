import Link from 'next/link';
import { PARTS } from '@/content/parts';

export const metadata = { title: '부품 도감' };

export default function HardwareIndex() {
  return (
    <div className="space-y-6 pt-6">
      <div>
        <p className="text-[13px] font-bold text-emerald-700">🧰 PARTS · 만져보는 설명서</p>
        <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">부품 도감</h1>
        <p className="mt-2 text-[15px] leading-7 text-stone-500">
          스펙표 말고 “이게 뭐고, 어떻게 다루나” 위주로 풀어썼어요.
          실험 전에 해당 부품만 읽고 가세요.
        </p>
      </div>

      <div className="grid gap-2 rounded-3xl border border-stone-200 bg-stone-900 p-4 text-[13px] leading-6 text-stone-200 sm:grid-cols-3">
        <p>📌 대화선: <b className="text-white">21번·22번</b> 같이 써요</p>
        <p>📌 ESP32 핀은 <b className="text-white">3.3V 전용</b></p>
        <p>📌 밝기 센서에 <b className="text-red-300">5V 금지</b></p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {PARTS.map((p) => (
          <Link
            key={p.slug}
            href={`/hardware/${p.slug}`}
            className="rounded-3xl border border-stone-200 bg-white p-4 shadow-sm transition hover:shadow-md active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-stone-100 text-2xl">{p.emoji}</span>
              <p className="text-[15px] font-bold leading-6">{p.name}</p>
              <span className="ml-auto shrink-0 font-black text-stone-300">→</span>
            </div>
            <p className="mt-2.5 line-clamp-2 text-[13px] leading-6 text-stone-500">{p.oneliner}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
