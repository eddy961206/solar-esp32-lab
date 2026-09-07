import Link from 'next/link';
import LabIcon, { type LabIconName } from '@/components/LabIcon';
export const metadata={title:'학습 도구'};
const TOOLS:{href:string;icon:LabIconName;title:string;description:string;action:string}[]=[
{href:'/calculator',icon:'calculator',title:'전력 계산기',description:'전압과 저항을 넣으면 전류와 전력을 계산해요. 부품을 연결하기 전에 숫자로 먼저 확인하세요.',action:'계산하기'},
{href:'/glossary',icon:'book',title:'쉬운 용어 사전',description:'전압, 전류, I2C… 낯선 단어가 나왔을 때 짧은 설명과 비유로 뜻을 찾아봐요.',action:'단어 찾기'},
{href:'/workbook',icon:'note',title:'150문제 연습장',description:'정답과 해설을 확인하며 배운 내용을 복습해요. 지금 아는 주제부터 풀어도 괜찮아요.',action:'문제 풀기'},
{href:'/gallery',icon:'grid',title:'그림 자료실',description:'전체 구조, 배선, 공식, 안전 경계를 여섯 장의 그림으로 살펴봐요. 작은 글씨는 확대해서 읽어요.',action:'그림 펼치기'},
];
export default function Tools(){return <div><header className="lab-page-head"><nav className="lab-breadcrumb" aria-label="현재 위치"><Link href="/">홈</Link><LabIcon name="chevron" size={12}/><span>학습 도구</span></nav><h1>실험 옆에 두는, 작은 도구함.</h1><p>모르는 말을 찾거나, 숫자를 계산하거나, 배운 것을 확인할 때. 필요한 도구 하나만 꺼내 쓰세요.</p></header><div className="tool-grid">{TOOLS.map(t=><Link key={t.href} href={t.href} className="tool-card"><LabIcon name={t.icon}/><div><h2>{t.title}</h2><p>{t.description}</p><span className="text-link">{t.action}<LabIcon name="arrow" size={17}/></span></div></Link>)}</div></div>;}
