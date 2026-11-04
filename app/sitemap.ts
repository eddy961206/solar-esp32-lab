import type { MetadataRoute } from 'next';
import { MISSIONS } from '@/content/missions';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://solar-esp32-lab.vercel.app';
  const now = new Date();
  return ['', '/parts', '/traits', ...MISSIONS.map((m) => `/mission/${m.id}`)].map((u) => ({ url: base + u, lastModified: now }));
}
