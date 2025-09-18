import { Scaling } from './Scaling';

/**
 * Creates a new HTML canvas element and draws the passed in SVG document on it.
 *
 * The dimensions of the canvas element are made to match those of the SVG document.
 *
 * At this time the SVG document is simply drawn on the canvas with horizontal and vertical scalings of 1
 * regardless of what scalings the SVG document might actually have.
 */
export async function drawOnCanvas(svg: SVGSVGElement): Promise<HTMLCanvasElement | never> {
  let canvas = document.createElement('canvas');

  // don't affect the positioning of other elements
  canvas.style.position = 'fixed';

  // make invisible and non-interactive
  canvas.style.display = 'none';
  canvas.style.pointerEvents = 'none';

  // add to the document body in case it is necessary for proper SVG drawing
  document.body.append(canvas);

  // don't edit the passed in SVG document
  let svgCopy = svg.cloneNode(true);

  if (!(svgCopy instanceof SVGSVGElement)) {
    throw new Error('Unable to clone SVG document');
  }

  (new Scaling(svgCopy)).set(1);

  canvas.width = svgCopy.viewBox.baseVal.width;
  canvas.height = svgCopy.viewBox.baseVal.height;

  let context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Unable to get canvas context.');
  }

  let serializer = new XMLSerializer();
  let xml = serializer.serializeToString(svgCopy);

  let image = new Image();
  image.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(xml);

  // wait for image to load
  await image.decode();

  context.drawImage(image, 0, 0, svgCopy.viewBox.baseVal.width, svgCopy.viewBox.baseVal.height);

  // remove from document body
  canvas.remove();

  // return to default
  canvas.style.position = '';

  // return to defaults
  canvas.style.display = '';
  canvas.style.pointerEvents = '';

  return canvas;
}
