import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <p className="text-5xl">🔌</p>
      <h1 className="mt-4 text-2xl font-black">회로가 끊겼어요 (404)</h1>
      <p className="mt-2 text-sm leading-6 text-stone-500">
        요청한 페이지가 없습니다. 배선(주소)을 다시 확인해 보세요.
      </p>
      <Link href="/" className="mt-6 block rounded-2xl bg-stone-900 px-5 py-3.5 text-sm font-bold text-white">
        🏠 홈으로 돌아가기
      </Link>
    </div>
  );
}
