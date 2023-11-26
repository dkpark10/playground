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

  /** @description range 영역에 속한 노드들을 반환하는 함수 */
  public getRangedNodes(): Array<HTMLElement> {
    const result: Array<HTMLElement> = [];

    const { anchorNode, focusNode } = this;
    if (!anchorNode?.parentElement || !focusNode?.parentElement) return [];

    if (anchorNode.isSameNode(focusNode)) return [anchorNode.parentElement];

    let currentNode = anchorNode.parentElement;
    result.push(currentNode);

    while (!currentNode.nextElementSibling?.isSameNode(focusNode.parentElement)) {
      if (!currentNode?.nextElementSibling) continue;
      result.push(currentNode.nextElementSibling as HTMLElement);
      currentNode = currentNode.nextElementSibling as HTMLElement;
    }
    return [...result, focusNode.parentElement];
  }

  public runBold() {
    const rangeNodes = this.getRangedNodes();
    this.runTextActionFirstRangeNode(rangeNodes[0], "bold");
    this.runTextActionMiddleRangeNode(rangeNodes, "bold");
    this.runTextActionLastRangeNode(rangeNodes.slice(-1)[0], "bold");
    this.selection.removeAllRanges();
  }

  public runTextActionMiddleRangeNode(middleRangeNode: Array<HTMLElement>, action: Editor.EditorAction) {
    const { length } = middleRangeNode;
    for (let i = 1; i < length - 1; i += 1) {
      const { textContent } = middleRangeNode[i];
      if (!textContent) continue;

      const wrapperElement = this.createTextActionElement(textContent, action);

      middleRangeNode[i].innerHTML = "";
      middleRangeNode[i].appendChild(wrapperElement);
    }
  }

  public runTextActionFirstRangeNode(firstRangeNode: HTMLElement, action: Editor.EditorAction) {
    const firstRangeNodeTextContentBefore = firstRangeNode.textContent?.slice(0, this.anchorOffset);
    const firstRangeNodeTextContentAfter = firstRangeNode.textContent?.slice(this.anchorOffset);

    if (!firstRangeNodeTextContentBefore || !firstRangeNodeTextContentAfter) return;

    const beforeTextElement = document.createTextNode(firstRangeNodeTextContentBefore);
    const wrapperElement = this.createTextActionElement(firstRangeNodeTextContentAfter, action);

    firstRangeNode.innerHTML = "";
    firstRangeNode.appendChild(beforeTextElement);
    firstRangeNode.appendChild(wrapperElement);
  }

  public runTextActionLastRangeNode(lastRangeNode: HTMLElement, action: Editor.EditorAction) {
    const lastRangeNodeTextContentBefore = lastRangeNode.textContent?.slice(0, this.anchorOffset);
    const lastRangeNodeTextContentAfter = lastRangeNode.textContent?.slice(this.anchorOffset);

    if (!lastRangeNodeTextContentBefore || !lastRangeNodeTextContentAfter) return;

    const afterTextElement = document.createTextNode(lastRangeNodeTextContentAfter);
    const wrapperElement = this.createTextActionElement(lastRangeNodeTextContentBefore, action);

    lastRangeNode.innerHTML = "";
    lastRangeNode.appendChild(wrapperElement);
    lastRangeNode.appendChild(afterTextElement);
  }
}
