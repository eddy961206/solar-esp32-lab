import type { PartKind } from '@/components/PartArt';
export const DAY_VISUALS: Record<string, { title: string; kind: PartKind; outcome: string }> = {
  '04-day1-panel-multimeter': { title: '전압 재기', kind: 'meter', outcome: '패널에 빛을 비추고, 몇 볼트인지 직접 확인해요.' },
  '05-day2-wire-and-load': { title: '저항 연결하기', kind: 'resistor', outcome: '저항을 연결하기 전과 후의 전압을 비교해요.' },
  '06-day3-ina219': { title: '센서로 측정하기', kind: 'ina219', outcome: '전압뿐 아니라 흐르는 전류도 함께 읽어요.' },
  '07-day4-bh1750': { title: '밝기 비교하기', kind: 'light', outcome: '밝기와 발전량이 어떻게 달라지는지 관찰해요.' },
  '08-day5-esp32-serial': { title: '컴퓨터에 기록하기', kind: 'record', outcome: 'ESP32가 보낸 숫자를 컴퓨터에서 확인해요.' },
};
export const PART_VISUALS: Record<string, { kind: PartKind; role: string; summary: string }> = {
  'SNP-5MA': { kind: 'panel', role: '전기를 만들어요', summary: '이 실험에서 측정할 태양광 패널' },
  'UNI-T-UT33A+': { kind: 'meter', role: '전압을 확인해요', summary: '첫날부터 사용하는 전기 측정기' },
  'ESP32-DevKitC': { kind: 'esp32', role: '숫자를 전달해요', summary: '센서 값을 컴퓨터로 보내는 작은 보드' },
  'INA219': { kind: 'ina219', role: '전압·전류를 재요', summary: '전기가 흐르는 경로에 넣는 센서' },
  'BH1750': { kind: 'light', role: '밝기를 재요', summary: '빛의 밝기를 숫자로 바꾸는 센서' },
  'cement-resistors': { kind: 'resistor', role: '전기를 사용해요', summary: '전기를 열로 바꾸는 실험용 부하' },
};
