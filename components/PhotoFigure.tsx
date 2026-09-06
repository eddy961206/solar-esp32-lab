import type { Photo } from '@/content/photos';

export default function PhotoFigure({ photo }: { photo: Photo }) {
  return (
    <figure className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        className="h-auto max-h-80 w-full bg-stone-100 object-cover"
      />
      <figcaption className="border-t border-stone-100 px-4 py-3">
        <p className="text-[13px] font-semibold leading-6 text-stone-600">{photo.caption}</p>
        <p className="mt-1 text-[11px] text-stone-400">
          사진:{' '}
          <a href={photo.page} target="_blank" rel="noopener noreferrer nofollow" className="underline">
            {photo.credit} / Wikimedia Commons
          </a>{' '}
          ({photo.license})
        </p>
      </figcaption>
    </figure>
  );
}
