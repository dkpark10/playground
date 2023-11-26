"use client";

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useRef, useEffect } from "react";
import TextEditorBlock from "@/components/editor/text-editor-block";
import { TextEditorHandler } from "@/utils/editor";
import { v4 as uuidv4 } from "uuid";
import type { Editor } from "types";

const buttonContents = ["굵기1", "굵기2", "굵기3", "굵기4", "굵기5"] as const;

export default function EditorComponent() {
  const [currentEditorBlockId, setCurrentEditorBlockId] = useState("");
  const [editorBlocks, setEditorBlocks] = useState<Array<Editor.Block>>([
    {
      type: "text",
      id: uuidv4(),
    },
  ]);

  const textEditorBlockRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const onEditorBoundClick = () => {
    const lastTextEditorElement = Array.from(textEditorBlockRefs.current, ([key, ref]) => ({
      key,
      ref,
    })).slice(-1)[0];

    lastTextEditorElement.ref.focus();
    setCurrentEditorBlockId(lastTextEditorElement.key);
  };

  const onBoldClick = () => {
    const currentContentDom = textEditorBlockRefs.current.get(currentEditorBlockId);
    if (!currentContentDom) return;

    const textEditorHandler = new TextEditorHandler(currentContentDom);
    textEditorHandler.runTextAction("bold");
  };

  useEffect(() => {
    const firstTextEditorElementKey = Array.from(textEditorBlockRefs.current, ([key]) => key)[0];
    setCurrentEditorBlockId(firstTextEditorElementKey);
  }, []);

  return (
    <div className="absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%]">
      <div className="border border-red-900 h-[50vh] w-[75vw]" onClick={onEditorBoundClick}>
        <div className="border border-stone-900 flex justify-between">
          {buttonContents.map((content) => (
            <button className="border border-stone-900 w-24" key={content} type="button" onClick={onBoldClick}>
              {content}
            </button>
          ))}
        </div>
        {editorBlocks.map((block) =>
          block.type === "text" ? (
            <TextEditorBlock
              key={block.id}
              dataBlockId={block.id}
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
    </div>
  );
}
