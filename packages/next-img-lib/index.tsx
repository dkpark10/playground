import { forwardRef } from 'react';
import Image, { type ImageProps } from 'next/image';
import { css } from '@emotion/react';

let ResolvedImage = Image;
if ('default' in ResolvedImage) {
  ResolvedImage = (ResolvedImage as unknown as { default: typeof Image }).default;
}

interface NextImageProps extends ImageProps {
  backgroundColor?: string;
  borderRadius?: 'md' | 'lg' | 'xl';
}

const radiusValue: Record<Exclude<NextImageProps['borderRadius'], undefined>, string> = {
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
};

export default forwardRef<HTMLImageElement, NextImageProps>(function NextImage(props, ref) {
  const { src, backgroundColor, alt, width, quality, priority, height, fill, borderRadius = 'md' } = props;

  return (
    <ResolvedImage
      ref={ref}
      alt={alt}
      src={src}
      width={width}
      height={height}
      fill={fill}
      quality={quality}
      priority={priority}
      css={css`
        background-color: ${backgroundColor};
        border-radius: ${radiusValue[borderRadius]};
      `}
    />
  );
});
