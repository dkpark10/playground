/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-useless-constructor */
/* eslint-disable no-continue */
import type { Editor } from "types";
import { AbstractTextEditorHandler, type AbstractTextEditorHandlerProps } from "./abstract-text-editor-handler";

/** @description 기본 텍스트 에디터 핸들러 */
export class TextEditorHandler extends AbstractTextEditorHandler {
  constructor({ contentEditableDom, selection, range }: AbstractTextEditorHandlerProps) {
    super({ contentEditableDom, selection, range });
  }

  public runBold() {
    const clonedContents = this.range.cloneContents();
    // this.range.deleteContents();

    this.runTextActionFirstRangeNode("bold");
    this.runTextActionLastRangeNode("bold");
    // this.runTextActionMiddleRangeNode(clonedContents.childNodes, "bold");
    this.selection.removeAllRanges();
  }

  public runTextActionFirstRangeNode(action: Editor.EditorAction) {
    const { startContainer, startOffset } = this.range;
    const beforeText = startContainer.parentElement?.textContent?.slice(0, startOffset);
    const afterText = startContainer.parentElement?.textContent?.slice(startOffset);

    const beforeElement = document.createTextNode(beforeText ?? "");
    const afterElement = this.createTextActionElement(action);
    afterElement.textContent = afterText ?? "";

    const newElement = document.createElement("div");
    newElement.appendChild(beforeElement);
    newElement.appendChild(afterElement);

    startContainer.parentElement?.replaceWith(newElement);
  }

  public runTextActionLastRangeNode(action: Editor.EditorAction) {
    const { endContainer, endOffset } = this.range;
    const beforeText = endContainer.parentElement?.textContent?.slice(0, endOffset);
    const afterText = endContainer.parentElement?.textContent?.slice(endOffset);

    const beforeElement = this.createTextActionElement(action);
    beforeElement.textContent = beforeText ?? "";

    const afterElement = document.createTextNode(afterText ?? "");

    const newElement = document.createElement("div");
    newElement.appendChild(beforeElement);
    newElement.appendChild(afterElement);

    endContainer.parentElement?.replaceWith(newElement);
  }

  public runTextActionMiddleRangeNode(middleRangeNode: NodeListOf<ChildNode>, action: Editor.EditorAction) {
    const { length } = middleRangeNode;
    for (let i = length - 1; i >= 1; i -= 1) {
      const childNode = middleRangeNode[i];
      this.runTextActionRangeNode(childNode, action);
    }
  }

  public runTextActionRangeNode(childNode: ChildNode | null, action: Editor.EditorAction) {
    if (!childNode || !childNode.textContent) return;

    const wrapperElement = this.createTextActionElement(action);
    const newElement = childNode.cloneNode();
    newElement.textContent = childNode.textContent;
    wrapperElement.appendChild(newElement);
    this.range.insertNode(wrapperElement);
  }
}
