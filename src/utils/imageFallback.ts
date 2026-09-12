import type React from 'react';

export const PRODUCT_IMAGE_FALLBACK = '/icon.svg';

export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
  const image = event.currentTarget;
  if (image.src.endsWith(PRODUCT_IMAGE_FALLBACK)) return;
  image.src = PRODUCT_IMAGE_FALLBACK;
};
