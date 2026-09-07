'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import LabIcon from './LabIcon';

const NAV = [
  { href: '/docs', label: '실험하기' },
  { href: '/hardware', label: '부품 도감' },
  { href: '/curriculum', label: '더 배우기' },
  { href: '/tools', label: '학습 도구' },
];
export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const root = useRef<HTMLElement>(null);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const keydown = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); toggle.current?.focus(); } };
    const outside = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('keydown', keydown);
    document.addEventListener('pointerdown', outside);
    return () => { document.removeEventListener('keydown', keydown); document.removeEventListener('pointerdown', outside); };
  }, [open]);
  function active(href: string) {
    return pathname === href || pathname.startsWith(href + '/') || (href === '/tools' && ['/calculator', '/workbook', '/glossary', '/gallery'].includes(pathname));
  }
  return <header ref={root} className="lab-header">
    <div className="lab-header-inner">
      <Link href="/" className="lab-brand" onClick={() => setOpen(false)} aria-label="원룸 태양광 실험실 홈">
        <span className="lab-brand-symbol"><LabIcon name="sun" size={25}/></span>
        <span>원룸 태양광 실험실<span className="lab-brand-sub">SOLAR · ESP32 LAB</span></span>
      </Link>
      <nav className="lab-desktop-nav" aria-label="주 내비게이션">{NAV.map(n => <Link key={n.href} href={n.href} aria-current={active(n.href) ? 'page' : undefined}>{n.label}</Link>)}</nav>
      <Link href="/docs/02-safety-rules" className="lab-header-safety"><LabIcon name="shield" size={17}/>안전 수칙</Link>
      <button ref={toggle} type="button" className="lab-menu-button" aria-label={open ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(v => !v)}><LabIcon name={open ? 'close' : 'menu'} size={23}/></button>
    </div>
    <nav id="mobile-navigation" hidden={!open} className="lab-mobile-nav" aria-label="모바일 내비게이션">{NAV.map(n => <Link key={n.href} href={n.href} onClick={() => setOpen(false)} aria-current={active(n.href) ? 'page' : undefined}>{n.label}<LabIcon name="chevron" size={16}/></Link>)}<Link href="/docs/02-safety-rules" onClick={() => setOpen(false)}>실험 전 안전 수칙<LabIcon name="shield" size={18}/></Link></nav>
  </header>;
}
