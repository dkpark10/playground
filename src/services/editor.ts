export interface ContentState {
  id: number;
}

export const lastCheckKorean = (text: string) => {};

export const setLastPosCaret = (element: HTMLElement | null) => {
  if (!element || element.innerText.length === 0) {
    element?.focus();
    return;
  }

  const selection = window.getSelection();
  const newRange = document.createRange();

  newRange.selectNodeContents(element);
  newRange.collapse(false);
  selection?.removeAllRanges();
  selection?.addRange(newRange);
};

/** @desc 중간 블록에서 엔터시 블록에 들어칼 컨텐츠를 새로 만들고 반환하는 함수 */
export const getContentByMiddleEnter = (contentText: Array<string>, middleRow: number) => {
  const totalLen = contentText.length + 1;

  const blockContents = [...contentText.slice(0, middleRow - 1), "", ...contentText.slice(middleRow - 1)];

  const newBlockContent: Array<ContentState> = Array.from({ length: totalLen }, (_, idx) => ({
    id: idx,
  }));

  return {
    newBlockContent,
    blockContents,
  };
};

// /** @desc 중간 블록에서 백스페이스시 해당 블록을 삭제하고 컨텐츠를 반환하는 함수 */
export const deleteMiddleContent = (contentText: Array<string>, middleRow: number) => {
  const totalLen = contentText.length - 1;

  const blockContents = [...contentText.slice(0, middleRow), ...contentText.slice(middleRow + 1)];

  const newBlockContent: Array<ContentState> = Array.from({ length: totalLen }, (_, idx) => ({
    id: idx,
  }));

  return {
    newBlockContent,
    blockContents,
  };
};

/** @desc 커서 위치정보를 얻는 함수 */
export const getCaretPos = (element: HTMLDivElement) => {
  if (typeof window === "undefined" || !Object.prototype.hasOwnProperty.call(window, "getSelection")) {
    return 0;
  }

  const selection = window.getSelection();
  /** @description 커서 포커스 없을 때 */
  if (selection?.type === "None") {
    return 0;
  }
  const range = window.getSelection()?.getRangeAt(0);
  const preCaretRange = range?.cloneRange();

  if (!selection?.rangeCount || !preCaretRange || !range) return 0;

  preCaretRange.selectNodeContents(element);
  preCaretRange.setEnd(range.endContainer, range.endOffset);
  return preCaretRange.toString().length;
};

export const checkEndCaretPos = (element: HTMLDivElement, caretPos: number) => {
  const content = element.innerText.split("\n").join("");
  return caretPos === content.length;
};

export const setCaretPos = (element: HTMLDivElement) => {
  const range = document.createRange();
  const sel = window.getSelection();

  const pos = getCaretPos(element);
  if (!pos) return;

  range.setStart(element, pos);
  range.collapse(true);
  sel?.removeAllRanges();
  sel?.addRange(range);
  element.focus();
};
