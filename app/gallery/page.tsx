import Link from 'next/link';
import ImageZoom from '@/components/ImageZoom';
import PhotoFigure from '@/components/PhotoFigure';
import { PHOTOS } from '@/content/photos';
export const metadata = { title: '그림으로 이해하기' };
const IMAGES = [
  {src:'/images/01-lab-overview.png',title:'전체 실험, 한눈에',caption:'무엇을 재고, 어떤 도구가 기록하는지 큰 흐름을 살펴봐요.'},
  {src:'/images/02-ohms-law-power.png',title:'전압 · 전류 · 저항의 관계',caption:'옴의 법칙과 전력. 계산에 나오는 기호를 그림과 연결해요.'},
  {src:'/images/03-esp32-i2c-wiring.png',title:'센서와 ESP32의 대화',caption:'I2C 연결을 이해하는 참고 그림이에요. 실제 핀 이름은 실험 가이드에서 확인해요.'},
  {src:'/images/04-solar-iv-mppt.png',title:'태양광 패널의 힘이 달라지는 이유',caption:'저항을 바꾸며 전압·전류·전력의 관계를 비교해요.'},
  {src:'/images/05-safety-boundary.png',title:'실험 전에, 안전 경계',caption:'이 프로젝트에서 다루는 범위와 시도하지 않는 작업을 구분해요.'},
  {src:'/images/06-16-week-roadmap.png',title:'첫 실험 다음의 학습 지도',caption:'지금은 5일 실험부터. 익숙해지면 더 길게 이어갈 수 있어요.'},
];
export default function GalleryPage(){return <div>
  <header className="lab-page-head"><nav className="lab-breadcrumb" aria-label="현재 위치"><Link href="/">홈</Link><span>/</span><Link href="/tools">학습 도구</Link><span>/</span><span>그림 자료</span></nav><h1>긴 설명 대신, 그림으로.</h1><p>이미지를 누르면 크게 볼 수 있어요. 작은 글씨는 확대하고, 원래 보던 자리로 돌아와요.</p></header>
  <div className="lab-gallery-grid">{IMAGES.map(i=><ImageZoom key={i.src} {...i}/>)}</div>
  <section className="lab-section"><div className="section-heading"><div><h2>실제로는 이렇게 생겼어요</h2><p>그림은 역할을, 사진은 생김새를 알려줘요. 실제 제품과 다른 참고 모델도 있어요.</p></div></div><div className="real-photos"><PhotoFigure photo={PHOTOS.multimeter}/><PhotoFigure photo={PHOTOS.esp32Detail}/><PhotoFigure photo={PHOTOS.resistors}/><PhotoFigure photo={PHOTOS.breadboard}/></div><p className="local-note">실물 사진은 Wikimedia에서 불러와요. 작가와 라이선스는 각 사진 아래에 표시해요. 기기의 모델명과 단자 표시를 우선 확인해요.</p></section>
</div>;}
