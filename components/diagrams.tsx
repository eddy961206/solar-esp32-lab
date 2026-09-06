// 손으로 그린 SVG 도해: 배선도·회로도·개념 그림.
// 외부 이미지 의존 없이 선명하게 보이고, 모바일에서도 깨지지 않는다.

const FONT = 'Pretendard, -apple-system, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif';

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <figure className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
      <div className="bg-gradient-to-br from-stone-50 to-amber-50/50 px-2 py-2">{children}</div>
      <figcaption className="border-t border-stone-100 px-4 py-2.5 text-center text-[12px] font-semibold text-stone-500">
        {label}
      </figcaption>
    </figure>
  );
}

/** Day 1: 패널 뒷면 + − 단자에 멀티미터 침 대기 */
export function PanelMeterDiagram() {
  return (
    <Frame label="검정 침은 −(왼쪽 위), 빨강 침은 +(오른쪽 위) 나사에">
      <svg viewBox="0 0 360 250" className="h-auto w-full" role="img" aria-label="패널 뒷면 정션박스와 멀티미터 연결 그림" style={{ fontFamily: FONT }}>
        {/* 태양광 패널 */}
        <rect x="14" y="14" width="170" height="150" rx="10" fill="#1e40af" />
        {Array.from({ length: 3 }).map((_, r) =>
          Array.from({ length: 4 }).map((_, c) => (
            <rect key={`${r}-${c}`} x={24 + c * 40} y={24 + r * 44} width="32" height="36" rx="3" fill="#3b82f6" stroke="#bfdbfe" strokeWidth="1.5" />
          )),
        )}
        <text x="99" y="182" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1c1917">패널 앞면 (빛 받는 쪽)</text>
        {/* 정션박스 */}
        <rect x="196" y="40" width="150" height="110" rx="10" fill="#292524" />
        <text x="271" y="60" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fafaf9">뒷면 정션박스</text>
        <circle cx="228" cy="100" r="13" fill="#44403c" stroke="#a8a29e" strokeWidth="2" />
        <text x="228" y="105" textAnchor="middle" fontSize="14" fontWeight="900" fill="#fff">−</text>
        <text x="228" y="132" textAnchor="middle" fontSize="11" fontWeight="700" fill="#d6d3d1">왼쪽 위</text>
        <circle cx="314" cy="100" r="13" fill="#44403c" stroke="#f87171" strokeWidth="2" />
        <text x="314" y="105" textAnchor="middle" fontSize="14" fontWeight="900" fill="#fff">+</text>
        <text x="314" y="132" textAnchor="middle" fontSize="11" fontWeight="700" fill="#d6d3d1">오른쪽 위</text>
        {/* 프로브 선 */}
        <path d="M228 113 C 200 170, 180 190, 150 205" stroke="#292524" strokeWidth="4" fill="none" />
        <path d="M314 113 C 320 170, 300 195, 265 208" stroke="#ef4444" strokeWidth="4" fill="none" />
        {/* 멀티미터 */}
        <rect x="120" y="196" width="180" height="46" rx="10" fill="#fbbf24" stroke="#92400e" strokeWidth="2" />
        <rect x="132" y="204" width="96" height="30" rx="6" fill="#1c1917" />
        <text x="180" y="225" textAnchor="middle" fontSize="16" fontWeight="800" fill="#4ade80">5.42 V</text>
        <circle cx="248" cy="219" r="9" fill="#292524" />
        <circle cx="272" cy="219" r="9" fill="#ef4444" />
        <text x="210" y="200" fontSize="10" fontWeight="700" fill="#92400e">COM(검정) · VΩ(빨강) · DC V</text>
      </svg>
    </Frame>
  );
}

