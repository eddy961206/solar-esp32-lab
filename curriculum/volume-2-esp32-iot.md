# 2권 - ESP32와 아두이노식 IoT 만들기

이 권의 목표는 ESP32를 “작은 측정 컴퓨터”로 쓰는 것이다. 처음엔 코딩 실력을 뽐내는 게 아니라 센서 숫자를 안정적으로 읽고, 저장하고, 화면에 보여주는 데 집중한다.

Espressif의 Arduino-ESP32 문서는 2026년 기준 Arduino Core for ESP32 3.3.8이 ESP-IDF 5.5 기반이라고 설명한다. 이 저장소는 Arduino IDE로 시작하되, 나중에 ESP-IDF나 PlatformIO로 넘어갈 수 있게 개념을 분리해서 배운다.

## 1장. macOS에서 Arduino IDE 준비하기

네가 iMac/macOS가 처음이라는 전제로 아주 천천히 적는다.

1. 화면 맨 아래 `Dock`에서 `Safari`를 클릭한다.
2. 주소창에 `https://www.arduino.cc/en/software`를 입력한다.
3. `macOS`용 Arduino IDE를 다운로드한다.
4. 다운로드가 끝나면 화면 오른쪽 아래 또는 Finder의 `다운로드` 폴더에서 `.dmg` 파일을 연다.
5. 창 안에 `Arduino IDE` 아이콘과 `Applications` 폴더가 보이면, `Arduino IDE` 아이콘을 `Applications`로 드래그한다.
6. Finder를 연다.
7. 왼쪽 사이드바에서 `응용 프로그램`을 클릭한다.
8. `Arduino IDE`를 더블클릭한다.
9. macOS가 “인터넷에서 다운로드한 앱”이라고 물으면 `열기`를 누른다.

ESP32 보드 패키지 추가:

1. Arduino IDE 상단 메뉴바에서 `Arduino IDE -> Settings...`를 클릭한다.
2. `Additional boards manager URLs` 칸을 찾는다.
3. 아래 URL을 넣는다.

```text
https://espressif.github.io/arduino-esp32/package_esp32_index.json
```

4. `OK`를 누른다.
5. 왼쪽 세로 아이콘에서 보드 모양 `Boards Manager`를 클릭한다.
6. 검색창에 `esp32`를 입력한다.
7. `esp32 by Espressif Systems`를 설치한다.
8. ESP32를 USB로 연결한다.
9. 상단 메뉴바에서 `Tools -> Board -> esp32 -> ESP32 Dev Module` 또는 네 보드명에 가까운 항목을 고른다.
10. 상단 메뉴바에서 `Tools -> Port`를 열어 새로 생긴 포트를 고른다.

업로드가 안 되면 `BOOT` 버튼을 누른 채 업로드를 시작하고, `Connecting...`이 보일 때 버튼을 떼본다.

## 2장. ESP32 핀을 안전하게 보는 법

ESP32의 GPIO는 3.3V 논리다. 아두이노 UNO처럼 5V를 넣으면 안 된다. 센서 모듈이 `3.3V/5V compatible`이라고 적혀 있어도 실제 I2C 풀업이 5V로 걸려 있는지 확인해야 한다.

처음에 외울 핀:

| 용도 | 기본 핀 | 설명 |
|---|---:|---|
| I2C SDA | GPIO21 | 센서 데이터 |
| I2C SCL | GPIO22 | 센서 클럭 |
| UART TX/RX | 보드 USB와 연결 | 시리얼 출력 |
| ADC 입력 | GPIO32~39 우선 | 아날로그 측정 |
| GND | GND | 모든 기준점 |
| 3V3 | 3.3V | 센서 전원 |

주의할 점:

1. `GPIO34~39`는 입력 전용이다.
2. Wi-Fi 사용 중에는 ADC2 쪽 핀 사용이 제한될 수 있다.
3. 부팅 모드에 영향을 주는 strapping pin은 처음엔 피한다.
4. 센서 전원과 ESP32 GND는 반드시 공유한다.

## 3장. I2C는 센서들의 작은 버스다

I2C는 선 2개로 여러 센서를 연결하는 방식이다. SDA는 데이터, SCL은 클럭이다. INA219와 BH1750을 같이 쓰는 이유도 둘 다 I2C라서 배선이 단순하기 때문이다.

기본 구조:

```text
ESP32 3V3 -> INA219 VCC, BH1750 VCC
ESP32 GND -> INA219 GND, BH1750 GND
ESP32 GPIO21 -> INA219 SDA, BH1750 SDA
ESP32 GPIO22 -> INA219 SCL, BH1750 SCL
```

I2C 문제를 만났을 때 순서:

1. 전원이 3.3V인지 확인한다.
2. GND가 모두 이어져 있는지 확인한다.
3. SDA/SCL이 뒤집히지 않았는지 확인한다.
4. I2C scanner 예제를 올려 주소가 보이는지 확인한다.
5. 센서 두 개를 동시에 꽂기 전에 하나씩만 꽂고 테스트한다.

## 4장. 첫 코드의 목표는 예쁜 코드가 아니라 살아 있는 숫자다

처음 코드는 아래 네 값만 안정적으로 출력하면 된다.

```text
voltage_v,current_ma,power_mw,lux
```

시리얼 출력 예:

