'use client';

import { useState } from 'react';

export default function CopyBox({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };
  return (
    <div className="rounded-2xl border border-stone-200 bg-stone-950 p-4">
      <p className="text-[12px] font-bold text-stone-400">{label}</p>
      <p className="mt-1 break-all text-[13px] leading-6 text-amber-100">{text}</p>
      <button
        type="button"
        onClick={copy}
        className="mt-3 w-full rounded-xl bg-amber-400 px-4 py-3 text-sm font-black text-stone-900 active:scale-[0.98]"
      >
        {copied ? '✓ 복사됐어요!' : '복사하기'}
      </button>
    </div>
  );
}
