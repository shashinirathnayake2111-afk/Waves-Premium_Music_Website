'use client'

import React from 'react';
import { FaRedo } from 'react-icons/fa';

// Placeholder boxes shown while data is loading
export function CardSkeletons({ count = 6, round = false }: { count?: number; round?: boolean }) {
  return (
    <div className="flex gap-8 overflow-hidden pb-4" aria-busy="true" aria-label="Loading">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="shrink-0 w-44 animate-pulse">
          <div className={`bg-white/10 ${round ? 'w-36 h-36 rounded-full mx-auto' : 'aspect-square rounded-xl'}`} />
          <div className="h-3 bg-white/10 rounded mt-3 w-3/4 mx-auto" />
          <div className="h-3 bg-white/5 rounded mt-2 w-1/2 mx-auto" />
        </div>
      ))}
    </div>
  );
}

// Friendly error with a retry button
export function ErrorBox({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div role="alert" className="flex items-center justify-between gap-4 bg-red-400/10 border border-red-400/20 text-red-300 rounded-xl p-4 text-sm">
      <span>{message}</span>
      {onRetry && (
        <button onClick={onRetry}
          className="shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition cursor-pointer">
          <FaRedo className="text-xs" /> Try again
        </button>
      )}
    </div>
  );
}