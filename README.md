# 원룸 태양광 실험실

이 문서는 SNP-5MA(6V 5W 태양광 패널), UNI-T UT33A+, ESP32 DevKitC, INA219, BH1750, 브레드보드, 시멘트 저항을 사용해서 안전하게 전기를 측정하고 기록하는 첫 프로젝트를 진행하기 위한 안내서다.

## 목표

1. 사용자는 태양광 패널의 극성(+/-)을 구분할 수 있다.
2. 사용자는 멀티미터로 태양광 패널의 DC 전압을 안전하게 측정할 수 있다.
3. 사용자는 INA219로 태양광 패널의 전압과 전류를 읽을 수 있다.
4. 사용자는 ESP32로 측정값을 읽고 시리얼로 출력할 수 있다.
5. 사용자는 맥미니 또는 우분투 노트북에서 측정 로그를 저장할 수 있다.

## 문서 순서

- docs/01-project-overview.md
- docs/02-safety-rules.md
- docs/03-inventory.md
- docs/04-day1-panel-multimeter.md
- docs/05-day2-wire-and-load.md
- docs/06-day3-ina219.md
- docs/07-day4-bh1750.md
- docs/08-day5-esp32-serial.md
- docs/09-log-template.md
- docs/10-common-mistakes.md
- docs/11-next-steps.md
