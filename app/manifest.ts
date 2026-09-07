import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '원룸 태양광 실험실',
    short_name: '태양광실험실',
    description: 'ESP32로 배우는 안전한 첫 전기 실험 — 모바일 웹 가이드',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8f9f5',
    theme_color: '#286246',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  };
}
