import * as _emotion_react_jsx_runtime from '@emotion/react/jsx-runtime';
import { ImageProps } from 'next/image';

interface NextImageProps extends ImageProps {
    backgroundColor: string;
    borderRadius: 'md' | 'lg' | 'xl';
}
declare function NextImage(props: NextImageProps): _emotion_react_jsx_runtime.JSX.Element;

export { NextImage as default };
