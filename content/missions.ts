// 미션: 오늘 작동시킬 것 하나. 진도는 '작동했나', '하나 바꿔봤나'로 센다.

export type SceneKind = 'meter' | 'load' | 'ina219' | 'bh1750' | 'logger';
export type FormulaKey = 'ohm' | 'power' | 'heat' | 'shunt' | 'energy';

export interface Step {
  text: string;
  why?: string;
  safety?: boolean;
}

export interface Mission {
  id: string;
  num: number;
  title: string;
  goal: string;
  minutes: number;
  scene: SceneKind;
  parts: string[];
  controls: { resistor: boolean };
  worked: string;
  change: string;
  steps: Step[];
  idea: { title: string; point: string; story: string };
  formulas: FormulaKey[];
  branches: string[];
  safety: string[];
  code?: { label: string; lang: string; text: string }[];
}

const INA_CODE = `#include <Wire.h>
#include <Adafruit_INA219.h>

Adafruit_INA219 ina219;

void setup() {
  Serial.begin(115200);
  Wire.begin(21, 22);            // SDA = GPIO21, SCL = GPIO22
  if (!ina219.begin()) {
    Serial.println("INA219 not found - check wiring");
    while (true) delay(1000);
  }
}

void loop() {
  float volts = ina219.getBusVoltage_V();
  float mA = ina219.getCurrent_mA();
  float mW = ina219.getPower_mW();
  Serial.printf("%.2f V  %.1f mA  %.0f mW\\n", volts, mA, mW);
  delay(1000);
}`;

const BH_CODE = `#include <Wire.h>
#include <Adafruit_INA219.h>
#include <BH1750.h>

Adafruit_INA219 ina219;
BH1750 lightMeter;

void setup() {
  Serial.begin(115200);
  Wire.begin(21, 22);            // 두 센서가 같은 두 줄을 같이 씀
  ina219.begin();                // 주소 0x40
  lightMeter.begin();            // 주소 0x23
  Serial.println("lux,volts,mA,mW");
}

void loop() {
  float lux = lightMeter.readLightLevel();
  float volts = ina219.getBusVoltage_V();
  float mA = ina219.getCurrent_mA();
  float mW = ina219.getPower_mW();
  Serial.printf("%.0f,%.2f,%.1f,%.0f\\n", lux, volts, mA, mW);
  delay(1000);
}`;

const LOGGER_CODE = `# log.py — ESP32가 보내는 줄을 시간과 함께 CSV에 적는다
import csv, sys, time
import serial  # python3 -m pip install pyserial

port = sys.argv[1]  # 예: /dev/cu.usbserial-0001
with serial.Serial(port, 115200, timeout=2) as s, open("solar-log.csv", "a", newline="") as f:
    w = csv.writer(f)
    while True:
        line = s.readline().decode(errors="ignore").strip()
        if line.count(",") == 3 and not line.startswith("lux"):
            w.writerow([time.strftime("%Y-%m-%d %H:%M:%S")] + line.split(","))
            f.flush()
            print(line)`;

