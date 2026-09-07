import Link from 'next/link';
import { PARTS } from '@/content/parts';
import PartCard from '@/components/PartCard';
import LabIcon from '@/components/LabIcon';
import PhotoFigure from '@/components/PhotoFigure';
import { PHOTOS } from '@/content/photos';
export const metadata={title:'부품 도감'};
export default function HardwareIndex(){return <div><header className="lab-page-head"><nav className="lab-breadcrumb" aria-label="현재 위치"><Link href="/">홈</Link><LabIcon name="chevron" size={12}/><span>부품 도감</span></nav><h1>이 부품은, 무슨 일을 할까요?</h1><p>전기를 만드는 것, 측정하는 것, 기록하는 것. 생김새와 역할을 먼저 익히고, 필요한 부품을 눌러 연결 방법과 주의점을 확인해요.</p></header><aside className="hardware-intro"><LabIcon name="plug" size={28}/><p><b>패널의 전기와 ESP32의 전원은 달라요.</b>태양광 패널은 측정할 대상이고, ESP32는 USB 전원으로 켜요. 패널을 ESP32 전원 핀에 직접 연결하지 않아요.</p><Link href="/docs/02-safety-rules" className="text-link">안전 수칙<LabIcon name="arrow" size={17}/></Link></aside><div className="part-grid hardware-grid">{PARTS.map(p=><PartCard key={p.slug} part={p}/>)}</div><p className="local-note">위 그림은 역할을 이해하기 위한 간단한 일러스트예요. 실제 모델과 핀 위치는 다를 수 있어요.</p><section className="lab-section"><div className="section-heading"><div><h2>실물은 이렇게 생겼어요</h2><p>모양을 익히는 참고 사진이에요. 가지고 있는 모델의 핀과 단자 표기를 우선 확인하세요.</p></div></div><div className="real-photos"><PhotoFigure photo={PHOTOS.multimeter}/><PhotoFigure photo={PHOTOS.esp32}/></div></section></div>;}
