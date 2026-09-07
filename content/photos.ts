// Wikimedia Commons reference photos. Attribution stays next to every displayed image.
// Model-specific wiring must be checked on the actual hardware, not these photos.

export interface Photo {
  src: string;
  alt: string;
  caption: string;
  credit: string;
  license: string;
  page: string;
  licenseUrl?: string;
}

const F = 'https://commons.wikimedia.org/wiki/Special:FilePath';

export const PHOTOS: Record<string, Photo> = {
  multimeter: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/2017_Cyfrowy_miernik_uniwersalny.jpg/960px-2017_Cyfrowy_miernik_uniwersalny.jpg',
    alt: 'UNI-T 디지털 멀티미터 사진',
    caption: '멀티미터의 생김새를 보는 참고 사진이에요. 사진은 UT33B이며, 실험의 UT33A+와 다른 모델이에요. 연결은 실제 기기의 단자 표시를 따라요.',
    credit: 'Jacek Halicki',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    page: 'https://commons.wikimedia.org/wiki/File:2017_Cyfrowy_miernik_uniwersalny.jpg',
  },
  esp32: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/ESP32_Espressif_ESP-WROOM-32_Dev_Board.jpg/960px-ESP32_Espressif_ESP-WROOM-32_Dev_Board.jpg',
    alt: 'ESP32 개발보드 사진',
    caption: '금속 덮개가 있는 부분이 ESP32 모듈이에요. 참고 사진과 가진 보드의 핀 배열·USB 단자는 다를 수 있어요.',
    credit: 'Ubahnverleih',
    license: 'CC0 1.0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    page: 'https://commons.wikimedia.org/wiki/File:ESP32_Espressif_ESP-WROOM-32_Dev_Board.jpg',
  },
  esp32Detail: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/ESP32_Espressif_ESP-WROOM-32_Dev_Board_%282%29.jpg/1280px-ESP32_Espressif_ESP-WROOM-32_Dev_Board_%282%29.jpg',
    alt: 'ESP32 개발보드의 금속 모듈과 핀 헤더를 다른 각도에서 본 사진',
    caption: '다른 각도에서 본 ESP32 개발보드예요. 이 사진은 생김새를 익히기 위한 자료이며 특정 DevKitC의 배선 기준이 아니에요.',
    credit: 'Ubahnverleih',
    license: 'CC0 1.0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    page: 'https://commons.wikimedia.org/wiki/File:ESP32_Espressif_ESP-WROOM-32_Dev_Board_(2).jpg',
  },
  resistors: {
    src: `${F}/Carbon_and_ceramic_resistors_of_different_power_ratings.jpg?width=800`,
    alt: '여러 크기의 저항 사진',
    caption: '다양한 크기의 저항이에요. 하얀 사각형이 시멘트 저항이에요. 실제 허용 전력은 크기만으로 판단하지 않고 부품의 정격 표시를 확인해요.',
    credit: 'David Ludovino',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    page: 'https://commons.wikimedia.org/wiki/File:Carbon_and_ceramic_resistors_of_different_power_ratings.jpg',
  },
  breadboard: {
    src: `${F}/400_points_breadboard.jpg?width=800`,
    alt: '브레드보드 사진',
    caption: '선을 꽂아 회로를 연결하는 브레드보드예요. 모든 구멍이 이어진 것은 아니에요. 연결된 줄과 중앙의 홈을 구분해요.',
    credit: 'oomlout',
    license: 'CC BY-SA 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
    page: 'https://commons.wikimedia.org/wiki/File:400_points_breadboard.jpg',
  },
};
