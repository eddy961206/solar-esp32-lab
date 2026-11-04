import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MISSIONS, getMission } from '@/content/missions';
import MissionView from '@/components/MissionView';

export function generateStaticParams() {
  return MISSIONS.map((m) => ({ id: m.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const m = getMission(params.id);
  return m ? { title: `미션 ${m.num}. ${m.title}`, description: m.goal } : {};
}

export default function MissionPage({ params }: { params: { id: string } }) {
  const mission = getMission(params.id);
  if (!mission) notFound();
  const i = MISSIONS.indexOf(mission);
  const pick = (m?: (typeof MISSIONS)[number]) => (m ? { id: m.id, title: m.title } : undefined);
  return <MissionView mission={mission} nav={{ prev: pick(MISSIONS[i - 1]), next: pick(MISSIONS[i + 1]) }} />;
}
