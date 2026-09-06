import Image from 'next/image';

export const metadata = { title: '그림 자료' };

const IMAGES = [
  { src: '/images/01-lab-overview.png', t: '전체 실험 개요', d: '패널은 측정 대상 · ESP32는 USB 전원의 측정 조수' },
  { src: '/images/02-ohms-law-power.png', t: '옴의 법칙과 전력', d: 'V=IR · P=VI — 저항이 작아지면 전류·발열 증가' },
  { src: '/images/03-esp32-i2c-wiring.png', t: 'ESP32 I2C 배선', d: 'SDA 21 · SCL 22 · 패널+→INA219→저항→패널-' },
  { src: '/images/04-solar-iv-mppt.png', t: 'I-V 곡선과 수동 MPPT', d: '100→47→20→10Ω으로 최대전력점 찾기' },
  { src: '/images/05-safety-boundary.png', t: '안전 경계', d: '해도 되는 것 / 아직 안 되는 것 구분' },
  { src: '/images/06-16-week-roadmap.png', t: '16주 로드맵', d: '보기→측정→분석→전기기사 연결 4단계' },
];

export default function GalleryPage() {
  return (
    <div className="space-y-5 pt-6">
      <div>
        <p className="text-[13px] font-bold text-pink-700">🖼️ VISUAL GUIDE</p>
        <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">그림 자료 6장</h1>
        <p className="mt-2 text-sm leading-6 text-stone-500">
          글을 읽기 전에 큰 그림부터 잡으세요. 이미지를 탭하면 크게 볼 수 있습니다.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {IMAGES.map((img) => (
          <a
            key={img.src}
            href={img.src}
            target="_blank"
            rel="noreferrer"
            className="group overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition hover:shadow-md"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
              <Image
                src={img.src}
                alt={img.t}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition group-hover:scale-[1.02]"
              />
            </div>
            <div className="p-4">
              <p className="text-[15px] font-black">{img.t}</p>
              <p className="mt-0.5 text-[13px] leading-5 text-stone-500">{img.d}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
