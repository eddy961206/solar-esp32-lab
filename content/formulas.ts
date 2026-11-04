// 체화할 공식: 미션 화면의 지금 숫자가 들어가는 기본 공식.
// 특성 카드: 외워 두면 일상과 회로가 다르게 보이는 부품·현상의 성질.

import type { FormulaKey } from './missions';

export interface Formula {
  key: FormulaKey;
  name: string;
  expr: string;
  plain: string;
  daily: string;
}

export const FORMULAS: Record<FormulaKey, Formula> = {
  ohm: {
    key: 'ohm',
    name: '옴의 법칙',
    expr: 'V = I × R',
    plain: '밀어내는 힘(전압)은 흐르는 양(전류)과 지나가기 힘든 정도(저항)의 곱.',
    daily: '수도꼭지를 조이면(저항↑) 같은 수압에서도 물이 덜 나오는 것과 같아.',
  },
  power: {
    key: 'power',
    name: '전력',
    expr: 'P = V × I',
    plain: '1초에 하는 일의 양. 전압과 전류를 곱하면 와트(W).',
    daily: '휴대폰 충전기의 "5V 2A"는 10W라는 뜻이야.',
  },
  heat: {
    key: 'heat',
    name: '저항의 열',
    expr: 'P = I² × R',
    plain: '같은 저항이라도 전류가 두 배면 열은 네 배.',
    daily: '멀티탭에 전기를 많이 쓰는 기기를 여러 개 꽂으면 선이 뜨거워지는 이유야.',
  },
  shunt: {
    key: 'shunt',
    name: '션트로 전류 재기',
    expr: 'I = V션트 ÷ 0.1Ω',
    plain: '아주 작은 저항에 걸린 아주 작은 전압을 재서 옴의 법칙을 거꾸로 풀면 전류.',
    daily: '자동차·전기자전거의 배터리 잔량계도 같은 방법으로 전류를 세.',
  },
  energy: {
    key: 'energy',
    name: '에너지',
    expr: 'E = P × t',
    plain: '전력에 시간을 곱하면 에너지. 1W를 1시간 쓰면 1Wh.',
    daily: '전기요금 고지서의 kWh가 바로 이것. 1kWh = 1000W를 1시간.',
  },
};

export interface Trait {
  name: string;
  symbol: string;
  rule: string;
  memo: string;
  daily: string;
  inKit?: string;
}

export const TRAITS: Trait[] = [
  {
    name: '저항',
    symbol: 'R · Ω',
    rule: '전류의 흐름 자체를 방해한다. 직류든 교류든 똑같이.',
    memo: '방해한 만큼 열이 된다 (P = I²R).',
    daily: '전기난로, 토스터, 헤어드라이어의 열선.',
    inKit: '시멘트 저항, INA219 안의 0.1Ω 션트',
  },
  {
    name: '커패시터',
    symbol: 'C · F',
    rule: '전압이 갑자기 바뀌는 걸 방해한다. 전기를 잠깐 담아 두는 작은 물탱크.',
    memo: '직류는 막고 교류는 통과시킨다. 주파수가 높을수록 잘 통한다 (Xc = 1 / 2πfC).',
    daily: '카메라 플래시가 "충전 중"일 때 채우는 것, 전원 어댑터의 전압 출렁임 막기.',
    inKit: 'ESP32 보드 위의 작은 갈색·검은 칩들 대부분',
  },
  {
    name: '인덕터 (코일)',
    symbol: 'L · H',
    rule: '전류가 갑자기 바뀌는 걸 방해한다. 흐르던 전류는 계속 흐르려고 한다.',
    memo: '직류는 통과시키고 교류는 막는다. 주파수가 높을수록 더 막는다 (XL = 2πfL). 커패시터와 정반대.',
    daily: '형광등 안정기, 무선 충전기 패드, 스위치를 끌 때 튀는 불꽃.',
    inKit: 'ESP32 보드의 전원 회로에 작은 코일이 들어 있을 수 있어',
  },
  {
    name: '리액턴스',
    symbol: 'X · Ω',
    rule: '커패시터와 인덕터가 교류를 방해하는 정도. 저항처럼 Ω 단위지만 열을 내지 않는다.',
    memo: '커패시터 Xc = 1/2πfC (주파수↑ → 작아짐), 인덕터 XL = 2πfL (주파수↑ → 커짐).',
    daily: '스피커의 저음·고음 나눔 회로(크로스오버)가 이걸로 소리를 나눠.',
  },
  {
    name: '다이오드',
    symbol: 'D',
    rule: '전류를 한 방향으로만 보낸다. 반대 방향은 막는다.',
    memo: '지나갈 때 0.3~0.7V쯤 전압을 먹는다. LED도 빛나는 다이오드.',
    daily: '충전기 안에서 교류를 직류로 바꾸는 첫 단계.',
    inKit: '패널 정션박스의 검은 원통 부품은 이런 보호용 다이오드일 가능성이 커',
  },
  {
    name: '직렬과 병렬',
    symbol: '—',
    rule: '직렬은 한 줄로 이어서 같은 전류가 지나간다. 병렬은 갈래로 나눠서 같은 전압이 걸린다.',
    memo: '직렬 저항은 더하고(R1+R2), 병렬 저항은 작아진다(R1R2 / (R1+R2)).',
    daily: '집 콘센트는 모두 병렬이라 하나를 꺼도 다른 건 켜져 있어.',
    inKit: 'INA219는 직렬, 멀티미터 전압 측정은 병렬',
  },
  {
    name: '직류와 교류',
    symbol: 'DC · AC',
    rule: '직류는 한 방향으로 일정하게, 교류는 방향이 1초에 여러 번 바뀐다.',
    memo: '한국 콘센트는 220V 60Hz 교류. 1초에 60번 방향이 바뀐다.',
    daily: '건전지·태양광·USB는 직류, 벽 콘센트는 교류.',
    inKit: '이 실험은 전부 직류',
  },
];
