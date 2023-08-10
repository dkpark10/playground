import React, { useEffect, useRef, useState } from "react";
import { getCaretPos, mockStock, setLastPosCaret } from "@/services/editor";
import { debounce } from "@/utils/debounce";

interface CaretState {
  begin: number;
  end: number;
  isFirstLine: boolean;
}

interface StockSearchState {
  currentSharpIndex: number;
  isSearching: boolean;
  stockList: Array<string>;
}

const SHARP_MARK = "/";
const SPACE = " ";
const SPACE2 = " ";
const isKoreanOrEnglishOnly = (input: string) => /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]+$/.test(input);

function setCaretPos(el: HTMLElement, pos: number) {
  const range = document.createRange();
  const sel = window.getSelection();
  if (!sel) return;

  console.log(el.childNodes);
  console.log(el.firstChild);
  range.setStart(el.childNodes[1].firstChild as Node, 3);
  range.collapse(true);

  sel.removeAllRanges();
  sel.addRange(range);
  el.focus();
}

export default function Editor() {
  const [c, sc] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);
  const stockSet = useRef<Set<string>>(new Set());

  const [stockSearchState, setStockSearchState] = useState<StockSearchState>({
    isSearching: false,
    currentSharpIndex: -1,
    stockList: [],
  });

  const onInput = (e: React.FormEvent<HTMLDivElement>) => {
    // if (!stockSearchState.isSearching || !editorRef.current) return;
    // const beginIndex = stockSearchState.currentSharpIndex;
    // let flag = true;
    // let lastIndex = beginIndex;
    // let value = editorRef.current.innerText[lastIndex];

    // while (flag) {
    //   if (value === " " || value === SPACE || value === SPACE2 || lastIndex >= editorRef.current.innerText.length) {
    //     flag = false;
    //   }

    //   lastIndex += 1;
    //   value = editorRef.current.innerText[lastIndex];
    // }

    // const findStock = editorRef.current.innerText.slice(beginIndex, lastIndex);
    // if (stockSet.current.has(findStock)) return;

    // const result = mockStock.some((stock) => stock === findStock);
    // if (result) {
    //   stockSet.current.add(findStock);
    //   setStockSearchState((prev) => ({
    //     ...prev,
    //     stockList: [...prev.stockList, findStock],
    //   }));

    debounce((value: string) => {
      sc(value);
      if (value === "카카오" && editorRef.current) {
        // editorRef.current.innerHTML = editorRef.current.innerHTML.replace(
        //   "카카오",
        //   `<span class="text-rose-500">카카오</span>`,
        // );

        // editorRef.current.blur();
        // editorRef.current.focus();

        const colorElement = document.createElement("span");
        colorElement.className = "text-rose-500";

        const selection = window.getSelection();
        if (!selection) return;

        const selectedTextRange = selection.getRangeAt(0);

        selectedTextRange.setStart(editorRef.current.firstChild as ChildNode, 0);
        selectedTextRange.setEnd(editorRef.current.firstChild as ChildNode, 3);
        selectedTextRange.surroundContents(colorElement);

        selectedTextRange.collapse(true);
        selection.removeAllRanges();

        editorRef.current.blur();
        setCaretPos(editorRef.current, 3);
      }
    }, 250)(e.currentTarget.textContent);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // if (c) {
    //   console.log('111');
    //   e.preventDefault();
    // }
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const { caretPos } = getCaretPos(editorRef.current);

    if (e.key === SHARP_MARK) {
      setStockSearchState((prev) => ({
        ...prev,
        isSearching: true,
        currentSharpIndex: caretPos,
      }));
    } else if (e.key === "Backspace") {
      let tempCaretPos = caretPos - 1;
      const value = (editorRef.current as HTMLDivElement).innerText[tempCaretPos];
      let isSearching = true;

      while (value !== SHARP_MARK && tempCaretPos >= 0) {
        if (!isKoreanOrEnglishOnly(value) || value === " " || value === SPACE || value === SPACE2) {
          isSearching = false;
          break;
        }

        tempCaretPos -= 1;
      }

      setStockSearchState((prev) => ({
        ...prev,
        isSearching,
      }));
    } else if (!isKoreanOrEnglishOnly(e.key)) {
      setStockSearchState((prev) => ({
        ...prev,
        isSearching: false,
      }));
    }
  };

  return (
    <main>
      <header className="flex text-2xl justify-center">
        <span>에디터 {stockSearchState.isSearching ? "검색모드" : "검색모드 아님"}</span>
      </header>
      {stockSearchState.stockList.map((stock) => (
        <div key={stock}>{stock}</div>
      ))}
      <div
        className="border border-indigo-600"
        contentEditable
        role="textbox"
        onClick={() => {}}
        tabIndex={0}
        aria-label="text-editor"
        ref={editorRef}
        onKeyDown={onKeyDown}
        onInput={onInput}
        onKeyUp={onKeyUp}
      />
    </main>
  );
}
