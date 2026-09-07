export type Topic = 'electricity' | 'boards' | 'solar';
export interface Module { slug: string; topic: Topic; title: string; subtitle: string; minutes: number; task: string; lesson: string; caveat: string; question: string; answers: string[]; correct: number; }
export const TOPICS: Record<Topic,string> = { electricity:'전기 기초', boards:'ESP32 · 아두이노', solar:'태양광' };
export const MODULES: Module[] = [
{slug:'ohms-law',topic:'electricity',title:'전압을 올리면?',subtitle:'전압 · 전류 · 저항 · 전력',minutes:4,task:'6 V · 100 Ω 비교 실험을 실행해 봐요.',lesson:'저항이 같을 때 전압을 2배로 올리면 전류는 2배, 전력은 4배가 돼요.',caveat:'이상적인 DC 전원과 저항 모델이에요. 움직이는 점은 관습적 전류 방향이며 전자의 실제 속도가 아니에요. 태양광 패널은 일정 전압원이 아니에요.',question:'같은 저항에서 전압이 2배가 되면 전력은?',answers:['2배','4배','그대로'],correct:1},
{slug:'series-parallel',topic:'electricity',title:'하나의 길, 두 개의 길',subtitle:'직렬 · 병렬 회로',minutes:4,task:'직렬을 병렬로 바꾸고 숫자를 비교해요.',lesson:'직렬에서는 전류가 같고 전압이 나뉘어요. 병렬에서는 전압이 같고 전류가 나뉘어요.',caveat:'이상적인 6 V 전원과 두 저항이에요. 배선 저항과 전원의 전류 한계는 생략했어요.',question:'병렬로 연결한 두 저항에 공통인 것은?',answers:['양 끝의 전압','전류','저항값'],correct:0},
{slug:'multimeter',topic:'electricity',title:'측정기, 어디에 꽂을까?',subtitle:'멀티미터 · 모드와 연결',minutes:5,task:'V · VΩ · 병렬로 맞추고 가상 전원을 켠 뒤 측정해요.',lesson:'전압은 병렬, 전류는 직렬. 저항은 전원을 끄고 분리해서 측정해요.',caveat:'5 V 전원과 100 Ω 저항의 가상 회로예요. 실제 UT33A+의 다이얼·단자·퓨즈 정격을 재현하지 않아요. 실제 배선을 바꾸기 전에는 전원을 꺼요.',question:'저항을 측정하기 전에 할 일은?',answers:['전압 올리기','A 단자에 꽂기','전원을 끄고 저항 분리하기'],correct:2},
{slug:'breadboard',topic:'electricity',title:'구멍 안의 길 찾기',subtitle:'브레드보드 · 내부 연결',minutes:3,task:'a3와 f3를 번갈아 눌러 가운데 홈 양쪽을 비교해요.',lesson:'같은 행의 a–e와 f–j는 각각 연결돼요. 가운데 홈을 사이에 둔 양쪽 묶음은 분리돼요.',caveat:'10행으로 줄인 개념도예요. 실제 전원 레일의 중간 단절 여부는 제품마다 달라요. 무전원 상태에서 연속성을 확인해요.',question:'a3와 e3는 연결되지만 a3와 f3는?',answers:['분리됨','같은 행이라 연결됨','전원이 켜지면 연결됨'],correct:0},
{slug:'board-explorer',topic:'boards',title:'작은 보드가 컴퓨터라고?',subtitle:'ESP32 · UNO R3 · Pico',minutes:5,task:'ADC 입력 핀을 눌러 역할을 읽어 봐요.',lesson:'USB 전원 전압과 GPIO의 신호 전압은 달라요. ESP32 GPIO에 5 V를 넣지 않아요.',caveat:'ESP32-DevKitC V4(WROOM-32), UNO R3(ATmega328P), Pico 1(RP2040)을 비교해요. 버튼 위치는 실제 핀 배치가 아니에요. 다른 세대에는 그대로 적용하지 않아요.',question:'ESP32에 USB 5 V를 쓰므로 GPIO도 5 V 입력을 허용할까?',answers:['모든 핀이 허용함','아니요. 신호 전압은 별도예요'],correct:1},
{slug:'pwm',topic:'boards',title:'켜고 끄는데 밝기가 달라져요',subtitle:'PWM · 듀티 비율',minutes:4,task:'듀티 비율을 25%로 맞춰 봐요.',lesson:'PWM은 중간 전압을 계속 내보내는 게 아니라 HIGH와 LOW를 빠르게 반복해요.',caveat:'이상적인 3.3 V PWM 파형이에요. LED는 평균 출력의 개념 표현이며 실제 체감 밝기는 달라요. 실제 LED에는 전류 제한 저항이 필요해요.',question:'듀티 25%는 무슨 뜻일까?',answers:['주파수가 25 Hz','전압이 25 V','한 주기의 25% 동안 HIGH'],correct:2},
{slug:'adc',topic:'boards',title:'전압은 어떻게 숫자가 될까?',subtitle:'ADC · 해상도',minutes:4,task:'해상도를 12비트로 바꿔 봐요.',lesson:'비트 수가 늘면 구분하는 칸이 많아져요. 해상도가 높다고 정확도가 자동으로 높아지지는 않아요.',caveat:'0–3.3 V를 균등 분할하는 이상적인 ADC예요. 실제 ESP32의 유효 입력 범위, 감쇠, 비선형성, 보정은 생략했어요. 이 그림으로 실제 핀 허용 전압을 정하지 않아요.',question:'12비트 ADC의 코드 수는?',answers:['12개','4,096개','3.3개'],correct:1},
{slug:'i2c',topic:'boards',title:'센서 두 개, 대화선은 두 가닥',subtitle:'I²C · 배선과 주소',minutes:5,task:'배선과 주소를 맞춘 뒤 가상 통신을 확인해요.',lesson:'SDA와 SCL은 여러 센서가 공유해요. 같은 버스의 장치 주소는 서로 구분돼야 해요.',caveat:'클래식 ESP32에서 SDA=GPIO21, SCL=GPIO22로 설정한 예시예요. 실제 I²C 풀업과 모듈 회로를 확인하고 전원을 끈 상태에서 배선해요.',question:'같은 I²C 버스에서 장치를 구분하는 것은?',answers:['장치 주소','전선 길이','USB 케이블 색'],correct:0},
{slug:'solar-panel',topic:'solar',title:'패널이 가장 힘을 내는 지점',subtitle:'빛 · 각도 · 온도 · 최대전력점',minutes:6,task:'최대전력점 근처로 맞추기 버튼을 눌러 봐요.',lesson:'전압이나 전류 하나가 아니라 V × I가 가장 큰 곳이 최대전력점이에요.',caveat:'10 V 개방전압·0.65 A 단락전류를 기준으로 한 임의의 교육용 곡선이에요. SNP-5MA의 사양이나 실측이 아니에요. 확산광·부분 음영·바이패스 다이오드·동적 MPPT 제어는 생략했어요.',question:'최대전력점에서 가장 큰 것은?',answers:['전압만','전류만','전압 × 전류'],correct:2},
{slug:'energy-budget',topic:'solar',title:'5 W 패널로 하루에 얼마나?',subtitle:'전력 W · 에너지 Wh',minutes:4,task:'사용 시간을 줄여 발전량이 소비량 이상이 되게 해요.',lesson:'W는 지금의 속도, Wh는 시간 동안 쌓인 양이에요. 5 W를 2시간 쓰면 10 Wh예요.',caveat:'발전량 = 정격 W × 등가 최대일조시간 × 시스템 효율의 계획용 모델이에요. 일조시간은 해가 떠 있는 시간이 아니에요. 배터리 설계나 충전 배선 지침이 아니에요.',question:'5 W를 2시간 사용한 에너지는?',answers:['10 Wh','2.5 W','10 V'],correct:0},
];
export const REFERENCES = [
['옴의 법칙 · OpenStax','https://openstax.org/books/university-physics-volume-2/pages/9-4-ohms-law'],
['직렬과 병렬 · OpenStax','https://openstax.org/books/university-physics-volume-2/pages/10-2-resistors-in-series-and-parallel'],
['브레드보드 · SparkFun','https://learn.sparkfun.com/tutorials/how-to-use-a-breadboard/all'],
['ESP32-DevKitC V4 · Espressif','https://docs.espressif.com/projects/esp-idf/en/v5.2/esp32/hw-reference/esp32/get-started-devkitc.html'],
['UNO R3 · Arduino','https://docs.arduino.cc/hardware/uno-rev3/'],
['Pico · Raspberry Pi','https://www.raspberrypi.com/documentation/microcontrollers/pico-series.html'],
['INA219 배선 · Adafruit','https://learn.adafruit.com/adafruit-ina219-current-sensor-breakout/wiring'],
['태양전지 I–V 곡선 · PV Education','https://www.pveducation.org/pvcdrom/solar-cell-operation/iv-curve'],
['전력과 에너지 · 미국 EIA','https://www.eia.gov/energyexplained/electricity/measuring-electricity.php'],
];
