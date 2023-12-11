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

    const { startContainer, endContainer, startOffset, endOffset } = this.range;
    this.setRangeAll();

    const firstNode =
      clonedContents.childNodes.length > 1
        ? this.getActionFirstNodeAllLine(endContainer, endOffset, "bold")
        : this.getActionFirstNode(endContainer, startOffset, endOffset, "bold");

    const middleNode = this.getActionMiddleNode(clonedContents.childNodes, "bold");
    const lastNode = this.getActionLastNode(startContainer, startOffset, "bold");

    this.range.deleteContents();

    this.range.insertNode(firstNode);
    middleNode.forEach((node) => this.range.insertNode(node));

    if (clonedContents.childNodes.length > 1) {
      this.range.insertNode(lastNode);
    }

    this.selection.removeAllRanges();
  }

  /** @desc 영역을 start container, end container 를 포함하여 새로 설정하는 함수 */
  public setRangeAll() {
    this.range.setStart(this.range.startContainer, 0);
    this.range.setEndAfter(this.range.endContainer);
  }

  public getActionFirstNodeAllLine(node: Node, startOffset: number, action: Editor.EditorAction) {
    const beforeText = node.textContent?.slice(0, startOffset);
    const afterText = node.textContent?.slice(startOffset);

    const beforeElement = document.createTextNode(beforeText ?? "");
    const afterElement = this.createTextActionElement(action);
    afterElement.textContent = afterText ?? "";

    const newElement = document.createElement("div");
    newElement.appendChild(beforeElement);
    newElement.appendChild(afterElement);

    return newElement;
  }

  public getActionFirstNode(node: Node, startOffset: number, endOffset: number, action: Editor.EditorAction) {
    const beforeText = node.textContent?.slice(0, startOffset);
    const middleText = node.textContent?.slice(startOffset, endOffset);
    const afterText = node.textContent?.slice(endOffset);

    const beforeElement = document.createTextNode(beforeText ?? "");
    const middleElement = this.createTextActionElement(action);
    middleElement.textContent = middleText ?? "";

    const afterElement = document.createTextNode(afterText ?? "");

    const newElement = document.createElement("div");
    newElement.appendChild(beforeElement);
    newElement.appendChild(middleElement);
    newElement.appendChild(afterElement);

    return newElement;
  }

  public getActionLastNode(node: Node, endOffset: number, action: Editor.EditorAction) {
    const beforeText = node.textContent?.slice(0, endOffset);
    const afterText = node.textContent?.slice(endOffset);

    const beforeElement = this.createTextActionElement(action);
    beforeElement.textContent = beforeText ?? "";

    const afterElement = document.createTextNode(afterText ?? "");

    const newElement = document.createElement("div");
    newElement.appendChild(beforeElement);
    newElement.appendChild(afterElement);

    return newElement;
  }

  public getActionMiddleNode(middleRangeNode: NodeListOf<ChildNode>, action: Editor.EditorAction) {
    const result = [];
    const { length } = middleRangeNode;
    for (let i = length - 2; i >= 1; i -= 1) {
      const childNode = middleRangeNode[i];
      result.push(this.runTextActionRangeNode(childNode, action));
    }

    return result;
  }

  public runTextActionRangeNode(childNode: ChildNode, action: Editor.EditorAction) {
    const wrapperElement = this.createTextActionElement(action);
    const newElement = childNode.cloneNode();
    newElement.textContent = childNode.textContent;
    wrapperElement.appendChild(newElement);

    return wrapperElement;
  }
}
