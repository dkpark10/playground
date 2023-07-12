import React, { useEffect, useRef, useState } from "react";
import {
  setLastPosCaret,
  getContentByMiddleEnter,
  deleteMiddleContent,
  getCaretPos,
  setCaretPos,
  checkEndCaretPos,
  type ContentState,
} from "@/services/editor";
import styles from "@/styles/editor.module.scss";

type KeyInput = "Enter" | "ArrowUp" | "ArrowDown" | "Backspace" | "";

export default function Editor() {
  const [editorBlock, setEditorBlock] = useState<Array<ContentState>>([
    {
      id: 0,
    },
  ]);

  const [currentRow, setCurrentRow] = useState(0);

  const [lastKeyInput, setLastKeyInput] = useState<KeyInput>("");

  const editorElementRef = useRef<Array<HTMLDivElement>>([]);

  const contentTextRef = useRef<Array<string>>([]);

  const onkeydown = (e: React.KeyboardEvent) => {
    const isEndBlock = currentRow >= editorBlock.length - 1;

    if (e.key === "Enter") {
      e.preventDefault();
      if (isEndBlock) {
        setCurrentRow(currentRow + 1);
        setEditorBlock(
          (prev): Array<ContentState> => [
            ...prev,
            {
              id: prev.length,
            },
          ],
        );
        contentTextRef.current.push("");
      } else {
        const nextRow = currentRow + 1;
        const { newBlockContent, blockContents } = getContentByMiddleEnter(contentTextRef.current, nextRow);
        contentTextRef.current = blockContents;
        setEditorBlock(newBlockContent);
        setCurrentRow(nextRow);
      }

      setLastKeyInput("Enter");
    } else if (e.key === "ArrowDown") {
      /** @desc 끝이면 */
      if (isEndBlock) return;

      setCurrentRow((prev) => prev + 1);
      setLastKeyInput("ArrowDown");
    } else if (e.key === "ArrowUp") {
      /** @desc 처음이면 */
      if (currentRow <= 0) {
        return;
      }
      setCurrentRow((prev) => prev - 1);
      setLastKeyInput("ArrowUp");
    } else if (e.key === "Backspace") {
      if (contentTextRef.current[currentRow] === "" && currentRow >= 1) {
        const nextRow = currentRow - 1;
        const { newBlockContent, blockContents } = deleteMiddleContent(contentTextRef.current, currentRow);

        contentTextRef.current = blockContents;
        setEditorBlock(newBlockContent);
        setCurrentRow(nextRow);
      }
      setLastKeyInput("Backspace");
    }
  };

  const onInput = (e: React.KeyboardEvent<HTMLDivElement>) => {
    contentTextRef.current[currentRow] = e.currentTarget.textContent || "";
  };

  useEffect(() => {
    editorElementRef.current[currentRow].focus();
    if (lastKeyInput === "Backspace") {
      setTimeout(() => {
        setLastPosCaret(editorElementRef.current[currentRow]);
      }, 0);
    }
  }, [currentRow, lastKeyInput]);

  return (
    <main className={styles.container}>
      {editorBlock.map((block, idx) => (
        <div
          role="textbox"
          aria-label="textbox"
          tabIndex={idx}
          className={[styles.content, block.id].join(" ")}
          key={block.id}
          contentEditable
          ref={(element) => {
            if (!element) return;
            editorElementRef.current[idx] = element;
          }}
          onKeyDown={onkeydown}
          onInput={onInput}
          onFocus={() => setCurrentRow(idx)}
          dangerouslySetInnerHTML={{ __html: contentTextRef.current[idx] }}
        />
      ))}
    </main>
  );
}
