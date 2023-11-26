"use client";

import { forwardRef, type ForwardedRef } from "react";

interface TextEditorBlockProps {
  dataBlockId: string;
}

export default forwardRef<HTMLDivElement, TextEditorBlockProps>(function TextEditorArea(
  { dataBlockId },
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <div data-block-id={dataBlockId} contentEditable ref={ref}>
      1111111111
      <div>2222222222</div>
      <div>3333333333</div>
      <div>4444444444</div>
      <div>5555555555</div>
      <div>6666666666</div>
    </div>
  );
});
