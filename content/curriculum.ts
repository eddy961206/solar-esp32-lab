// 읽을거리(커리큘럼) 3줄 요약 + 60 프로젝트 데이터

export interface CurrSummary {
  slug: string;
  lines: string[];
  forWho: string;
}

export const CURR_SUMMARIES: Record<string, CurrSummary> = {
  'volume-1-electricity-basics': {
    slug: 'volume-1-electricity-basics',
    lines: [
      '전압·전류·저항·전력을 “손으로 잰 숫자”로 이해하는 1권이에요.',
      '핵심은 딱 두 식. 전류 = 전압÷저항, 전력 = 전압×전류.',
      '저항을 100→47→20→10Ω으로 바꾸며 “작을수록 많이 먹고 뜨거워진다”를 느껴보세요.',
    ],
    forWho: '전기가 처음인 분. Day 1~2를 끝내고 읽으면 딱 맞아요.',
  },
  'volume-2-esp32-iot': {
    slug: 'volume-2-esp32-iot',
    lines: [
      'ESP32를 “숫자 읽는 작은 컴퓨터”로 쓰는 법을 담은 2권이에요.',
      '순서는 업로드 → 시리얼 숫자 → 센서 하나씩 → 두 개 같이 → 저장 순서예요.',
      '웹·MQTT·딥슬립은 측정이 안정된 뒤에 붙이는 장식이에요.',
    ],
    forWho: 'Day 3~5를 앞두고, 컴퓨터 작업이 막막한 분.',
  },
  'volume-3-solar-power-and-exam': {
    slug: 'volume-3-solar-power-and-exam',
    lines: [
      '패널을 “햇빛 판”이 아니라 “전원+부하+효율”로 보는 3권이에요.',
      '저항을 바꿔 최대전력점을 손으로 찾는 게 수동 MPPT예요.',
      '읽은 뒤엔 하루 에너지(Wh) 계산까지 해보면 전기기사 감각이 붙어요.',
    ],
    forWho: '5일을 끝내고 “그래서 태양광이 뭐지?” 싶은 분, 전기기사 관심 있는 분.',
  },
  'visual-guide': {
    slug: 'visual-guide',
    lines: [
      '글 읽기 전에 그림 6장으로 전체를 잡는 안내예요.',
      '그림 자료 페이지에서 바로 볼 수 있어요.',
    ],
    forWho: '긴 글이 부담스러운 분은 그림부터 보세요.',
  },
  'expanded-study-pack': {
    slug: 'expanded-study-pack',
    lines: [
      '3권을 더 길게 풀어쓴 확장판이에요. 8부작으로 차분히 읽어요.',
      '16주 계획표와 최종 보고서 목차까지 들어 있어요.',
      '한 번에 다 읽지 말고, 실험 진도에 맞춰 1부씩 읽으세요.',
    ],
    forWho: '책처럼 차분히 공부하고 싶은 분.',
  },
  'workbook-150-questions': {
    slug: 'workbook-150-questions',
    lines: [
      '실험으로 배운 걸 확인하는 연습문제 150개예요.',
      '웹 문제은행에서 체크하며 풀면 진행도가 저장돼요.',
    ],
    forWho: '배운 게 진짜 내 것인지 확인하고 싶은 분.',
  },
  'project-atlas-60': {
    slug: 'project-atlas-60',
    lines: [
      '다음에 뭘 만들지 60개 아이디어를 난이도별로 모았어요.',
      '아래에서 난이도별로 골라보세요. 1단계부터!',
    ],
    forWho: '5일 뒤 “이제 뭐 하지?” 싶은 분.',
  },
  'macos-arduino-esp32-setup': {
    slug: 'macos-arduino-esp32-setup',
    lines: [
      '맥에서 프로그램 설치부터 첫 업로드까지 클릭 단위로 적었어요.',
      'Day 5 하기 전에 이 순서대로 따라오면 돼요.',
    ],
    forWho: '맥북으로 Day 5를 하는 분.',
  },
  'electrician-exam-bridge': {
    slug: 'electrician-exam-bridge',
    lines: [
      '한 실험이 전기기사 어느 과목과 이어지는지 보여주는 지도예요.',
      '“옴의 법칙 = 저항 실험”처럼 번역해 두면 시험 공부가 쉬워져요.',
    ],
    forWho: '전기기사 시험을 염두에 둔 분.',
  },
  'source-index': {
    slug: 'source-index',
    lines: [
      '공식 문서·데이터시트 출처 모음이에요.',
      '더 깊이 알고 싶을 때 찾아보는 용도예요.',
    ],
    forWho: '스펙 원문이 궁금한 분.',
  },
  'experiment-note': {
    slug: 'experiment-note',
    lines: [
      '매 실험마다 쓰는 기록 양식이에요.',
      '질문→예상→측정→관찰→안전체크 순서로 적어요.',
    ],
    forWho: '기록 습관을 만들고 싶은 분.',
  },
};

