import React, { useEffect, useRef, useState } from "react";

interface CaretState {
  begin: number;
  end: number;
}

export default function Editor() {
  const editorRef = useRef<HTMLDivElement>(null);

  const [caretPos, setCaretPos] = useState<CaretState>({
    begin: 0,
    end: 0,
  });

  const onKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const selection = window.getSelection();
    if (!selection) return;

    const { anchorOffset, focusOffset } = selection;

    setCaretPos({
      begin: anchorOffset,
      end: focusOffset,
    });
  };

  return (
    <main>
      <div
        contentEditable
        role="textbox"
        onClick={() => {}}
        tabIndex={0}
        aria-label="text-editor"
        style={{ border: "1px solid red" }}
        ref={editorRef}
        onKeyUp={onKeyUp}
      />
      <div>시작: {caretPos.begin}</div>
      <div>끝: {caretPos.end}</div>
    </main>
  );
}
