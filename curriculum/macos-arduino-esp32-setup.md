# macOS에서 Arduino IDE와 ESP32 시작하기

네가 iMac/macOS가 처음이라는 전제로 아주 천천히 적었다.

## 1. Arduino IDE 설치

1. 화면 맨 아래 `Dock`에서 `Safari` 아이콘을 클릭해.
2. 주소창에 `https://www.arduino.cc/en/software`를 입력하고 `Enter`를 눌러.
3. `macOS` 다운로드 버튼을 찾아 눌러.
4. 다운로드가 끝나면 화면 오른쪽 아래 다운로드 아이콘을 누르거나 Finder에서 `다운로드` 폴더를 열어.
5. 다운로드된 `.dmg` 파일을 더블클릭해.
6. 새 창이 열리면 `Arduino IDE` 아이콘을 `Applications` 폴더 아이콘으로 드래그해.
7. 왼쪽 아래 Finder 아이콘을 클릭해.
8. Finder 왼쪽 사이드바에서 `응용 프로그램`을 클릭해.
9. `Arduino IDE`를 찾아 더블클릭해.
10. macOS가 확인 창을 띄우면 `열기`를 눌러.

## 2. ESP32 보드 패키지 추가

1. Arduino IDE가 열리면 화면 맨 위 메뉴바에서 `Arduino IDE -> Settings...`를 클릭해.
2. 설정 창에서 `Additional boards manager URLs` 칸을 찾아.
3. 아래 주소를 넣어.

```text
https://espressif.github.io/arduino-esp32/package_esp32_index.json
```

4. `OK`를 눌러.
5. 왼쪽 세로 아이콘에서 보드 모양 아이콘 `Boards Manager`를 클릭해.
6. 검색창에 `esp32`를 입력해.
7. `esp32 by Espressif Systems`를 찾아 `Install`을 눌러.
8. 설치가 끝날 때까지 기다려.

## 3. ESP32 연결

1. ESP32 보드를 USB 케이블로 iMac에 연결해.
2. Arduino IDE 상단 메뉴에서 `Tools -> Board -> esp32`로 들어가.
3. 보드명이 정확히 보이면 그걸 고르고, 모르겠으면 일단 `ESP32 Dev Module`을 골라.
4. 상단 메뉴에서 `Tools -> Port`를 열어.
5. `/dev/cu.usbserial...` 또는 `/dev/cu.SLAB_USBtoUART...`처럼 보이는 포트를 골라.

포트가 안 보이면 아래를 확인해.

1. USB 케이블이 충전 전용일 수 있어.
2. 다른 USB 케이블을 써봐.
3. USB 허브를 빼고 iMac에 직접 꽂아봐.
4. ESP32 보드의 USB-Serial 칩 드라이버가 필요할 수 있어.

## 4. 첫 업로드

1. Arduino IDE에서 `File -> Examples -> 01.Basics -> Blink`를 클릭해.
2. 코드 창이 열리면 왼쪽 위 화살표 버튼 `Upload`를 눌러.
3. 아래 콘솔에 `Connecting...`이 오래 나오면 ESP32의 `BOOT` 버튼을 누른 채 잠깐 기다렸다가 떼.
4. 업로드가 끝나면 `Done uploading` 비슷한 메시지가 보여.

## 5. 시리얼 모니터 열기

1. 상단 메뉴에서 `Tools -> Serial Monitor`를 클릭해.
2. 오른쪽 위 baud rate를 코드와 맞춰. 보통 `115200`을 많이 써.
3. 글자가 깨지면 baud rate가 안 맞는 경우가 많아.

## 6. 라이브러리 설치

1. Arduino IDE 왼쪽 세로 아이콘에서 책 모양 `Library Manager`를 클릭해.
2. 검색창에 `Adafruit INA219`를 입력해.
3. 관련 라이브러리를 찾아 `Install`을 눌러.
4. 의존성 설치를 묻는 창이 나오면 `Install all`을 눌러.
5. 같은 방식으로 `BH1750`을 검색해서 설치해.

메뉴로도 열 수 있어.

```text
상단 메뉴바 -> Sketch -> Include Library -> Manage Libraries...
```

## 7. Finder에서 프로젝트 폴더 찾기

이 저장소 위치:

```text
/Users/seung/Code/github.com/eddy961206/solar-esp32-lab
```

Finder에서 직접 가려면:

1. Finder를 클릭해.
2. 상단 메뉴바에서 `이동 -> 폴더로 이동...`을 클릭해.
3. 위 경로를 붙여넣고 `Enter`를 눌러.

## 출처

- Arduino software: https://www.arduino.cc/en/software
- Arduino library install guide: https://support.arduino.cc/hc/en-us/articles/5145457742236-Add-libraries-to-Arduino-IDE
- Arduino-ESP32 documentation: https://documentation.espressif.com/arduino-esp32/en/latest/index.html