export interface AtlasProject {
  id: number;
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
  learn: string;
  group: string;
}

const G = {
  A: '전기 감각',
  B: '첫 센서',
  C: '측정 심화',
  D: '데이터·웹',
  E: '전원·절전',
  F: '재미·시험',
};

export const ATLAS: AtlasProject[] = [
  { id: 1, name: '패널 개방전압 지도 만들기', level: 1, learn: '시간·방향별 전압', group: G.A },
  { id: 2, name: '저항별 전류 비교', level: 1, learn: '옴의 법칙', group: G.A },
  { id: 3, name: '저항 발열 안전 관찰', level: 1, learn: '전력·정격·열', group: G.A },
  { id: 4, name: '직렬 저항 전압 나누기', level: 1, learn: '전압분배', group: G.A },
  { id: 5, name: '병렬 저항 전류 나누기', level: 1, learn: '병렬회로', group: G.A },
  { id: 6, name: '멀티미터 극성 뒤집기 실험', level: 1, learn: '기준점·부호', group: G.A },
  { id: 7, name: '그림자 면적별 출력 비교', level: 1, learn: '부분 음영 영향', group: G.A },
  { id: 8, name: '창문 안팎 출력 비교', level: 1, learn: '유리 투과 손실', group: G.A },
  { id: 9, name: '패널 각도별 출력 비교', level: 1, learn: '빛 입사각', group: G.A },
  { id: 10, name: '하루 전압 변화 기록', level: 1, learn: '데이터 기록 습관', group: G.A },
  { id: 11, name: 'ESP32 LED 깜빡이기', level: 2, learn: '업로드·GPIO', group: G.B },
  { id: 12, name: '시리얼 숫자 출력', level: 2, learn: '화면 디버깅', group: G.B },
  { id: 13, name: 'I2C 주소 찾기', level: 2, learn: '센서 주소·버스', group: G.B },
  { id: 14, name: '밝기 측정기 만들기', level: 2, learn: 'BH1750 조도 읽기', group: G.B },
  { id: 15, name: 'INA219 전압 읽기', level: 2, learn: '버스 전압 측정', group: G.B },
  { id: 16, name: 'INA219 전류 읽기', level: 2, learn: '흐름 측정', group: G.B },
  { id: 17, name: 'INA219 전력 계산', level: 2, learn: 'P=V×I', group: G.B },
  { id: 18, name: '센서 두 개 동시 읽기', level: 2, learn: 'I2C 공유', group: G.B },
  { id: 19, name: 'LED 밝기 조절', level: 2, learn: 'PWM 기초', group: G.B },
  { id: 20, name: '버튼으로 측정 시작·정지', level: 2, learn: '입력·상태 관리', group: G.B },
  { id: 21, name: '손으로 I-V 곡선 그리기', level: 3, learn: '부하별 최대전력', group: G.C },
  { id: 22, name: '손으로 최대전력점 찾기', level: 3, learn: '수동 MPPT', group: G.C },
  { id: 23, name: '밝기-전력 그래프', level: 3, learn: '빛과 발전 관계', group: G.C },
  { id: 24, name: '구름 지나감 잡아내기', level: 3, learn: '급변 데이터 읽기', group: G.C },
  { id: 25, name: '패널 온도 기록 추가', level: 3, learn: '온도 영향', group: G.C },
  { id: 26, name: '저항 안전 여유 계산기', level: 3, learn: '정격 대비 사용률', group: G.C },
  { id: 27, name: '패널 방향 기록하기', level: 3, learn: '설치 조건', group: G.C },
  { id: 28, name: '아침·점심·저녁 비교', level: 3, learn: '시간대 패턴', group: G.C },
  { id: 29, name: '맑은 날·흐린 날 비교', level: 3, learn: '날씨 변동성', group: G.C },
  { id: 30, name: '패널 닦기 전후 비교', level: 3, learn: '유지관리 효과', group: G.C },
  { id: 31, name: 'CSV 자동 저장', level: 3, learn: '데이터 구조', group: G.D },
  { id: 32, name: '웹 현재값 화면', level: 3, learn: '작은 웹서버', group: G.D },
  { id: 33, name: 'CSV 내려받기 화면', level: 3, learn: '파일 제공', group: G.D },
  { id: 34, name: '그래프 자동 그리기', level: 3, learn: '시각화', group: G.D },
  { id: 35, name: '하루 요약 자동 계산', level: 3, learn: 'Wh·평균', group: G.D },
  { id: 36, name: '이상한 값 표시하기', level: 3, learn: '노이즈·필터', group: G.D },
  { id: 37, name: '와이파이 끊김 복구', level: 3, learn: '안정성', group: G.D },
  { id: 38, name: 'MQTT로 숫자 보내기', level: 3, learn: 'IoT 메시지', group: G.D },
  { id: 39, name: '집 대시보드에 연결', level: 4, learn: 'Home Assistant', group: G.D },
  { id: 40, name: '태양광 미니 관제판', level: 4, learn: 'Grafana 시계열', group: G.D },
  { id: 41, name: 'ESP32 전기 먹는 양 재기', level: 4, learn: '소비전류 측정', group: G.E },
  { id: 42, name: '와이파이 켜고 끄고 비교', level: 4, learn: '전력 관리', group: G.E },
  { id: 43, name: '잠자기 주기 실험', level: 4, learn: '딥슬립·평균전력', group: G.E },
  { id: 44, name: '센서 전원 스위치 달기', level: 4, learn: 'MOSFET 스위치', group: G.E },
  { id: 45, name: '배터리 없는 낮 전용 기록기', level: 4, learn: '불안정 전원 다루기', group: G.E },
  { id: 46, name: '슈퍼캐패시터로 버티기', level: 4, learn: '짧은 저장', group: G.E },
  { id: 47, name: '충전 모듈 자료 조사', level: 4, learn: '충전 안전 지식', group: G.E },
  { id: 48, name: '충전 경로 그림 그리기', level: 5, learn: '충전 구조 설계', group: G.E },
  { id: 49, name: '하루 에너지 예산표', level: 5, learn: '생산 vs 소비 Wh', group: G.E },
  { id: 50, name: '겨울 최악 조건 설계', level: 5, learn: '여유율 설계', group: G.E },
  { id: 51, name: '태양광 전력 게임', level: 3, learn: '전력 최적화 감각', group: G.F },
  { id: 52, name: '손그림 회로도 실습', level: 2, learn: '회로도 읽기', group: G.F },
  { id: 53, name: '우리 집 빛 지도', level: 2, learn: '룩스·위치 기록', group: G.F },
  { id: 54, name: '미니 발전소 보고서', level: 3, learn: '보고서 작성', group: G.F },
  { id: 55, name: '공식 카드 만들기', level: 2, learn: '시험 공식 정리', group: G.F },
  { id: 56, name: '회로 문제 100개 만들기', level: 3, learn: '문제로 바꾸기', group: G.F },
  { id: 57, name: '전력 용어 위키 쓰기', level: 3, learn: '용어 정리', group: G.F },
  { id: 58, name: '안전 체크리스트 앱', level: 4, learn: '점검표 만들기', group: G.F },
  { id: 59, name: '해바라기 추적기 설계', level: 5, learn: '서보·제어', group: G.F },
  { id: 60, name: '날씨 따라 측정 조절', level: 5, learn: '피드백 제어', group: G.F },
];

export const ATLAS_ROUTES: { name: string; ids: number[] }[] = [
  { name: '전기 초심자', ids: [1, 2, 3, 10, 14, 16, 17, 21, 31, 54] },
  { name: 'ESP32 재미', ids: [11, 12, 13, 14, 18, 31, 32, 33, 38, 39] },
  { name: '전기기사 감각', ids: [2, 4, 5, 21, 22, 26, 35, 49, 55, 56] },
  { name: '태양광 실험', ids: [1, 7, 8, 9, 21, 22, 23, 28, 29, 50] },
];
