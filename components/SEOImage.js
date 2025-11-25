/**
 * Enhanced SEO-Optimized Image Component
 * Handles WebP, lazy loading, responsive images, and SEO attributes
 */

'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function SEOImage({
  src,
  alt,
  title,
  width,
  height,
  priority = false,
  quality = 85,
  className = '',
  sizes,
  fill = false,
  objectFit = 'cover',
  loading = 'lazy',
  blurDataURL,
  placeholder = 'blur',
  onLoad,
  style = {},
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate optimized alt text if not provided
  const optimizedAlt = alt || title || 'Image';

  // Handle image load
  const handleLoad = (result) => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad(result);
    }
  };

  // Generate blur data URL if not provided
  const shimmer = (w, h) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#f6f7f8" offset="0%" />
          <stop stop-color="#edeef1" offset="20%" />
          <stop stop-color="#f6f7f8" offset="40%" />
          <stop stop-color="#f6f7f8" offset="100%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#f6f7f8" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`;

  const toBase64 = (str) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str);

  const defaultBlurDataURL = `data:image/svg+xml;base64,${toBase64(
    shimmer(700, 475)
  )}`;

  // Responsive sizes if not provided
  const responsiveSizes = sizes || (
    fill
      ? '100vw'
      : `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, ${width}px`
  );

  return (
    <Image
      src={src}
      alt={optimizedAlt}
      title={title || optimizedAlt}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      fill={fill}
      quality={quality}
      priority={priority}
      loading={priority ? 'eager' : loading}
      sizes={responsiveSizes}
      placeholder={blurDataURL || placeholder === 'blur' ? 'blur' : 'empty'}
      blurDataURL={blurDataURL || defaultBlurDataURL}
      onLoad={handleLoad}
      className={`${className} ${!isLoaded && !priority ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      style={{
        objectFit: fill ? objectFit : undefined,
        ...style,
      }}
      {...props}
    />
  );
}

/**
 * SEO-optimized responsive image with art direction
 */
export function ResponsiveSEOImage({
  srcMobile,
  srcTablet,
  srcDesktop,
  alt,
  title,
  className = '',
  priority = false,
  ...props
}) {
  return (
    <picture>
      <source
        media="(max-width: 640px)"
        srcSet={srcMobile}
        type="image/webp"
      />
      <source
        media="(max-width: 1024px)"
        srcSet={srcTablet}
        type="image/webp"
      />
      <source media="(min-width: 1025px)" srcSet={srcDesktop} type="image/webp" />
      <SEOImage
        src={srcDesktop}
        alt={alt}
        title={title}
        className={className}
        priority={priority}
        {...props}
      />
    </picture>
  );
}

/**
 * Background image component with SEO considerations
 */
export function SEOBackgroundImage({
  src,
  alt,
  title,
  children,
  className = '',
  priority = false,
  overlay = false,
  overlayOpacity = 0.5,
}) {
  return (
    <div className={`relative ${className}`}>
      <SEOImage
        src={src}
        alt={alt}
        title={title}
        fill
        priority={priority}
        objectFit="cover"
        className="z-0"
      />
      {overlay && (
        <div
          className="absolute inset-0 bg-black z-10"
          style={{ opacity: overlayOpacity }}
        />
      )}
      <div className="relative z-20">{children}</div>
    </div>
  );
}
