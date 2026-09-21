import { imageVariants } from '../data/image-variants.js';
import { escapeHtml as esc } from './html.js';
export function imageAttributes(source, sizes = '(max-width: 760px) 46vw, 350px') {
  const variants = imageVariants[source];
  if (!variants) return `src="${esc(source)}"`;
  return `src="${esc(variants[0].src)}" srcset="${variants.map(image => `${esc(image.src)} ${image.width}w`).join(', ')}" sizes="${esc(sizes)}"`;
}
