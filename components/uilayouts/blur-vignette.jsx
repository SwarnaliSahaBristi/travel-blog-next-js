'use client';

import React, { createContext, useContext } from 'react';

// simple cn helper (if you already have one, keep yours)
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const BlurVignetteContext = createContext({
  radius: '24px',
  inset: '20px',
  transitionLength: '44px',
  blur: '6px',
});

export const useBlurVignetteContext = () => useContext(BlurVignetteContext);

export const BlurVignette = ({
  className,
  children,
  radius = '24px',
  inset = '20px',
  transitionLength = '44px',
  blur = '6px',
}) => {
  return (
    <BlurVignetteContext.Provider
      value={{ radius, inset, transitionLength, blur }}
    >
      <div
        className={cn('relative overflow-hidden', className)}
        style={{ borderRadius: radius }}
      >
        {children}
        <BlurVignetteArticle />
      </div>
    </BlurVignetteContext.Provider>
  );
};

export const BlurVignetteArticle = ({ className }) => {
  const { radius, inset, transitionLength, blur } =
    useBlurVignetteContext();

  return (
    <div
      className={cn('blur-vignette absolute inset-0', className)}
      style={{
        '--radius': radius,
        '--inset': inset,
        '--transition-length': transitionLength,
        '--blur': blur,
      }}
    />
  );
};