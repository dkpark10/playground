import Image, { ImageProps } from 'next/image';
import { css } from '@emotion/react';

interface NextImageProps extends ImageProps {
  backgroundColor: string;
}

export default function NextImage(props: NextImageProps) {
  const { backgroundColor, alt, ...rest } = props;
  return (
    <Image
      alt={alt}
      {...rest}
      css={css`
        background-color: ${backgroundColor};
      `}
    />
  );
}
