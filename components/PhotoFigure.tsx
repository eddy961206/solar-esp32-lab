'use client';
import { useState } from 'react';
import type { Photo } from '@/content/photos';
import LabIcon from './LabIcon';

export default function PhotoFigure({ photo }: { photo: Photo }) {
  const [failed, setFailed] = useState(false);
  return <figure className="photo-figure">
    {failed ? <div className="photo-fallback" role="status"><LabIcon name="grid" size={32}/><strong>실물 사진을 불러오지 못했어요</strong><span>아래 원본 링크에서 사진을 확인할 수 있어요.</span></div> :
      /* eslint-disable-next-line @next/next/no-img-element */
      <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={()=>setFailed(true)}/>}
    <figcaption><p>{photo.caption}</p><p className="photo-credit"><a href={photo.page} target="_blank" rel="noopener noreferrer">{photo.credit} · Wikimedia Commons 원본</a><span> / </span>{photo.licenseUrl ? <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer">{photo.license}</a> : photo.license}<span> · 비율 유지, 잘라내지 않음</span></p></figcaption>
  </figure>;
}
