import Image, { ImageProps } from 'next/image';
import { css } from '@emotion/react';

interface NextImageProps extends ImageProps {
  backgroundColor: string;
  borderRadius: 'md' | 'lg' | 'xl';
}

const radiusValue: Record<NextImageProps['borderRadius'], string> = {
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
};

export default function NextImage(props: NextImageProps) {
  const { backgroundColor, alt, borderRadius, ...rest } = props;

  return (
    <Image
      alt={alt}
      {...rest}
      css={css`
        background-color: ${backgroundColor};
        border-radius: ${radiusValue[borderRadius]};
      `}
    />
  );
}