/** Day 2: 패널 → 저항 → 패널 한 바퀴 */
export function LoadLoopDiagram() {
  return (
    <Frame label="전기는 한 바퀴 돌아야 해요. 패널 + → 저항 → 패널 −">
      <svg viewBox="0 0 360 210" className="h-auto w-full" role="img" aria-label="패널과 저항의 순환 회로 그림" style={{ fontFamily: FONT }}>
        {/* 패널 */}
        <rect x="16" y="60" width="110" height="90" rx="10" fill="#1e40af" />
        <rect x="26" y="70" width="90" height="55" rx="4" fill="#3b82f6" stroke="#bfdbfe" strokeWidth="1.5" />
        <text x="71" y="140" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fff">패널</text>
        {/* 저항 */}
        <rect x="234" y="60" width="110" height="90" rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
        <rect x="248" y="82" width="82" height="26" rx="13" fill="#e7d8b7" stroke="#a16207" strokeWidth="2" />
        <line x1="258" y1="82" x2="258" y2="108" stroke="#b45309" strokeWidth="3" />
        <line x1="270" y1="82" x2="270" y2="108" stroke="#b45309" strokeWidth="3" />
        <line x1="282" y1="82" x2="282" y2="108" stroke="#b45309" strokeWidth="3" />
        <text x="289" y="140" textAnchor="middle" fontSize="12" fontWeight="800" fill="#92400e">저항 100Ω</text>
        {/* 위쪽 길 (+) 빨강 */}
        <line x1="126" y1="80" x2="234" y2="80" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" />
        <text x="180" y="70" textAnchor="middle" fontSize="12" fontWeight="800" fill="#dc2626">+ 빨강</text>
        <polygon points="218,73 232,80 218,87" fill="#dc2626" />
        {/* 아래쪽 길 (−) 검정 */}
        <line x1="126" y1="130" x2="234" y2="130" stroke="#292524" strokeWidth="5" strokeLinecap="round" />
        <text x="180" y="152" textAnchor="middle" fontSize="12" fontWeight="800" fill="#44403c">− 검정</text>
        <polygon points="142,123 128,130 142,137" fill="#44403c" />
        <text x="180" y="192" textAnchor="middle" fontSize="13" fontWeight="700" fill="#57534e">
          전기가 저항을 지나며 열이 돼요
        </text>
      </svg>
    </Frame>
  );
}

/** Day 3: ESP32 + INA219 직렬 측정 길 */
export function INA219Diagram() {
  return (
    <Frame label="가는 선 4개는 대화용, 굵은 길은 전기가 지나가는 길">
      <svg viewBox="0 0 360 260" className="h-auto w-full" role="img" aria-label="ESP32와 INA219 배선 그림" style={{ fontFamily: FONT }}>
        {/* ESP32 */}
        <rect x="10" y="30" width="104" height="200" rx="10" fill="#1c1917" />
        <rect x="24" y="44" width="76" height="40" rx="4" fill="#44403c" />
        <text x="62" y="68" textAnchor="middle" fontSize="13" fontWeight="900" fill="#fff">ESP32</text>
        <text x="62" y="100" textAnchor="middle" fontSize="10" fontWeight="700" fill="#a8a29e">USB 전원</text>
        {[
          { y: 122, c: '#ef4444', t: '3V3' },
          { y: 146, c: '#a8a29e', t: 'GND' },
          { y: 170, c: '#eab308', t: '21' },
          { y: 194, c: '#22c55e', t: '22' },
        ].map((p) => (
          <g key={p.t}>
            <circle cx="114" cy={p.y} r="5" fill={p.c} />
            <text x="98" y={p.y + 4} textAnchor="end" fontSize="10" fontWeight="800" fill="#e7e5e4">{p.t}</text>
          </g>
        ))}
        {/* INA219 */}
        <rect x="150" y="60" width="90" height="140" rx="8" fill="#1e40af" />
        <text x="195" y="82" textAnchor="middle" fontSize="12" fontWeight="900" fill="#fff">INA219</text>
        <text x="195" y="98" textAnchor="middle" fontSize="10" fontWeight="700" fill="#bfdbfe">계량기</text>
        {[
          { y: 122, c: '#ef4444', t: 'VCC' },
          { y: 146, c: '#a8a29e', t: 'GND' },
          { y: 170, c: '#eab308', t: 'SDA' },
          { y: 194, c: '#22c55e', t: 'SCL' },
        ].map((p) => (
          <g key={p.t}>
            <circle cx="150" cy={p.y} r="5" fill={p.c} />
            <text x="162" y={p.y + 4} fontSize="9" fontWeight="800" fill="#dbeafe">{p.t}</text>
          </g>
        ))}
        {/* 가는 대화선 */}
        <line x1="114" y1="122" x2="150" y2="122" stroke="#ef4444" strokeWidth="2.5" />
        <line x1="114" y1="146" x2="150" y2="146" stroke="#a8a29e" strokeWidth="2.5" />
        <line x1="114" y1="170" x2="150" y2="170" stroke="#eab308" strokeWidth="2.5" />
        <line x1="114" y1="194" x2="150" y2="194" stroke="#22c55e" strokeWidth="2.5" />
        {/* 측정 길 */}
        <rect x="262" y="60" width="88" height="140" rx="8" fill="#f5f5f4" stroke="#d6d3d1" strokeWidth="2" />
        <text x="306" y="82" textAnchor="middle" fontSize="11" fontWeight="900" fill="#44403c">패널+저항</text>
        <rect x="272" y="94" width="68" height="34" rx="6" fill="#1e40af" />
        <text x="306" y="115" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff">패널 +</text>
        <rect x="272" y="134" width="68" height="34" rx="6" fill="#e7d8b7" stroke="#a16207" strokeWidth="1.5" />
        <text x="306" y="155" textAnchor="middle" fontSize="11" fontWeight="800" fill="#92400e">저항 −</text>
        {/* 굵은 길 */}
        <line x1="240" y1="100" x2="272" y2="100" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" />
        <text x="256" y="90" textAnchor="middle" fontSize="10" fontWeight="800" fill="#dc2626">VIN+</text>
        <line x1="240" y1="150" x2="272" y2="150" stroke="#292524" strokeWidth="5" strokeLinecap="round" />
        <text x="256" y="170" textAnchor="middle" fontSize="10" fontWeight="800" fill="#44403c">VIN−</text>
        <text x="180" y="232" textAnchor="middle" fontSize="12" fontWeight="700" fill="#57534e">
          전기는 VIN+로 들어와 VIN−로 나가요
        </text>
      </svg>
    </Frame>
  );
}

