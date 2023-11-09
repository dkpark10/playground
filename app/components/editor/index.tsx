"use client";

import { useState, useRef, useEffect } from "react";
import TextEditorBlock from "@/components/editor/text-editor-block";
import ToolTip from "@/components/editor/tool-tip";
import { v4 as uuidv4 } from "uuid";
import type { Editor } from "types";

export default function EditorComponent() {
  const [editorBlocks, setEditorBlocks] = useState<Array<Editor.Block>>([
    {
      type: "text",
      id: uuidv4(),
    },
    {
      type: "text",
      id: uuidv4(),
    },
  ]);

  const textEditorBlockRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  return (
    <div className="border border-stone-900">
      <ToolTip />
      {editorBlocks.map((block) =>
        block.type === "text" ? (
          <TextEditorBlock
            key={block.id}
            ref={(ref) => {
              if (!ref || textEditorBlockRefs.current.get(block.id)) return;
              textEditorBlockRefs.current.set(block.id, ref);
            }}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={block.src} alt={`editor-img-${block.id}`} key={block.id} />
        ),
      )}
    </div>
  );
}
