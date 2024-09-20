/**
 * @returns Properly formatted and built class name without trailing spaces.
 */
export function buildClassName(...classes: (string | undefined)[]): string {
  return classes
    .map((c) => c?.trim())
    .filter((c) => !!c)
    .join(' ');
}

/**
 * Masks text on a per-character basis.
 *
 * @param text - The text to mask.
 * @param mask - The mask to apply to the text. The mask will be applied on a per-character basis.
 *
 * @returns The masked text.
 *
 * @example
 * ```ts
 * maskText('abc123', /\d/); // => '123'
 * ```
 */
export function maskText(text: string, mask: RegExp): string {
  return text
    .split('')
    .filter((char) => mask.test(char))
    .join('');
}
