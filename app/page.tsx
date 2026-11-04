import Link from 'next/link';
import { MISSIONS } from '@/content/missions';
import { ROADMAP } from '@/content/roadmap';
import MissionStatus from '@/components/MissionStatus';

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <p className="eyebrow">서랍 속 태양광 키트 살리기</p>
        <h1>외우기 전에, 먼저 작동시키자</h1>
        <p className="lead">
          미션마다 오늘 작동시킬 것 하나만 정한다. 3D 작업대에서 부품과 전류의 흐름을 먼저 보고, 실제로 연결하고, 숫자가 움직이면 그다음에 원리를 이야기로 듣는다.
        </p>
        <ul className="rules">
          <li><b>작동했나, 하나 바꿔봤나</b>로 쌓인 걸 센다. 퀴즈나 시험은 없다.</li>
          <li>공식은 기본만, 지금 화면의 숫자를 넣어서 몸에 붙인다.</li>
          <li>궁금한 가지는 미션마다 &lsquo;나중에 볼 가지&rsquo;에 적어 두고 작동이 먼저.</li>
        </ul>
      </section>

      <section className="missions" aria-label="미션 목록">
        {MISSIONS.map((m) => (
          <Link key={m.id} href={`/mission/${m.id}`} className="mcard">
            <span className="num">{m.num}</span>
            <div>
              <h2>{m.title}</h2>
              <p>{m.goal}</p>
              <MissionStatus id={m.id} total={m.steps.length} />
            </div>
          </Link>
        ))}
      </section>

      <section id="roadmap" className="roadmap">
        <h2>뚝딱이 지도</h2>
        <p className="lead">지금 미션은 첫 칸이야. 끝에는 AI와 함께 설계하고, 검증하고, 만들고, 시험하는 나만의 작업실이 있어.</p>
        <ol>
          {ROADMAP.map((s) => (
            <li key={s.name} className={s.now ? 'now' : ''}>
              <h3>{s.name}{s.now && <span className="badge">지금</span>}</h3>
              <p>{s.what}</p>
              <p className="make"><span>만들 것</span>{s.make}</p>
              <p className="tags">{s.learn.map((l) => <em key={l}>{l}</em>)}</p>
              <p className="tools">{s.tools.join(' · ')}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
