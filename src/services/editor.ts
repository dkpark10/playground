export const mockStock = ["카카오", "삼성전자", "애플", "아마존", "구글"];

export const setLastPosCaret = (element: HTMLElement) => {
  const selection = window.getSelection();
  const newRange = document.createRange();

  newRange.selectNodeContents(element);
  newRange.collapse(false);
  selection?.removeAllRanges();
  selection?.addRange(newRange);
  element?.focus();
};

/** @desc 커서 위치정보를 얻는 함수 */
export const getCaretPos = (element: HTMLElement | null) => {
  const initValue = {
    caretPos: 0,
    isFirstLine: true,
    anchorNode: null,
    isTextNode: false,
  };
  if (typeof window === "undefined" || !Object.prototype.hasOwnProperty.call(window, "getSelection") || !element) {
    return initValue;
  }

  const selection = window.getSelection();
  /** @description 커서 포커스 없을 때 */
  if (selection?.type === "None") {
    return initValue;
  }
  const range = window.getSelection()?.getRangeAt(0);

  if (!selection?.rangeCount || !range) return initValue;

  const { anchorOffset, anchorNode } = selection;
  const isFirstLine = selection.anchorNode === element.firstChild;
  const isTextNode = element === anchorNode?.parentNode;

  return {
    caretPos: anchorOffset,
    anchorNode,
    isTextNode,
    isFirstLine,
  };
};
