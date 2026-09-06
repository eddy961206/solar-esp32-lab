import Link from 'next/link';
import { HARDWARE_ORDER } from '@/lib/content';

export const metadata = { title: '부품 도감' };

export default function HardwareIndex() {
  return (
    <div className="space-y-6 pt-6">
      <div>
        <p className="text-[13px] font-bold text-emerald-700">🧰 PARTS ATLAS</p>
        <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">부품 도감</h1>
        <p className="mt-2 text-sm leading-6 text-stone-500">
          I2C 주소 · 전압 레벨 · 정격 · 주의사항을 한눈에. 실험 전 해당 부품 카드를 꼭 읽으세요.
        </p>
      </div>

      <div className="grid gap-2 rounded-3xl border border-stone-200 bg-stone-900 p-4 text-[13px] leading-6 text-stone-200 sm:grid-cols-3">
        <p>📌 I2C: INA219 <b className="text-white">0x40</b> · BH1750 <b className="text-white">0x23</b></p>
        <p>📌 GPIO는 <b className="text-white">3.3V 전용</b> · SDA 21 / SCL 22</p>
        <p>📌 BH1750에 <b className="text-red-300">5V 금지</b> · 10Ω+직사광 주의</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {HARDWARE_ORDER.map((h) => (
          <Link
            key={h.slug}
            href={`/hardware/${h.slug}`}
            className="flex items-center gap-3 rounded-3xl border border-stone-200 bg-white p-4 shadow-sm transition hover:shadow-md active:scale-[0.99]"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-stone-100 text-2xl">{h.emoji}</span>
            <span>
              <span className="block text-[15px] font-bold">{h.label}</span>
              <span className="block text-[13px] text-stone-500">{h.desc}</span>
            </span>
            <span className="ml-auto font-black text-stone-300">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
