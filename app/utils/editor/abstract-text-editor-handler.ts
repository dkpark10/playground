/* eslint-disable no-continue */
import type { Editor } from "types";

export interface AbstractTextEditorHandlerProps {
  contentEditableDom: HTMLDivElement;
  selection: Selection;
  range: Range;
}

export abstract class AbstractTextEditorHandler {
  protected contentEditableDom: HTMLDivElement;

  protected anchorNode: Node | null;

  protected focusNode: Node | null;

  protected anchorOffset: number;

  protected focusOffset: number;

  protected range: Range;

  protected selection: Selection;

  /** @description classname은 tailwind */
  protected classNameByTextAction: Editor.ClassNameByEditorAction = {
    bold: "font-bold",
    cancelLine: "todo temp",
    inclination: "todo temp",
  };

  constructor({ contentEditableDom, selection, range }: AbstractTextEditorHandlerProps) {
    this.contentEditableDom = contentEditableDom;
    this.selection = selection;
    this.range = range;
    this.setCaretPosInfo(selection);
  }

  protected setCaretPosInfo(selection: Selection) {
    this.anchorNode = selection.anchorNode;
    this.focusNode = selection.focusNode;
    this.anchorOffset = selection.anchorOffset;
    this.focusOffset = selection.focusOffset;
  }

  protected abstract getRangedNodes(): Array<Node>;

  public runTextAction(action: Editor.EditorAction) {
    if (action === "bold") {
      this.runBold();
    }
  }

  protected abstract runBold(): void;

  protected createTextActionElement(textContent: string, action: Editor.EditorAction): HTMLSpanElement {
    const wrapperElement = document.createElement("span");
    wrapperElement.className = this.classNameByTextAction[action];
    wrapperElement.textContent = textContent;

    return wrapperElement;
  }
}
