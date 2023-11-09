"use client";

import { getCaretPosInfo } from "@/utils/editor";

const buttonContents = ["굵기1", "굵기2", "굵기3", "굵기4", "굵기5"] as const;

export default function ToolTip() {
  const onClick = () => {
    const caretPosInfo = getCaretPosInfo();
    if (!caretPosInfo) return;

    console.log(caretPosInfo);
  };

  return (
    <div className="border border-stone-900 flex justify-between">
      {buttonContents.map((content) => (
        <button className="border border-stone-900 w-24" key={content} type="button" onClick={onClick}>
          {content}
        </button>
      ))}
    </div>
  );
}
