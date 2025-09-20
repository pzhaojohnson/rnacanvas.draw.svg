/**
 * Creates a new HTML canvas element and draws the passed in SVG document on it.
 *
 * The dimensions of the canvas element are made to match the `width` and `height` attributes of the SVG document.
 *
 * This function might fail (if the SVG document is too big, for instance).
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

  canvas.width = svg.width.baseVal.value;
  canvas.height = svg.height.baseVal.value;

  let context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Unable to get canvas context.');
  }

  let serializer = new XMLSerializer();
  let xml = serializer.serializeToString(svg);

  let image = new Image();
  image.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(xml);

  // wait for image to load
  await image.decode();

  context.drawImage(image, 0, 0, svg.width.baseVal.value, svg.height.baseVal.value);

  // remove from document body
  canvas.remove();

  // return to default
  canvas.style.position = '';

  // return to defaults
  canvas.style.display = '';
  canvas.style.pointerEvents = '';

  return canvas;
}
