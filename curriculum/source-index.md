# 출처 색인

웹 조사 기준일: 2026-05-05

이 문서는 커리큘럼을 만들 때 참고한 주요 공식 문서와 실습 자료의 색인이다. 문서 본문에는 필요한 개념만 재구성했고, 원문을 길게 옮기지 않았다.

## 공식/제조사 문서

| 주제 | 출처 | 이 커리큘럼에서 쓴 이유 |
|---|---|---|
| Arduino-ESP32 | https://documentation.espressif.com/arduino-esp32/en/latest/index.html | ESP32 Arduino Core의 현재 문서와 개발 흐름 확인 |
| ESP32 datasheet | https://documentation.espressif.com/esp32_datasheet_en.html | GPIO, ADC, I2C, 전원, sleep mode 같은 칩 기본 특성 확인 |
| ESP32 I2C API | https://docs.espressif.com/projects/arduino-esp32/en/latest/api/i2c.html | INA219, BH1750 연결 설명의 근거 |
| ESP32 ADC | https://espressif-docs.readthedocs-hosted.com/projects/esp-idf/en/v3.3.5/api-reference/peripherals/adc.html | ADC1/ADC2, Wi-Fi 사용 시 주의점 설명 |
| ESP32 sleep modes | https://docs.espressif.com/projects/esp-idf/en/v4.4/api-reference/system/sleep_modes.html | Deep sleep을 에너지 예산과 연결 |
| INA219 | https://www.ti.com/product/INA219 | 0~26V bus, I2C power monitor, 전압/전류/전력 측정 근거 |
| INA219 guide | https://learn.adafruit.com/adafruit-ina219-current-sensor-breakout/overview | high-side current measurement를 초심자용으로 설명 |
| BH1750 | https://www.datasheetq.com/en/pdf-html/190684/ROHM/3page/BH1750FVI.html | 조도 센서 특성과 lux 측정 근거 |

## 태양광/전원 자료

| 주제 | 출처 | 이 커리큘럼에서 쓴 이유 |
|---|---|---|
| PV basics | https://www.nrel.gov/research/re-photovoltaics | 태양광 발전의 큰 원리와 용어 |
| Solar energy basics | https://www.nrel.gov/research/re-solar | 태양광 기술의 큰 맥락 |
| Solar LiPo charger | https://learn.adafruit.com/usb-dc-and-solar-lipoly-charger/using-the-charger | 배터리 충전은 전용 모듈과 안전 경계가 필요하다는 설명 |
| BQ24074 charger | https://learn.adafruit.com/adafruit-bq24074-universal-usb-dc-solar-charger-breakout | 후반 프로젝트의 충전 모듈 후보 |
| SparkFun ESP32 power | https://learn.sparkfun.com/tutorials/iot-redboard-esp32-development-board-hookup-guide/all | ESP32 보드 전원 선택과 IoT 보드 관점 |

## 프로젝트 아이디어 자료

| 주제 | 출처 | 이 커리큘럼에서 쓴 이유 |
|---|---|---|
| ESP32 datalogger | https://randomnerdtutorials.com/esp32-datalogger-download-data-file/ | CSV 저장과 웹 다운로드 프로젝트 패턴 |
| ESP32 LoRa/web server | https://randomnerdtutorials.com/esp32-lora-sensor-web-server/ | 오프그리드 센서 네트워크 확장 아이디어 |
| Solar tracker lesson | https://www.cei.washington.edu/lesson-plans-resources/solar-tracker-arduino-project/ | LDR/servo 기반 solar tracker 개념 |
| Arduino Project Hub solar tracker | https://projecthub.arduino.cc/TechnoFabrique/solar-tracker-7e420e | 초심자용 태양 추적 프로젝트 아이디어 |

## 전기기사 자료

| 주제 | 출처 | 이 커리큘럼에서 쓴 이유 |
|---|---|---|
| 전기기사 상세정보 | https://q-net.or.kr/crf005.do?gId=&gSite=Q&id=crf00503s02&jmCd=1150&jmInfoDivCcd=B0 | 과목, 검정방법, 합격기준 확인 |
| 전기기사 출제기준 | https://www.q-net.or.kr/cst006.do?artlSeq=5212066&brdId=Q006&code=1202&id=cst00602 | 2024.1.1~2026.12.31 출제기준 확인 |

## 남은 조사 과제

1. 보유한 SNP-5MA 패널의 제조사 원본 데이터시트를 확보한다.
2. 실제 사용하는 ESP32 DevKitC 보드의 USB-Serial 칩과 regulator 모델을 확인한다.
3. INA219 모듈이 Adafruit 정품인지 호환 모듈인지 확인한다.
4. 리튬 배터리 프로젝트를 시작하기 전에 충전 모듈, 보호회로, 배터리 셀 스펙을 별도 문서로 분리한다.
5. 전기기사 기출문제는 저작권과 이용조건을 확인한 뒤 직접 만든 유사 문제 중심으로 정리한다.
