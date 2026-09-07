'use client';
import Image from 'next/image';
import { useEffect, useId, useRef, useState } from 'react';
import LabIcon from './LabIcon';

/** Native dialog supplies focus trapping, Escape, and an inert background. */
export default function ImageZoom({ src, title, caption }: { src: string; title: string; caption: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const previousOverflow = useRef('');
  const opened = useRef(false);
  useEffect(() => () => { if (opened.current) document.body.style.overflow = previousOverflow.current; }, []);
  const [zoom, setZoom] = useState(1);
  const id = useId();
  const open = () => {
    if (!dialog.current || dialog.current.open) return;
    setZoom(1);
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    opened.current = true;
    dialog.current.showModal();
    viewport.current?.scrollTo(0, 0);
  };
  const closed = () => {
    opened.current = false;
    document.body.style.overflow = previousOverflow.current;
    trigger.current?.focus({ preventScroll: true });
  };
  return <figure className="zoom-figure">
    <button ref={trigger} type="button" className="zoom-trigger" onClick={open} aria-label={`${title} 크게 보기`} aria-haspopup="dialog">
      <Image src={src} alt={title} width={1536} height={1024} sizes="(max-width: 600px) 100vw, 50vw" className="zoom-thumbnail"/>
      <span className="zoom-hint"><LabIcon name="expand" size={16}/>크게 보기</span>
    </button>
    <figcaption><h2>{title}</h2><p>{caption}</p></figcaption>
    <dialog ref={dialog} className="image-dialog" aria-labelledby={`${id}-title`} aria-describedby={`${id}-caption`} onClose={closed} onClick={e => { if(e.target === dialog.current) dialog.current.close(); }}>
      <div className="image-dialog-toolbar"><h2 id={`${id}-title`}>{title}</h2>
        <button type="button" aria-label="축소" disabled={zoom <= 1} onClick={()=>setZoom(z=>Math.max(1,z-.5))}>−</button><span aria-live="polite">{Math.round(zoom*100)}%</span><button type="button" aria-label="확대" disabled={zoom>=3} onClick={()=>setZoom(z=>Math.min(3,z+.5))}>+</button><button type="button" onClick={()=>setZoom(1)} aria-label="화면에 맞추기"><LabIcon name="expand" size={18}/></button><button type="button" aria-label="그림 닫기" onClick={()=>dialog.current?.close()}><LabIcon name="close"/></button>
      </div>
      <div ref={viewport} className="image-dialog-viewport" tabIndex={0} aria-label="확대한 그림. 방향키로 이동할 수 있어요.">
        {/* Keep labels legible at high zoom without depending on an external host. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={title} loading="lazy" style={{width:`${zoom*100}%`, maxWidth:'none'}}/>
      </div>
      <p id={`${id}-caption`} className="image-dialog-caption">{caption} · 실제 연결은 기판의 핀 이름과 실험 가이드를 확인해요.</p>
    </dialog>
  </figure>;
}
