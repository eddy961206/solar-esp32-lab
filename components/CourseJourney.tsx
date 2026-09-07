'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { readProgress } from '@/lib/progress';
import { DAY_VISUALS } from '@/content/journey';
import PartArt from './PartArt';
import LabIcon from './LabIcon';
export interface JourneyLesson { slug: string; day: string; title: string; minutes: number; goal: string; count: number; prepare: string[]; }
export default function CourseJourney({ lessons }: { lessons: JourneyLesson[] }) {
  const [selected, setSelected] = useState(0);
  const [progress, setProgress] = useState<number[]>([]);
  useEffect(() => {
    const read = () => setProgress(lessons.map(l => readProgress(l.slug, l.count).length));
    const initial = lessons.map(l => readProgress(l.slug, l.count).length);
    setProgress(initial);
    const next = lessons.findIndex((l, i) => initial[i] < l.count);
    setSelected(next < 0 ? 0 : next);
    window.addEventListener('storage', read);
    window.addEventListener('lab-progress', read);
    return () => { window.removeEventListener('storage', read); window.removeEventListener('lab-progress', read); };
  }, [lessons]);
  const lesson = lessons[selected];
  if (!lesson) return null;
  const visual = DAY_VISUALS[lesson.slug];
  const completed = lessons.filter((l,i) => l.count > 0 && progress[i] === l.count).length;
  return <section className="course-journey" aria-labelledby="journey-title">
    <div className="section-heading"><div><h2 id="journey-title">하루에 하나씩, 다섯 번의 발견</h2><p>순서대로 따라가면 돼요. 끝낸 단계는 자동으로 기억해요.</p></div><span className="journey-progress"><b>{completed}</b> / {lessons.length}일 완료</span></div>
    <div className="journey-rail" role="group" aria-label="실험 날짜 선택">{lessons.map((l,i) => <button key={l.slug} type="button" className="journey-day" aria-pressed={selected===i} aria-controls="journey-preview" onClick={()=>setSelected(i)}><span className="journey-number">{l.count > 0 && progress[i] === l.count ? <LabIcon name="check" size={19}/> : `0${i+1}`}</span><span><small>{l.day}</small><strong>{DAY_VISUALS[l.slug]?.title || l.title}</strong></span></button>)}</div>
    <div id="journey-preview" className="journey-preview" aria-live="polite">
      <div className="journey-illustration"><PartArt kind={visual?.kind || 'panel'}/><span>이번 실험에서 만날 도구 · 개념 그림</span></div>
      <div className="journey-copy"><div className="journey-meta"><span>{lesson.day}</span><span><LabIcon name="clock" size={15}/>{lesson.minutes}분</span>{!!progress[selected] && <span>{progress[selected]}/{lesson.count}단계 완료</span>}</div><h3>{visual?.title || lesson.title}</h3><p>{visual?.outcome || lesson.goal}</p><div className="journey-materials"><b>준비물</b><span>{lesson.prepare.slice(0,3).join(' · ')}</span></div><Link className="lab-button primary" href={`/docs/${lesson.slug}`}>{progress[selected] === lesson.count ? '완료한 실험 다시 보기' : progress[selected] ? '이어서 실험하기' : `${lesson.day} 실험 보기`}<LabIcon name="arrow" size={18}/></Link></div>
    </div>
    <p className="local-note">진도는 이 브라우저에만 저장돼요. 준비가 안 된 날도 내용을 미리 볼 수 있어요.</p>
  </section>;
}
