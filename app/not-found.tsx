import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="page center">
      <h1>회로가 끊겼어 (404)</h1>
      <p className="lead">그런 페이지는 없어. 배선(주소)을 다시 확인해 줘.</p>
      <Link href="/" className="more">미션 지도로 →</Link>
    </div>
  );
}
