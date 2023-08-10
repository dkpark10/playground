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
  const selection = window.getSelection();
  if (!selection) return;

  range.setStart(el.firstChild as Node, pos);
  range.collapse(true);

  selection.removeAllRanges();
  selection.addRange(range);
  el.focus();
}

export default function Editor() {
  const editorRef = useRef<HTMLDivElement>(null);
  const stockSet = useRef<Set<string>>(new Set());

  const [stockSearchState, setStockSearchState] = useState<StockSearchState>({
    isSearching: false,
    currentSharpIndex: -1,
    stockList: [],
  });

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const { isTextNode, anchorNode } = getCaretPos(editorRef.current);

    if (e.key === "Backspace") {
      let isSearching = true;
      let deleteStockName = "";
      if (editorRef.current?.innerText && !isTextNode && anchorNode?.parentNode) {
        editorRef.current?.removeChild(anchorNode.parentNode);
        deleteStockName = anchorNode.parentNode.textContent?.slice(1) || "";
        stockSet.current.delete(deleteStockName);
        isSearching = false;
      }

      setStockSearchState((prev) => ({
        ...prev,
        isSearching,
        stockList: prev.stockList.filter((stock) => stock !== deleteStockName),
      }));
    }
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const { caretPos, isTextNode, anchorNode } = getCaretPos(editorRef.current);

    if (e.key === SHARP_MARK) {
      setStockSearchState((prev) => ({
        ...prev,
        isSearching: true,
        currentSharpIndex: caretPos,
      }));
    } else if (!isKoreanOrEnglishOnly(e.key)) {
      setStockSearchState((prev) => ({
        ...prev,
        isSearching: false,
      }));
    }

    if (!stockSearchState.isSearching || !editorRef.current) return;
    const beginIndex = stockSearchState.currentSharpIndex;
    let flag = true;
    let lastIndex = beginIndex;
    let value = editorRef.current.innerText[lastIndex];

    while (flag) {
      if (value === " " || value === SPACE || value === SPACE2 || lastIndex >= editorRef.current.innerText.length) {
        flag = false;
      }

      lastIndex += 1;
      value = editorRef.current.innerText[lastIndex];
    }

    const findStock = editorRef.current.innerText.slice(beginIndex, lastIndex);
    if (stockSet.current.has(findStock)) return;

    const result = mockStock.some((stock) => stock === findStock);
    if (result) {
      stockSet.current.add(findStock);
      setStockSearchState((prev) => ({
        ...prev,
        stockList: [...prev.stockList, findStock],
      }));

      editorRef.current.innerHTML = editorRef.current.innerHTML.replace(
        `${SHARP_MARK}${findStock}`,
        `<span class="text-rose-500 stock-${findStock}">${SHARP_MARK}${findStock}</span>`,
      );
      editorRef.current.blur();

      const findStockElement = document.querySelector(`.stock-${findStock}`);
      setCaretPos(findStockElement as HTMLElement, findStock.length + 1);
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
        onKeyUp={onKeyUp}
      />
    </main>
  );
}
