// 용어 사전: 어려운 말을 초심자 말로. 예시·비유 중심, 한 용어 2줄 이내.

export interface Term {
  t: string;
  cat: '기초' | '측정' | 'ESP32' | '태양광' | '안전';
  easy: string;
  example?: string;
  link?: string;
}

export const TERMS: Term[] = [
  { t: '전압 (V, 볼트)', cat: '기초', easy: '전기를 밀어주는 힘의 차이예요. 수압과 비슷해요.', example: '창가 패널에서 5V가 나왔다 = 물을 밀 힘(수압)이 5만큼 있다', link: '/docs/04-day1-panel-multimeter' },
  { t: '전류 (A, 암페어)', cat: '기초', easy: '실제로 흐르는 전기의 양이에요. 수도관의 물 흐름과 같아요.', example: '0.05A = 50mA. 작은 전류예요.', link: '/docs/05-day2-wire-and-load' },
  { t: '저항 (Ω, 옴)', cat: '기초', easy: '전기 흐름을 방해하는 정도예요. 수도꼭지를 조이는 것과 같아요.', example: '100Ω은 조금, 10Ω은 많이 전기를 통과시켜요.', link: '/calculator' },
  { t: '전력 (W, 와트)', cat: '기초', easy: '지금 이 순간 전기를 쓰는 속도예요. 전압×전류로 구해요.', example: '5V × 0.05A = 0.25W', link: '/calculator' },
  { t: '에너지 (Wh)', cat: '기초', easy: '전력을 시간만큼 모은 양이에요. 전력×시간으로 구해요.', example: '0.25W를 4시간 쓰면 1Wh' },
  { t: '직류 (DC)', cat: '기초', easy: '한 방향으로만 흐르는 전기예요. 건전지·패널·USB가 여기에 속해요.', example: '이 실험실은 직류만 다뤄요.' },
  { t: '교류 (AC)', cat: '기초', easy: '방향이 계속 바뀌며 흐르는 전기예요. 집 콘센트(220V)가 여기에 속해요.', example: '우리는 손대지 않아요!' },
  { t: '직렬', cat: '기초', easy: '부품들을 한 줄로 길게 잇는 거예요. 전류는 모두 같아요.', example: '패널 + → INA219 → 저항 → 패널 −', link: '/docs/06-day3-ina219' },
  { t: '병렬', cat: '기초', easy: '부품들을 나란히 잇는 거예요. 전압은 모두 같아요.', example: '센서들은 ESP32 3.3V를 나란히 나눠 써요.' },
  { t: '개방전압 (Voc)', cat: '태양광', easy: '아무것도 안 달고 쉴 때 패널 전압이에요. 가장 높게 나와요.', example: '우리 패널은 최대 약 10.8V' },
  { t: '단락전류 (Isc)', cat: '태양광', easy: '+와 −를 직접 이으면 흐르는 최대 전류예요. 직접 이으면 안 돼요!', example: '우리 패널은 최대 약 0.61A' },
  { t: '최대전력점 (Vmp·Imp)', cat: '태양광', easy: '패널이 가장 힘 좋게 일하는 지점의 전압·전류예요.', example: '저항을 바꿔가며 찾아보는 게 수동 MPPT 실험이에요.', link: '/curriculum/volume-3-solar-power-and-exam' },
  { t: 'MPPT', cat: '태양광', easy: '“가장 힘 좋은 지점 찾기”를 자동으로 해주는 기술이에요. 우리는 손으로 해봐요.' },
  { t: '룩스 (lux)', cat: '측정', easy: '밝기의 단위예요. 숫자가 클수록 밝아요.', example: '방 안은 몇백, 창가는 몇만 룩스', link: '/docs/07-day4-bh1750' },
  { t: 'I2C', cat: 'ESP32', easy: '선 2개로 여러 센서를 연결하는 대화 방식이에요.', example: 'INA219와 BH1750이 같이 써요.', link: '/docs/06-day3-ina219' },
  { t: 'SDA / SCL', cat: 'ESP32', easy: 'I2C의 두 선이에요. SDA가 데이터, SCL이 시계예요.', example: 'ESP32 21번=SDA, 22번=SCL. “21·22”만 외우세요.' },
  { t: 'GPIO', cat: 'ESP32', easy: 'ESP32의 다리(핀)예요. 센서 선을 꽂는 구멍들이에요.', example: '21번·22번 핀을 써요.' },
  { t: 'GND (접지)', cat: 'ESP32', easy: '전기의 기준점이자 돌아오는 길이에요. 검정선들이 모이는 곳이에요.', example: 'GND가 안 이어지면 센서가 이상하게 동작해요.' },
  { t: '3.3V', cat: 'ESP32', easy: 'ESP32가 센서들에게 나눠주는 전압이에요. 5V가 아니에요!', example: 'BH1750은 3.3V에만 꽂아요.' },
  { t: '시리얼 모니터', cat: 'ESP32', easy: 'ESP32가 보내는 숫자를 보여주는 컴퓨터 화면 창이에요.', example: '1초마다 전압·전류·전력·밝기가 찍혀요.', link: '/docs/08-day5-esp32-serial' },
  { t: '보드레이트 (baud)', cat: 'ESP32', easy: 'ESP32와 컴퓨터가 말하는 속도예요. 둘이 같아야 해요.', example: '보통 115200으로 맞춰요. 글자가 깨지면 이게 안 맞는 거예요.' },
  { t: '라이브러리', cat: 'ESP32', easy: '센서 사용 설명서 파일이에요. 내려받아 설치하면 센서가 말을 들어요.', example: 'Adafruit INA219, BH1750을 설치해요.' },
  { t: 'CSV', cat: '측정', easy: '“시간, 전압, 전류…”처럼 쉼표로 나열한 기록 파일이에요.', example: '엑셀로 열면 표가 돼요.', link: '/docs/09-log-template' },
  { t: 'INA219', cat: '측정', easy: '전압·전류를 재주는 계량기 칩이에요. 길 한가운데 들어가요.', link: '/hardware/INA219' },
  { t: 'BH1750', cat: '측정', easy: '밝기를 재주는 센서예요. 3.3V 전용!', link: '/hardware/BH1750' },
  { t: '정격', cat: '안전', easy: '부품이 “이 정도까지는 버텨요”라고 보증하는 한도예요.', example: '10W 저항에 2.5W면 25%라 여유. 그래도 뜨거워요.' },
  { t: '합선 (단락)', cat: '안전', easy: '+와 −가 직접 닿아서 전기가 폭주하는 거예요. 절대 금지!', example: '패널 빨강·검정선이 닿지 않게 해요.' },
  { t: '브레드보드', cat: '기초', easy: '납땜 없이 선을 꽂아보는 구멍판이에요. 큰 전류는 무리예요.' },
  { t: 'WAGO 커넥터', cat: '기초', easy: '전선을 레버로 꽉 무는 연결 부품이에요. 납땜 없이 깔끔해져요.' },
  { t: '딥슬립', cat: 'ESP32', easy: 'ESP32가 잠들었다 깨며 전기를 아끼는 절전 방법이에요. 나중에 배워요.' },
];

export const TERM_CATS = ['전체', '기초', '측정', 'ESP32', '태양광', '안전'] as const;
