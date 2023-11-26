/* eslint-disable @typescript-eslint/no-useless-constructor */
/* eslint-disable no-continue */
import type { Editor } from "types";
import { BaseTextEditorHandler } from "./base-text-editor-handler";

/** @description 첫 라인 커서시 선택시 다루는 클래스 */
export class TextEditorFirstLineHandler extends BaseTextEditorHandler {
  constructor(contentEditableDom: HTMLDivElement) {
    super(contentEditableDom);
  }

  /** @description range 영역에 속한 노드들을 반환하는 함수 */
  public getRangedNodes(): Array<Node> {
    const result: Array<Node | HTMLElement> = [];

    const { anchorNode, focusNode } = this;
    if (!anchorNode || !focusNode?.parentElement) return [];

    if (anchorNode.isSameNode(focusNode)) return [anchorNode];

    let currentNode = anchorNode;
    result.push(currentNode);

    while (!currentNode.nextSibling?.isSameNode(focusNode.parentElement)) {
      if (!currentNode.nextSibling) continue;
      result.push(currentNode.nextSibling);
      currentNode = currentNode.nextSibling;
    }
    return [...result, focusNode.parentElement];
  }

  public getRangedNodesFromFirst(): Array<Node> {
    const result: Array<Node | HTMLElement> = [];

    const { anchorNode, focusNode } = this;
    if (!anchorNode || !focusNode?.parentElement) return [];

    if (anchorNode.isSameNode(focusNode)) return [anchorNode];

    let currentNode = anchorNode;
    result.push(currentNode);

    while (!currentNode.nextSibling?.isSameNode(focusNode.parentElement)) {
      if (!currentNode.nextSibling) continue;
      result.push(currentNode.nextSibling);
      currentNode = currentNode.nextSibling;
    }
    return [...result, focusNode.parentElement];
  }
}
