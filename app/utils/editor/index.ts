/* eslint-disable no-continue */
import type { Editor } from "types";

export class TextEditorHandler {
  private contentEditableDom: HTMLDivElement;

  private anchorNode: Node | null;

  private focusNode: Node | null;

  private anchorOffset: number;

  private focusOffset: number;

  private isFirstLine: boolean;

  constructor(contentEditableDom: HTMLDivElement) {
    this.contentEditableDom = contentEditableDom;
    this.setCaretPosInfo();
  }

  public setCaretPosInfo() {
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);

    if (!selection || !range) return;

    this.isFirstLine = !!selection.anchorNode?.parentElement?.getAttribute("contentEditable");
    this.anchorNode = selection.anchorNode;
    this.focusNode = selection.focusNode;
    this.anchorOffset = selection.anchorOffset;
    this.focusOffset = selection.focusOffset;
  }

  /** @description range 영역에 속한 노드들을 반환하는 함수 */
  public getRangedNodes(): Array<Node> {
    if (this.isFirstLine) return this.getRangedNodesFromFirst();
    return this.getRangedNodesFromNotFirst();
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

  public getRangedNodesFromNotFirst(): Array<Element> {
    const result: Array<Element> = [];

    const { anchorNode, focusNode } = this;
    if (!anchorNode?.parentElement || !focusNode?.parentElement) return [];

    if (anchorNode.isSameNode(focusNode)) return [anchorNode.parentElement];

    let currentNode = anchorNode.parentElement;
    result.push(currentNode);

    while (!currentNode.nextElementSibling?.isSameNode(focusNode.parentElement)) {
      if (!currentNode?.nextElementSibling) continue;
      result.push(currentNode.nextElementSibling);
      currentNode = currentNode.nextElementSibling as HTMLElement;
    }
    return [...result, focusNode.parentElement];
  }

  public runTextAction(action: Editor.EditorAction) {
    const rangedElements = this.getRangedNodes();
  }
}
