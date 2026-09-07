import Link from 'next/link';
import type { Part } from '@/content/parts';
import { PART_VISUALS } from '@/content/journey';
import PartArt from './PartArt';
import LabIcon from './LabIcon';
export default function PartCard({ part }: { part: Part }) {
  const visual = PART_VISUALS[part.slug];
  return <Link className="part-card" href={`/hardware/${part.slug}`}><div className={`part-card-art part-tone-${visual?.kind || 'panel'}`}><PartArt kind={visual?.kind || 'panel'}/><span>{visual?.role}</span></div><div className="part-card-copy"><h3>{part.name}</h3><p>{visual?.summary || part.oneliner}</p><span className="part-card-link">생김새와 사용법<LabIcon name="arrow" size={17}/></span></div></Link>;
}
