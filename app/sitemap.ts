import type { MetadataRoute } from 'next';
import { CURRICULUM_ORDER, DOCS_ORDER, HARDWARE_ORDER } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://solar-esp32-lab.vercel.app';
  const now = new Date();
  const urls = [
    '',
    '/docs',
    '/curriculum',
    '/hardware',
    '/workbook',
    '/calculator',
    '/gallery',
    ...DOCS_ORDER.map((d) => `/docs/${d.slug}`),
    ...CURRICULUM_ORDER.map((c) => `/curriculum/${c.slug}`),
    ...HARDWARE_ORDER.map((h) => `/hardware/${h.slug}`),
  ];
  return urls.map((u) => ({ url: base + u, lastModified: now }));
}
