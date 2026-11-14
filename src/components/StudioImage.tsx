import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface StudioImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function StudioImage({ src, alt, className = '', fallbackTitle }: StudioImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-200 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800 text-zinc-500 dark:text-zinc-400 p-4 text-center ${className}`}
      >
        <ImageIcon className="w-7 h-7 mb-2 opacity-60" />
        <span className="text-xs font-medium tracking-tight">{fallbackTitle || alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
