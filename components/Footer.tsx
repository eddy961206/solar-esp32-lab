import Link from 'next/link';
import LabIcon from './LabIcon';
export default function Footer() {
  return <footer className="lab-footer"><div className="lab-footer-inner"><div><div className="lab-footer-brand"><LabIcon name="sun"/>원룸 태양광 실험실</div><p>작은 실험으로, 전기를 이해하는 시간.</p></div><nav aria-label="하단 내비게이션"><Link href="/docs/02-safety-rules">안전 수칙</Link><Link href="/gallery">그림 자료실</Link><Link href="/curriculum/source-index">참고 자료</Link><a href="https://github.com/eddy961206/solar-esp32-lab" target="_blank" rel="noopener noreferrer">GitHub ↗</a></nav><p className="lab-footer-note">학습 진도는 이 브라우저에만 저장돼요. 회원가입이나 장비 연결은 필요 없어요.</p></div></footer>;
}
