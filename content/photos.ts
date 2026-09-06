// Wikimedia Commons 공개 사진 (핫링크 허용).
// Special:FilePath는 썸네일 리다이렉트를 제공하는 공식 안정 주소다.
// 각 사진의 작가·라이선스를 함께 표기한다.

export interface Photo {
  src: string;
  alt: string;
  caption: string;
  credit: string;
  license: string;
  page: string;
}

const F = 'https://commons.wikimedia.org/wiki/Special:FilePath';

export const PHOTOS: Record<string, Photo> = {
  multimeter: {
    src: `${F}/2017_Cyfrowy_miernik_uniwersalny.jpg?width=800`,
    alt: 'UNI-T 디지털 멀티미터 사진',
    caption: '우리 집 UT33A+의 형제 모델(UT33B)이에요. 생김새가 거의 같아요.',
    credit: 'Jacek Halicki',
    license: 'CC BY-SA 4.0',
    page: 'https://commons.wikimedia.org/wiki/File:2017_Cyfrowy_miernik_uniwersalny.jpg',
  },
  esp32: {
    src: `${F}/ESP32_Espressif_ESP-WROOM-32_Dev_Board.jpg?width=800`,
    alt: 'ESP32 개발보드 사진',
    caption: '가운데 쇠뚜껑 칩이 ESP32예요. 양쪽 구멍들에 선을 꽂아요.',
    credit: 'Ubahnverleih',
    license: 'CC0 (퍼블릭 도메인)',
    page: 'https://commons.wikimedia.org/wiki/File:ESP32_Espressif_ESP-WROOM-32_Dev_Board.jpg',
  },
  resistors: {
    src: `${F}/Carbon_and_ceramic_resistors_of_different_power_ratings.jpg?width=800`,
    alt: '여러 크기의 저항 사진',
    caption: '몸집이 클수록 전기를 많이 버텨요. 하얀 벽돌이 시멘트 저항이에요.',
    credit: 'David Ludovino',
    license: 'CC BY-SA 3.0',
    page: 'https://commons.wikimedia.org/wiki/File:Carbon_and_ceramic_resistors_of_different_power_ratings.jpg',
  },
  breadboard: {
    src: `${F}/400_points_breadboard.jpg?width=800`,
    alt: '브레드보드 사진',
    caption: '납땜 없이 꽂아보는 구멍판이에요. 가로·세로 줄이 이어져 있어요.',
    credit: 'oomlout',
    license: 'CC BY-SA 2.0',
    page: 'https://commons.wikimedia.org/wiki/File:400_points_breadboard.jpg',
  },
};