export const MISSIONS: Mission[] = [
  {
    id: 'wake-panel',
    num: 1,
    title: '패널 깨우기',
    goal: '멀티미터 화면에 패널이 만든 전압이 뜨게 한다',
    minutes: 15,
    scene: 'meter',
    parts: ['SNP-5MA', 'UNI-T-UT33A+'],
    controls: { resistor: false },
    worked: '멀티미터에 숫자가 뜨고, 패널을 손으로 가리면 숫자가 줄어든다',
    change: '패널을 해 쪽으로, 그다음 반대쪽으로 돌려서 숫자가 얼마나 달라지는지 본다',
    steps: [
      { text: '멀티미터 검정 선을 COM 구멍에, 빨강 선을 VΩ 구멍에 꽂는다', why: 'COM은 기준점, VΩ는 전압을 재는 입구야' },
      { text: '다이얼을 DC V(직선 표시)에 맞춘다', why: '태양광 패널은 한 방향으로만 흐르는 직류(DC)를 만들어' },
      { text: 'A, mA, 10A 쪽으로는 돌리지 않는다', safety: true, why: '전류 모드로 전압을 재면 멀티미터 안의 퓨즈가 나가' },
      { text: '패널 앞면을 잠깐 가린다', safety: true, why: '빛이 없으면 패널이 전기를 거의 안 만들어서 만지기 편해' },
      { text: '검정 침을 정션박스 왼쪽 위 나사(−)에 댄다' },
      { text: '빨강 침을 정션박스 오른쪽 위 나사(+)에 댄다', why: '아래쪽 넓은 금속판과 검은 원통 부품은 출력 단자가 아니야' },
      { text: '가림을 치우고 패널을 밝은 창가로 향하게 한 뒤 숫자를 읽는다' },
    ],
    idea: {
      title: '쉴 때 전압',
      point:
        '지금 화면의 숫자는 패널이 전기를 밀어낼 준비가 된 힘(전압)이야. 아무것도 연결하지 않아서 전기는 아직 흐르지 않아(전류 0). 그래서 이걸 "쉴 때 전압", 공식 이름으로는 개방전압이라고 불러. 실내 창가에서 3~6V만 나와도 정상이야.',
      story:
        '1839년 프랑스의 19살 에드몽 베크렐은 아버지의 실험실에서 전극에 빛을 비추자 전기가 생기는 걸 발견했어. 빛으로 전기를 만든다는 생각은 이렇게 시작됐지만, 쓸 만한 실리콘 태양전지는 115년 뒤인 1954년 벨 연구소에서야 나왔어. 네 패널 안에도 그 실리콘 셀들이 줄지어 이어져 있어.',
    },
    formulas: [],
    branches: [
      '왜 실내 창가에선 3~6V밖에 안 나올까?',
      '패널 안의 셀들은 어떻게 이어져서 10V를 만들까?',
      '멀티미터는 전기를 흘리지 않고 어떻게 전압을 잴까?',
      '정션박스의 검은 원통 부품은 뭘 보호하는 걸까?',
    ],
    safety: [
      '빨강(+)과 검정(−) 선이 서로 닿지 않게 한다',
      '220V 콘센트는 이 실험과 상관없다. 만지지 않는다',
    ],
  },
  {
    id: 'make-it-work',
    num: 2,
    title: '전기에게 일 시키기',
    goal: '시멘트 저항에 전기를 흘리고, 저항을 바꿀 때 전압이 달라지는 걸 확인한다',
    minutes: 30,
    scene: 'load',
    parts: ['SNP-5MA', 'cement-resistors', 'UNI-T-UT33A+'],
    controls: { resistor: true },
    worked: '100Ω에서 10Ω으로 바꾸면 멀티미터의 전압이 내려간다',
    change: '같은 햇빛에서 100Ω → 47Ω → 20Ω → 10Ω 순서로 바꾸며 전압을 적어 본다',
    steps: [
      { text: '패널 앞면을 가린다', safety: true },
      { text: '빨강 전선을 오른쪽 위 나사(+)에, 검정 전선을 왼쪽 위 나사(−)에 연결한다' },
      { text: '전선 끝을 WAGO 커넥터에 끼워 정리한다', why: '납땜 없이 레버만 올렸다 내리면 단단히 이어져' },
      { text: '100Ω 시멘트 저항을 빨강 선과 검정 선 사이에 잇는다 (패널 + → 저항 → 패널 −)', why: '전기가 패널에서 나와 저항을 지나 다시 패널로 돌아오는 한 바퀴 길이 생겨' },
      { text: '가림을 치우고 멀티미터(DC V)로 저항 양 끝 전압을 잰다' },
      { text: '47Ω, 20Ω, 10Ω 순서로 저항을 바꾸며 전압을 적는다' },
      { text: '10Ω은 뜨거워질 수 있으니 바꿀 때 몸체를 잡지 않는다', safety: true },
    ],
    idea: {
      title: '전압 = 전류 × 저항',
      point:
        '저항은 전기가 지나가기 힘든 정도야. 저항이 클수록 전류가 조금만 흐르고, 작을수록 많이 흘러. 그런데 패널은 늘 같은 전압을 주는 건전지가 아니라서, 일을 많이 시키면(저항이 작으면) 전압이 내려가. 위 그래프의 점이 곡선을 따라 움직이는 게 그 모습이야.',
      story:
        '1827년 게오르크 옴은 전선 길이를 바꿔 가며 실험해서 전압·전류·저항 사이의 단순한 관계를 찾았어. 그런데 처음엔 학계에서 냉대를 받았고, 한참 뒤에야 인정받아 저항의 단위(Ω)에 그의 이름이 붙었어.',
    },
    formulas: ['ohm', 'power', 'heat'],
    branches: [
      '왜 저항이 작을수록 패널 전압이 내려갈까? (I-V 곡선)',
      '패널에서 가장 많은 전력을 뽑는 점(최대 전력점)은 어떻게 찾을까?',
      '저항은 왜 뜨거워질까? 그 열은 어디서 왔을까?',
      '저항 두 개를 이어 붙이면 어떻게 될까? (직렬·병렬)',
    ],
    safety: [
      '저항은 정격(10W, 47Ω은 5W) 안에서만 쓴다. 이 패널로는 넘지 않는다',
      '배터리·보조배터리는 아직 연결하지 않는다',
    ],
  },
  {
    id: 'count-current',
    num: 3,
    title: '전류를 숫자로',
    goal: 'ESP32 시리얼 모니터에 패널의 전압·전류·전력이 1초마다 찍히게 한다',
    minutes: 60,
    scene: 'ina219',
    parts: ['ESP32-DevKitC', 'INA219', 'SNP-5MA', 'cement-resistors'],
    controls: { resistor: true },
    worked: '시리얼 모니터에 mA가 찍히고, 패널을 가리면 숫자가 줄어든다',
    change: 'INA219의 VIN+와 VIN−를 바꿔 꽂아 본다. 전류가 음수로 나오고, 망가지지는 않아',
    steps: [
      { text: 'Arduino IDE를 설치하고 설정의 보드 매니저 URL에 ESP32 주소를 넣는다', why: 'https://espressif.github.io/arduino-esp32/package_esp32_index.json' },
      { text: '보드 매니저에서 esp32를, 라이브러리 매니저에서 Adafruit INA219를 설치한다' },
      { text: '패널 앞면을 가린다', safety: true },
      { text: 'INA219 VCC → ESP32 3.3V, GND → GND, SDA → GPIO21, SCL → GPIO22', why: '앞의 둘은 센서에 밥(전원)을 주고, 뒤의 둘은 대화하는 선이야' },
      { text: '패널 + → INA219 VIN+, INA219 VIN− → 저항 → 패널 −', why: '전류는 길 중간에서 재야 해서 INA219를 길에 끼워 넣어(직렬)' },
      { text: '패널 −를 ESP32 GND에도 잇는다', why: 'INA219는 GND를 기준으로 전압을 재. 기준이 다르면 전압 숫자가 엉뚱해져' },
      { text: 'ESP32를 USB로 맥에 연결하고 아래 코드를 업로드한다', why: 'ESP32 전원은 항상 USB로. 패널은 재는 대상일 뿐이야' },
      { text: '시리얼 모니터를 115200으로 열고 가림을 치운다' },
    ],
    idea: {
      title: '길 위에서 재는 전류',
      point:
        '전압은 두 점 사이의 차이라서 옆에서 잴 수 있지만, 전류는 길을 지나가는 양이라 길 위에서 재야 해. INA219 안에는 0.1Ω짜리 아주 작은 저항(션트)이 있어. 거기 걸린 작은 전압을 재고 V = I × R을 거꾸로 풀어서 전류를 구해. 미션 2의 옴의 법칙이 그대로 측정기가 된 거야.',
      story:
        '1820년 한스 크리스티안 외르스테드는 전류가 흐르는 전선 옆에서 나침반 바늘이 움직이는 걸 발견했어. 이걸 이용해 바늘이 돌아가는 만큼 전류를 읽는 검류계가 나왔고, 오늘날의 INA219는 바늘 대신 작은 저항과 전압 측정으로 같은 일을 해.',
    },
    formulas: ['ohm', 'power', 'shunt'],
    branches: [
      'I2C는 두 줄만으로 어떻게 여러 기기와 대화할까?',
      '0.1Ω 션트에 걸리는 전압은 얼마나 작을까?',
      '왜 ESP32는 3.3V로만 신호를 다룰까?',
      'INA219를 두 개 쓰려면 주소를 어떻게 바꿀까?',
    ],
    safety: [
      'INA219가 잴 수 있는 최대 전압은 26V. 이 패널(최대 10.8V)은 안전하다',
      'ESP32 핀에 패널 선을 직접 꽂지 않는다',
    ],
    code: [{ label: 'ESP32 코드 (Arduino IDE)', lang: 'cpp', text: INA_CODE }],
  },
  {
    id: 'light-to-number',
    num: 4,
    title: '빛을 숫자로',
    goal: '밝기(lux)와 전력(mW)이 같이 오르내리는 걸 시리얼 모니터에서 본다',
    minutes: 40,
    scene: 'bh1750',
    parts: ['BH1750', 'ESP32-DevKitC', 'INA219', 'SNP-5MA'],
    controls: { resistor: true },
    worked: '손으로 패널과 센서를 같이 가리면 lux와 mW가 함께 줄어든다',
    change: '휴대폰 손전등을 센서와 패널에 비춰서, 햇빛일 때와 비교한다',
    steps: [
      { text: '라이브러리 매니저에서 BH1750(Christopher Laws)을 설치한다' },
      { text: 'BH1750 VCC → 3.3V, GND → GND, SDA → GPIO21, SCL → GPIO22', why: 'INA219와 같은 줄에 나란히 꽂으면 돼. 브레드보드의 같은 줄을 쓰면 편해' },
      { text: '센서를 패널 바로 옆, 같은 방향으로 둔다', why: '같은 빛을 받아야 비교가 돼' },
      { text: '아래 코드를 업로드하고 시리얼 모니터를 연다' },
      { text: '손으로 패널과 센서를 같이 천천히 가렸다가 치운다' },
    ],
    idea: {
      title: '빛이 많을수록 전류가 늘어',
      point:
        '패널이 만드는 전류는 들어오는 빛의 양에 거의 비례해. 반면 쉴 때 전압은 빛이 꽤 줄어도 조금만 내려가. 그래서 흐린 날엔 전압보다 전류가 훨씬 많이 줄어. 그리고 INA219(0x40)와 BH1750(0x23)은 주소가 달라서 같은 두 줄(I2C)을 나눠 쓸 수 있어.',
      story:
        '1905년 아인슈타인은 빛이 작은 알갱이(광자)처럼 에너지를 실어 나른다고 설명했어. 알갱이 하나가 전자 하나를 움직이니, 빛이 많을수록 움직이는 전자, 즉 전류가 많아지는 거야. 이 설명으로 그는 1921년 노벨상을 받았어.',
    },
    formulas: ['power'],
    branches: [
      'lux와 W/m²는 어떻게 다를까? (사람 눈 기준 vs 에너지 기준)',
      '흐린 날엔 왜 전압보다 전류가 더 줄어들까?',
      '센서가 둘 이상 같은 줄을 쓸 때 대화가 섞이지 않는 이유는?',
    ],
    safety: ['BH1750은 3.3V 전용이다. 5V에 연결하지 않는다'],
    code: [{ label: 'ESP32 코드 (Arduino IDE)', lang: 'cpp', text: BH_CODE }],
  },
  {
    id: 'log-to-mac',
    num: 5,
    title: '맥미니에 기록하기',
    goal: '한 시간 동안의 밝기·전력이 맥미니의 CSV 파일에 쌓이게 한다',
    minutes: 40,
    scene: 'logger',
    parts: ['ESP32-DevKitC', 'INA219', 'BH1750', 'SNP-5MA'],
    controls: { resistor: true },
    worked: 'solar-log.csv에 한 시간치 줄이 쌓이고 그래프 하나를 그렸다',
    change: 'ESP32 코드의 delay(1000)를 delay(10000)으로 바꿔 10초마다 기록해 본다',
    steps: [
      { text: '미션 4의 코드를 그대로 ESP32에 올려 둔다', why: '한 줄에 lux,volts,mA,mW를 쉼표로 보내' },
      { text: '맥 터미널에서 python3 -m pip install pyserial 을 실행한다' },
      { text: 'ls /dev/cu.* 로 ESP32 포트 이름을 찾는다', why: '보통 /dev/cu.usbserial-…나 /dev/cu.SLAB_USBtoUART처럼 보여' },
      { text: 'Arduino IDE의 시리얼 모니터를 닫는다', why: '포트는 한 번에 한 프로그램만 쓸 수 있어' },
      { text: '아래 log.py를 저장하고 python3 log.py /dev/cu.포트이름 으로 실행한다' },
      { text: '패널을 창가에 두고 한 시간 기다린 뒤 CSV를 Numbers나 구글 시트로 열어 그래프를 그린다' },
    ],
    idea: {
      title: '한 줄씩 보내고 한 줄씩 적기',
      point:
        'ESP32는 USB 선으로 글자를 한 줄씩 보내고(시리얼), 맥미니는 그 줄에 시간을 붙여 파일에 적어. 전력(W)에 시간(h)을 곱하면 에너지(Wh)가 되니까, 기록이 쌓이면 하루에 패널이 만든 에너지도 계산할 수 있어.',
      story:
        '1844년 새뮤얼 모스는 전선으로 신호의 길고 짧은 순서를 보내 글자를 전했어. 신호를 한 줄로 차례차례 보내는 이 방식이 오늘날 시리얼 통신의 조상이야. ESP32와 맥미니도 같은 일을 1초에 수천 글자 속도로 하고 있어.',
    },
    formulas: ['power', 'energy'],
    branches: [
      '와이파이로 폰에서 실시간으로 보려면?',
      '만든 전기를 배터리에 모으려면 무엇이 더 필요할까? (충전 컨트롤러, 안전)',
      '하루 발전량(Wh)을 그래프에서 어떻게 계산할까?',
    ],
    safety: ['배터리 충전 회로는 아직 만들지 않는다. 리튬 배터리는 별도 안전 장치가 필요하다'],
    code: [{ label: '맥미니 기록 스크립트 (Python)', lang: 'python', text: LOGGER_CODE }],
  },
];

export function getMission(id: string): Mission | undefined {
  return MISSIONS.find((m) => m.id === id);
}
