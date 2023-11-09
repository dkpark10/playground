interface CaretPosInfo extends Partial<Selection> {
  isFirstLine: boolean;
}

export const getCaretPosInfo = (): CaretPosInfo | null => {
  const selection = window.getSelection();
  const range = selection?.getRangeAt(0);

  if (!selection || !range) return null;

  return {
    isFirstLine: !!selection.anchorNode?.parentElement?.getAttribute("contentEditable"),
    anchorNode: selection.anchorNode,
    anchorOffset: selection.anchorOffset,
    focusOffset: selection.focusOffset,
    focusNode: selection.focusNode,
  };
};
