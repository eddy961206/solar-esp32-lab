---
model: ESP32-DevKitC
type: microcontroller
manufacturer: Espressif Systems
product_name: "ESP32 DevKitC WROOM-32D V4 CP2102 개발보드 [CMODULE-40]"
cpu: Xtensa LX6 Dual-Core
cpu_freq_mhz: 240
flash_mb: 4
sram_kb: 520
supply_voltage_v: "3.3 (GPIO) / 5V (USB 또는 VIN)"
gpio_count: 34
adc_count: 18
adc_resolution_bit: 12
i2c_default_sda: GPIO21
i2c_default_scl: GPIO22
uart_tx: GPIO1
uart_rx: GPIO3
wifi: "802.11 b/g/n 2.4GHz"
bluetooth: "BT 4.2 + BLE"
usb_chip: CP2102
usb_connector: Micro-B (5핀)
firmware_version: V4
purchase_url: "https://www.devicemart.co.kr/goods/view?no=15313999"
source: "https://www.devicemart.co.kr/goods/view?no=15313999"
last_verified: 2026-05-01
---

# ESP32 DevKitC — 마이크로컨트롤러 보드

## 📐 핵심 스펙

| 항목 | 값 |
|------|----|
| CPU | Xtensa LX6 Dual-Core, 최대 240 MHz |
| Flash | 4 MB |
| SRAM | 520 KB |
| GPIO 전압 | **3.3V** (5V 허용 안 됨!) |
| 전원 입력 | USB Micro-B (5V) 또는 VIN 핀 (5V) |
| WiFi | 802.11 b/g/n (2.4GHz) |
| Bluetooth | BT 4.2 + BLE |
| I2C (기본) | SDA=GPIO21, SCL=GPIO22 |

## 📦 주요 핀 배치

| 핀 | 기능 | 이 프로젝트 사용 |
|----|------|-----------------|
| 3V3 | 3.3V 출력 (최대 ~500mA) | INA219, BH1750 VCC 공급 |
| GND | 접지 | 공통 GND |
| GPIO21 | I2C SDA | INA219 + BH1750 SDA |
| GPIO22 | I2C SCL | INA219 + BH1750 SCL |
| GPIO1 (TX) | UART 송신 | 시리얼 모니터 출력 |
| GPIO3 (RX) | UART 수신 | 시리얼 모니터 입력 |
| GPIO34~39 | 입력 전용 ADC | (사용 안 함) |
| EN | 리셋 버튼 | — |
| BOOT | 부트 모드 버튼 | 펌웨어 업로드 시 |

## ⚠️ 주의사항

1. **GPIO 전압은 3.3V**: 모든 GPIO 핀은 **3.3V 기준**. 5V 신호 직접 인가 시 파손. 센서(INA219, BH1750) 모두 3.3V로 연결할 것.
2. **GPIO34~39는 입력 전용**: 출력으로 사용 불가.
3. **GPIO0, GPIO2**: 부팅 시 동작 모드 결정에 사용됨. 업로드 중 LOW로 당겨질 수 있으므로 이 핀에 외부 풀다운 연결 금지.
4. **ADC 주의**: WiFi 활성화 시 ADC2 채널(GPIO4, 12~15 등) 사용 불가. ADC가 필요하면 ADC1 채널(GPIO32~39) 사용.
5. **3V3 핀 전류 제한**: 3V3 핀에서 공급 가능한 전류는 약 500mA. INA219 + BH1750 합산 소모는 ~20mA이므로 문제없음.
6. **BOOT 버튼**: 업로드 실패 시 BOOT 버튼을 누른 채로 업로드 시작하면 해결되는 경우가 많음.
7. **USB 드라이버**: CP2102 또는 CH340 칩에 맞는 드라이버 설치 필요. 인식 안 될 시 드라이버 확인.

## 🔌 이 프로젝트의 전체 연결도

```
                    ESP32 DevKitC
                ┌─────────────────┐
     USB (5V) ──┤ USB             │
                │ 3V3 ───┬──► INA219 VCC
                │        └──► BH1750 VCC
                │ GND ───┬──► INA219 GND
                │        └──► BH1750 GND
                │ GPIO21 ─┬──► INA219 SDA  (I2C 공유)
                │         └──► BH1750 SDA
                │ GPIO22 ─┬──► INA219 SCL  (I2C 공유)
                │         └──► BH1750 SCL
                └─────────────────┘
```

## 💻 Arduino IDE 설정

- 보드: `ESP32 Dev Module`
- Upload Speed: `921600`
- CPU Frequency: `240MHz`
- Flash Size: `4MB`
- Partition Scheme: `Default 4MB with spiffs`
- Port: COMx (장치 관리자에서 확인)

## 📎 관련 문서

- 구매처: [디바이스마트 — ESP32 DevKitC WROOM-32D V4 CP2102](https://www.devicemart.co.kr/goods/view?no=15313999)
- Espressif 공식 문서: [ESP32 DevKitC](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/hw-reference/esp32/get-started-devkitc.html)
- 실험 로그: [docs/08-day5-esp32-serial.md](../08-day5-esp32-serial.md)
