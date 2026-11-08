'use client'

import React, { useState } from 'react';

// Artist photo with a fallback (first letter) when the artist has no image
export default function ArtistImage({ name, image, className = '' }: { name: string; image?: string; className?: string }) {
  const [failed, setFailed] = useState(false);

  if (!image || failed) {
    return (
      <div aria-hidden="true" className={`grid place-items-center bg-linear-to-br from-indigo-600 to-pink-600 text-white font-bold text-4xl ${className}`}>
        {name.charAt(0).toUpperCase()}
      </div>
    );
  }
  return <img src={image} alt={name} onError={() => setFailed(true)} className={`object-cover ${className}`} />;
}