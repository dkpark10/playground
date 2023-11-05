"use client";

import { useState } from "react";
import type { Editor } from "types";

export default function EditorComponent() {
  const [editorBlocks, setEditorBlocks] = useState<Array<Editor.Block>>([
    {
      type: "text",
      id: 0,
    },
  ]);

  return (
    <>
      {editorBlocks.map((block) =>
        block.type === "text" ? (
          <article key={block.id} contentEditable />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={block.src} alt={`editor-img-${block.id}`} key={block.id} />
        ),
      )}
    </>
  );
}
