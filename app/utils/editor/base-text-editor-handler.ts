/* eslint-disable no-continue */
import type { Editor } from "types";

export abstract class BaseTextEditorHandler {
  protected contentEditableDom: HTMLDivElement;

  protected anchorNode: Node | null;

  protected focusNode: Node | null;

  protected anchorOffset: number;

  protected focusOffset: number;

  protected isFirstLine: boolean;

  constructor(contentEditableDom: HTMLDivElement) {
    this.contentEditableDom = contentEditableDom;
    this.setCaretPosInfo();
  }

  protected setCaretPosInfo() {
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);

    if (!selection || !range) return;

    this.isFirstLine = !!selection.anchorNode?.parentElement?.getAttribute("contentEditable");
    this.anchorNode = selection.anchorNode;
    this.focusNode = selection.focusNode;
    this.anchorOffset = selection.anchorOffset;
    this.focusOffset = selection.focusOffset;
  }

  protected abstract getRangedNodes(): Array<Node>;

  // protected abstract runTextAction(action: Editor.EditorAction): void;
}
