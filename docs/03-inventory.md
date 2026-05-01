# 03. 보유 장비 목록

## 이미 있는 것

> 📋 **상세 스펙은 [hardware/](hardware/_index.md) 폴더를 참고하세요.**

| 장비 | 수량 | 상세 스펙 | 핵심 요약 |
|------|------|-----------|-----------|
| SNP-5MA 태양광 패널 | 1 | [📄 스펙 보기](hardware/SNP-5MA.md) | 5W, Voc=10.8V, Vmp=9V, 6V 배터리용 |
| UNI-T UT33A+ 멀티미터 | 1 | [📄 스펙 보기](hardware/UNI-T-UT33A+.md) | DC 600V CAT II, 10A 전용 단자 있음 |
| ESP32 DevKitC | 2 | [📄 스펙 보기](hardware/ESP32-DevKitC.md) | 240MHz, I2C SDA=GPIO21/SCL=GPIO22, GPIO=3.3V |
| INA219 전류/전압 센서 | 2 | [📄 스펙 보기](hardware/INA219.md) | I2C 0x40, 최대 26V/3.2A, 직렬 연결 |
| BH1750 조도 센서 | 1 | [📄 스펙 보기](hardware/BH1750.md) | I2C 0x23, 1~65535 lux, 3.3V 전용 |
| 시멘트 저항 (10Ω/20Ω/47Ω/100Ω) | 각 1개 | [📄 스펙 보기](hardware/cement-resistors.md) | 10Ω/20Ω/100Ω=10W, 47Ω=5W |
| 브레드보드 키트 KS0332 | 1세트 | [📄 구매처](https://www.devicemart.co.kr/goods/view?no=15526409) | 830홀 브레드보드 + 3.3V/5V 전원모듈 + 점퍼선 65개 포함 |
| 점퍼선 (KS0332 포함) | 65개 | — | 브레드보드 키트에 포함. M-M 위주 |
| 0.5SQ 빨강 절연전선 (VSF) | 2M | [📄 구매처](https://www.devicemart.co.kr/goods/view?no=7170) | 양극(+) 전용, 사은품 수축튜브 포함 |
| 0.5SQ 검정 절연전선 (VSF) | 2M | [📄 구매처](https://www.devicemart.co.kr/goods/view?no=7169) | 음극(−) 전용, 사은품 수축튜브 포함 |
| 악어클립 케이블 10종 세트 | 1세트 | [📄 구매처](https://www.devicemart.co.kr/goods/view?no=1378269) | — |
| WAGO 221-612 원터치 커넥터 (2핀) | — | [📄 구매처](https://www.devicemart.co.kr/goods/view?no=10884026) | 납땜 없이 전선 연결 |
| 전자공구 3종 세트(롱노즈, 와이어스트리퍼, 니퍼) | 1 | [📄 구매처](https://www.devicemart.co.kr/goods/view?no=12229917) | — |

## 각 부품의 쉬운 역할

- 태양광 패널: 전기를 만드는 물건
- 멀티미터: 지금 전압이 몇 V인지 보는 물건
- INA219: 전압/전류를 ESP32가 읽게 해 주는 계량기
- BH1750: 밝기를 숫자로 보는 센서
- ESP32: 센서 숫자를 읽어서 컴퓨터로 보내는 작은 컴퓨터
- 브레드보드: 납땜 없이 꽂아보는 판
- 시멘트 저항: 전기를 안전하게 먹는 가짜 전기제품
