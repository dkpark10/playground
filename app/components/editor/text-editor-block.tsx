"use client";

import { forwardRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default forwardRef<HTMLDivElement>(function TextEditorArea(_, ref) {
  return <div contentEditable ref={ref} />;
});