/** Day 4: I2C 버스 공유 (ESP32 + INA219 + BH1750) */
export function I2CBusDiagram() {
  return (
    <Frame label="대화선 2개(SDA·SCL)를 두 센서가 나눠 써요. 주소가 달라서 안 헷갈려요">
      <svg viewBox="0 0 360 240" className="h-auto w-full" role="img" aria-label="I2C 버스 공유 그림" style={{ fontFamily: FONT }}>
        {/* ESP32 */}
        <rect x="126" y="10" width="108" height="52" rx="10" fill="#1c1917" />
        <text x="180" y="33" textAnchor="middle" fontSize="13" fontWeight="900" fill="#fff">ESP32</text>
        <text x="180" y="50" textAnchor="middle" fontSize="10" fontWeight="700" fill="#a8a29e">21번 SDA · 22번 SCL</text>
        {/* 버스 선 */}
        <line x1="150" y1="62" x2="150" y2="200" stroke="#eab308" strokeWidth="4" />
        <text x="138" y="140" textAnchor="end" fontSize="11" fontWeight="800" fill="#a16207">SDA</text>
        <line x1="210" y1="62" x2="210" y2="200" stroke="#22c55e" strokeWidth="4" />
        <text x="222" y="140" textAnchor="start" fontSize="11" fontWeight="800" fill="#15803d">SCL</text>
        {/* 전원 */}
        <line x1="60" y1="100" x2="300" y2="100" stroke="#ef4444" strokeWidth="2" strokeDasharray="6 4" />
        <text x="62" y="94" fontSize="10" fontWeight="800" fill="#dc2626">3.3V 같이 쓰기</text>
        <line x1="60" y1="210" x2="300" y2="210" stroke="#292524" strokeWidth="2" strokeDasharray="6 4" />
        <text x="62" y="226" fontSize="10" fontWeight="800" fill="#44403c">GND 같이 쓰기</text>
        {/* INA219 */}
        <rect x="36" y="118" width="120" height="66" rx="10" fill="#1e40af" />
        <text x="96" y="144" textAnchor="middle" fontSize="13" fontWeight="900" fill="#fff">INA219</text>
        <rect x="66" y="152" width="60" height="20" rx="10" fill="#fff" />
        <text x="96" y="166" textAnchor="middle" fontSize="11" fontWeight="900" fill="#1e40af">0x40</text>
        {/* BH1750 */}
        <rect x="204" y="118" width="120" height="66" rx="10" fill="#0e7490" />
        <text x="264" y="144" textAnchor="middle" fontSize="13" fontWeight="900" fill="#fff">BH1750</text>
        <rect x="234" y="152" width="60" height="20" rx="10" fill="#fff" />
        <text x="264" y="166" textAnchor="middle" fontSize="11" fontWeight="900" fill="#0e7490">0x23</text>
      </svg>
    </Frame>
  );
}

