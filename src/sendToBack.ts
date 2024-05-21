/**
 * Makes the target SVG element the first child of its immediate parent node.
 *
 * Has no effect if the target SVG element has no parent node.
 *
 * Note that if the immediate parent node of the target SVG element is not the root SVG document
 * (e.g., the target SVG element is in a group), then the target SVG element is only made the first child
 * of its immediate parent node (not the root SVG document).
 */
export function sendToBack(targetSVGElement: SVGElement): void {
  let parentNode = targetSVGElement.parentNode;

  if (parentNode) {
    parentNode.prepend(targetSVGElement);
  }
}
