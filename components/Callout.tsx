export default function Callout({
  kind,
  title,
  children,
}: {
  kind: 'safety' | 'tip' | 'why';
  title: string;
  children: React.ReactNode;
}) {
  const style =
    kind === 'safety'
      ? 'border-red-200 bg-red-50 text-red-900'
      : kind === 'tip'
        ? 'border-sky-200 bg-sky-50 text-sky-950'
        : 'border-amber-200 bg-amber-50 text-amber-950';
  const icon = kind === 'safety' ? '⛑️' : kind === 'tip' ? '💡' : '❓';
  return (
    <div className={`rounded-2xl border p-4 text-[14px] leading-7 ${style}`}>
      <p className="font-black">
        {icon} {title}
      </p>
      <div className="mt-1">{children}</div>
    </div>
  );
}