```text
5.12,38.4,196.6,28450
5.08,37.9,192.5,27810
```

이 단계에서 웹 서버, MQTT, 그래프를 바로 붙이면 디버깅이 어려워진다. 시리얼에서 숫자가 안정적으로 보인 뒤에 한 단계씩 올린다.

## 5장. 로그 저장은 과학 놀이의 시작이다

한 번 본 숫자는 감상이다. 시간순으로 쌓은 숫자는 데이터다.

초기 로그 컬럼:

| 컬럼 | 예시 | 이유 |
|---|---|---|
| timestamp | 2026-05-05 12:30 | 시간 비교 |
| voltage_v | 5.12 | 패널 전압 |
| current_ma | 38.4 | 부하 전류 |
| power_mw | 196.6 | 순간 전력 |
| lux | 28450 | 빛의 양 |
| load_ohm | 100 | 부하 조건 |
| note | 창가, 구름 | 해석 단서 |

CSV 파일 하나만 있어도 나중에 그래프, 평균, 최대값, 에너지 계산, 날씨 비교를 모두 할 수 있다.

## 6장. 웹 서버는 “내 회로가 말하게 하는” 단계다

ESP32는 Wi-Fi가 있으므로 작은 웹 서버가 될 수 있다. 처음 웹 서버는 꾸미지 않는다. 현재 측정값 네 개와 마지막 업데이트 시간만 보여주면 된다.

초기 화면 구성:

1. 현재 전압
2. 현재 전류
3. 현재 전력
4. 현재 조도
5. 마지막 측정 시각
6. CSV 다운로드 링크

Random Nerd Tutorials의 ESP32 datalogger 예제처럼 microSD에 데이터를 저장하고 웹으로 다운로드하는 패턴을 참고하면, 센서를 바꿔도 구조를 재사용할 수 있다.

## 7장. MQTT는 센서가 메시지를 보내는 우체국이다

MQTT는 IoT에서 많이 쓰는 가벼운 메시지 방식이다. 지금 당장 필수는 아니다. 하지만 나중에 Home Assistant, Node-RED, Grafana 같은 도구와 연결하고 싶다면 MQTT가 편하다.

토픽 예:

```text
solar-lab/panel/voltage
solar-lab/panel/current
solar-lab/panel/power
solar-lab/light/lux
```

처음에는 MQTT보다 시리얼과 CSV가 더 중요하다. MQTT는 “측정이 안정된 뒤” 연결한다.

## 8장. Deep sleep은 배터리 프로젝트의 문턱이다

ESP32는 light sleep, deep sleep 같은 저전력 모드를 지원한다. Espressif 문서도 ESP32가 여러 절전 모드를 가진다고 설명한다. 하지만 DevKit 보드는 USB-Serial 칩과 전원 LED 때문에 칩 자체 deep sleep 전류만큼 낮게 떨어지지 않을 수 있다.

배터리/태양광 운영을 하려면 아래 질문을 먼저 계산해야 한다.

1. 깨어 있을 때 전류는 몇 mA인가?
2. 잠잘 때 전류는 몇 mA 또는 uA인가?
3. 몇 분마다 깨어날 것인가?
4. 센서 예열 시간이 필요한가?
5. 하루 평균 소비전력은 몇 Wh인가?
6. 패널이 하루에 실제로 몇 Wh를 만들 수 있는가?

Deep sleep은 코드 한 줄이 아니라 에너지 예산 문제다.

## 9장. 좋은 프로젝트 구조

Arduino sketch가 커지면 아래처럼 나눈다.

```text
solar_logger/
  solar_logger.ino
  config.h
  sensors.h
  sensors.cpp
  storage.h
  storage.cpp
  web.h
  web.cpp
```

처음부터 이렇게 나누진 않아도 된다. 하지만 시리얼 출력, 센서 읽기, 저장, 웹 서버가 한 파일에 섞이면 나중에 고치기 어렵다.

## 10장. 2권 실습 로드맵

1. Blink 예제 업로드
2. Serial 출력
3. I2C scanner
4. BH1750 단독 읽기
5. INA219 단독 읽기
6. INA219 + BH1750 동시 읽기
7. CSV 형태로 시리얼 출력
8. 컴퓨터에서 로그 파일 저장
9. ESP32 웹 서버에 현재값 표시
10. CSV 다운로드
11. Wi-Fi 끊김 복구
12. Deep sleep으로 1분마다 측정
13. 측정 주기를 조도에 따라 바꾸기
14. MQTT 발행
15. Home Assistant 또는 Grafana 연동

## 출처

- Arduino-ESP32 official documentation: https://documentation.espressif.com/arduino-esp32/en/latest/index.html
- Arduino-ESP32 I2C API: https://docs.espressif.com/projects/arduino-esp32/en/latest/api/i2c.html
- ESP-IDF ADC documentation: https://espressif-docs.readthedocs-hosted.com/projects/esp-idf/en/v3.3.5/api-reference/peripherals/adc.html
- ESP-IDF sleep modes documentation: https://docs.espressif.com/projects/esp-idf/en/v4.4/api-reference/system/sleep_modes.html
- Random Nerd Tutorials, ESP32 Datalogger Web Server: https://randomnerdtutorials.com/esp32-datalogger-download-data-file/
