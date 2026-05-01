---
type: cement-resistor
resistors:
  - value_ohm: 10
    power_rating_w: 10
    purchase_url: "https://www.devicemart.co.kr/goods/view?no=8580"
  - value_ohm: 20
    power_rating_w: 10
    purchase_url: "https://www.devicemart.co.kr/goods/view?no=5380"
  - value_ohm: 47
    power_rating_w: 5
    purchase_url: "https://www.devicemart.co.kr/goods/view?no=1276"
  - value_ohm: 100
    power_rating_w: 10
    purchase_url: "https://www.devicemart.co.kr/goods/view?no=8581"
tolerance_percent: 5
note: "고전력용 저항. 태양광 패널의 부하 시뮬레이션용으로 사용."
last_verified: 2026-05-01
---

# 시멘트 저항 — 고전력 저항 (5W/10W)

## 📐 보유 저항 목록 및 특성

| 저항값 | 정격 전력 | 구매 링크 | 용도 (SNP-5MA Vmp=9V 기준) |
|--------|-----------|-----------|---------------------------|
| 10 Ω | **10 W** | [디바이스마트](https://www.devicemart.co.kr/goods/view?no=8580) | 부하 전류 ≈ 0.9A, 전력 ≈ 8.1W → 10W 이내로 안전 |
| 20 Ω | **10 W** | [디바이스마트](https://www.devicemart.co.kr/goods/view?no=5380) | 부하 전류 ≈ 0.45A, 전력 ≈ 4.1W → 안전 |
| 47 Ω | **5 W** | [디바이스마트](https://www.devicemart.co.kr/goods/view?no=1276) | 부하 전류 ≈ 0.19A, 전력 ≈ 1.7W → 안전 |
| 100 Ω | **10 W** | [디바이스마트](https://www.devicemart.co.kr/goods/view?no=8581) | 부하 전류 ≈ 0.09A, 전력 ≈ 0.81W → 안전 |

> 📌 **실내 창가 조건**: 실제 패널 전압은 3~6V, 전류는 0.05~0.2A 수준이므로 어떤 저항을 사용해도 발열 없음.

## 📦 물리적 특성

| 항목 | 값 |
|------|----|
| 정격 전력 | 10Ω/20Ω/100Ω: **10W**, 47Ω: **5W** |
| 허용 오차 | ±5% |
| 최대 인가 전압 | 350 V |
| 온도 계수 | 300 ppm/°C |
| 외형 | 시멘트 코팅 (백색 직육면체) |

## ⚠️ 주의사항

1. **발열 주의**: 정격 전력 이상 전류 인가 시 매우 뜨거워짐. **47Ω만 5W 정격**이므로 STC 조건(Vmp=9V)에서도 1.7W로 안전. 10Ω/20Ω/100Ω은 10W 정격이라 패널 STC 조건에서도 단독 사용 가능.
2. **직렬 연결로 전력 분산**: 고전력 부하 테스트 시 저항을 직렬 연결해 1개당 전력을 낮춤.
   - 예: 10Ω + 10Ω 직렬 = 20Ω → 각 저항 소모 전력 절반.
3. **손으로 만지지 말 것**: 실험 중 및 직후에 저항 본체는 매우 뜨거울 수 있음. 집게 또는 악어클립 사용.
4. **극성 없음**: 저항은 극성 없음. 방향 무관.
5. **브레드보드 적합성**: 시멘트 저항의 리드(다리)는 브레드보드 구멍에 잘 맞음. 단, 저항 본체가 커서 주변 공간 차지.

## 🔌 이 프로젝트에서의 활용

```
태양광 패널 → INA219(VIN+/VIN−) → 시멘트 저항 → GND
                     ↑
              여기서 전압/전류 측정
```

부하(저항)를 바꿔가며 패널의 I-V 커브를 측정하는 실험에 활용.

## 📊 저항별 예상 측정값 (실내 창가 기준, 패널 Voc≈5V)

| 저항값 | 예상 전류 | 예상 전력 |
|--------|-----------|-----------|
| 10 Ω | ~0.4 A | ~2 W |
| 20 Ω | ~0.2 A | ~1 W |
| 47 Ω | ~0.1 A | ~0.5 W |
| 100 Ω | ~0.05 A | ~0.25 W |

> 실제 값은 INA219로 측정하여 기록할 것.
