import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '태양광 작업대',
    short_name: '태양광작업대',
    description: '작동시키면서 배우는 첫 전기 실습',
    start_url: '/',
    display: 'standalone',
    background_color: '#f6f3ec',
    theme_color: '#286246',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  };
}