/** 용어: 직렬 vs 병렬 */
export function SeriesParallelDiagram() {
  return (
    <Frame label="직렬은 한 줄, 병렬은 나란히">
      <svg viewBox="0 0 360 190" className="h-auto w-full" role="img" aria-label="직렬과 병렬 비교 그림" style={{ fontFamily: FONT }}>
        <text x="90" y="20" textAnchor="middle" fontSize="13" fontWeight="900" fill="#1c1917">직렬 (한 줄)</text>
        <rect x="30" y="34" width="36" height="60" rx="6" fill="#1e40af" />
        <text x="48" y="68" textAnchor="middle" fontSize="10" fontWeight="800" fill="#fff">전원</text>
        <rect x="78" y="48" width="24" height="32" rx="4" fill="#e7d8b7" stroke="#a16207" strokeWidth="2" />
        <rect x="114" y="48" width="24" height="32" rx="4" fill="#e7d8b7" stroke="#a16207" strokeWidth="2" />
        <line x1="66" y1="64" x2="78" y2="64" stroke="#292524" strokeWidth="3" />
        <line x1="102" y1="64" x2="114" y2="64" stroke="#292524" strokeWidth="3" />
        <line x1="138" y1="64" x2="150" y2="64" stroke="#292524" strokeWidth="3" />
        <line x1="150" y1="64" x2="150" y2="120" stroke="#292524" strokeWidth="3" />
        <line x1="30" y1="120" x2="150" y2="120" stroke="#292524" strokeWidth="3" />
        <line x1="30" y1="94" x2="30" y2="120" stroke="#292524" strokeWidth="3" />
        <text x="90" y="142" textAnchor="middle" fontSize="11" fontWeight="700" fill="#57534e">전류는 모두 같아요</text>
        <text x="90" y="160" textAnchor="middle" fontSize="11" fontWeight="700" fill="#57534e">전압은 나눠 가져요</text>

        <line x1="180" y1="10" x2="180" y2="170" stroke="#e7e5e4" strokeWidth="2" />

        <text x="270" y="20" textAnchor="middle" fontSize="13" fontWeight="900" fill="#1c1917">병렬 (나란히)</text>
        <line x1="210" y1="50" x2="330" y2="50" stroke="#292524" strokeWidth="3" />
        <line x1="210" y1="100" x2="330" y2="100" stroke="#292524" strokeWidth="3" />
        <rect x="222" y="50" width="20" height="50" rx="4" fill="#e7d8b7" stroke="#a16207" strokeWidth="2" />
        <rect x="292" y="50" width="20" height="50" rx="4" fill="#e7d8b7" stroke="#a16207" strokeWidth="2" />
        <rect x="252" y="42" width="36" height="24" rx="6" fill="#1e40af" />
        <text x="270" y="59" textAnchor="middle" fontSize="10" fontWeight="800" fill="#fff">전원</text>
        <text x="270" y="142" textAnchor="middle" fontSize="11" fontWeight="700" fill="#57534e">전압은 모두 같아요</text>
        <text x="270" y="160" textAnchor="middle" fontSize="11" fontWeight="700" fill="#57534e">전류는 나눠 가져요</text>
      </svg>
    </Frame>
  );
}

/** 계산기: V=IR 삼각형 */
export function OhmTriangle() {
  return (
    <Frame label="가리고 싶은 걸 손으로 가리면 식이 보여요">
      <svg viewBox="0 0 200 170" className="h-auto w-full max-w-[240px] mx-auto" role="img" aria-label="옴의 법칙 삼각형" style={{ fontFamily: FONT }}>
        <polygon points="100,14 186,150 14,150" fill="#fffbeb" stroke="#d97706" strokeWidth="3" strokeLinejoin="round" />
        <text x="100" y="70" textAnchor="middle" fontSize="26" fontWeight="900" fill="#92400e">V</text>
        <line x1="57" y1="92" x2="143" y2="92" stroke="#d97706" strokeWidth="2.5" />
        <text x="70" y="132" textAnchor="middle" fontSize="26" fontWeight="900" fill="#92400e">I</text>
        <text x="130" y="132" textAnchor="middle" fontSize="26" fontWeight="900" fill="#92400e">R</text>
        <line x1="100" y1="92" x2="100" y2="150" stroke="#d97706" strokeWidth="2.5" />
      </svg>
    </Frame>
  );
}

/** Day 4: 밝기 감각 막대 */
export function LuxScale() {
  const marks = [
    { x: 36, t: '밤 0' },
    { x: 114, t: '방 300' },
    { x: 206, t: '창가 2만' },
    { x: 298, t: '한낮 10만' },
  ];
  return (
    <Frame label="우리 실험은 보통 창가(몇천~몇만 룩스)에서 해요">
      <svg viewBox="0 0 360 110" className="h-auto w-full" role="img" aria-label="밝기 단계 막대" style={{ fontFamily: FONT }}>
        <defs>
          <linearGradient id="luxg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#1c1917" />
            <stop offset="0.45" stopColor="#fbbf24" />
            <stop offset="1" stopColor="#fef9c3" />
          </linearGradient>
        </defs>
        <rect x="16" y="30" width="328" height="26" rx="13" fill="url(#luxg)" stroke="#d6d3d1" strokeWidth="1.5" />
        {marks.map((m) => (
          <g key={m.t}>
            <line x1={m.x} y1="26" x2={m.x} y2="60" stroke="#44403c" strokeWidth="2" />
            <text x={m.x} y="80" textAnchor="middle" fontSize="10" fontWeight="800" fill="#44403c">{m.t}</text>
          </g>
        ))}
        <text x="180" y="102" textAnchor="middle" fontSize="11" fontWeight="700" fill="#78716c">단위: 룩스(lux) · 손으로 가리면 0 근처로 떨어져요</text>
      </svg>
    </Frame>
  );
}
