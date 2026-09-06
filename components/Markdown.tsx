'use client';

import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';

export default function Markdown({ source }: { source: string }) {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeHighlight]}
        components={{
          img: ({ src, alt }) => {
            const s = typeof src === 'string' ? src : '';
            // Next Image는 외부 URL·상대경로 처리가 까다로워 일반 img + 반응형으로
            // eslint-disable-next-line @next/next/no-img-element
            return <img src={s} alt={alt ?? ''} loading="lazy" decoding="async" />;
          },
          a: ({ href, children }) => {
            const h = typeof href === 'string' ? href : '#';
            const internal = h.startsWith('/');
            if (internal) {
              return <a href={h}>{children}</a>;
            }
            return (
              <a href={h} target="_blank" rel="noopener noreferrer nofollow">
                {children}
              </a>
            );
          },
          // react-markdown v9: code 렌더 커스터마이징 최소화 (보안상 className 그대로 전달)
          code: ({ className, children, ...props }) => (
            <code className={className} {...props}>
              {children}
            </code>
          ),
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}

// 쓰지 않는 import 경고 방지용 (Image 최적화는 갤러리/히어로에서 사용)
export const __keepImageImport = Image;
