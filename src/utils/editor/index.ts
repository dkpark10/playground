/* eslint-disable no-continue */
import type { Editor } from "types";
import { TextEditorFirstLineHandler } from "./text-editor-first-line-handler";
import { TextEditorHandler } from "./text-editor-handler";

export const runTextEditorAction = (contentEditableDom: HTMLDivElement, action: Editor.EditorAction) => {
  const selection = window.getSelection();
  const range = selection?.getRangeAt(0);

  if (!selection || !range) return;

  const isFirstLine = !!selection.anchorNode?.parentElement?.getAttribute("contentEditable");

  if (isFirstLine) {
    const firstLineEditorHandler = new TextEditorFirstLineHandler({ contentEditableDom, selection, range });
    firstLineEditorHandler.runTextAction(action);
    return;
  }

  const editorHandler = new TextEditorHandler({ contentEditableDom, selection, range });
  editorHandler.runTextAction(action);
};
