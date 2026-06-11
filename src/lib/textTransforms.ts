const RANDOM_CHARS = '@#!&*%$';
const STAR_PRESERVED = new Set([' ', '.', ',', '?']);

function splitWords(text: string): string[] {
  return text
    .trim()
    .split(/[\s_\-]+/)
    .filter(Boolean);
}

export function toUpperCase(text: string): string {
  return text.toUpperCase();
}

export function toLowerCase(text: string): string {
  return text.toLowerCase();
}

export function toAlternatingCase(text: string): string {
  const lower = text.toLowerCase();
  let result = '';

  for (let i = 0; i < lower.length; i++) {
    const char = lower[i]!;
    result += i % 2 === 1 ? char.toUpperCase() : char;
  }

  return result;
}

export function toSentenceCase(text: string): string {
  if (!text) return text;

  return text
    .toLowerCase()
    .replace(/(^\s*\w|[.!?]\s+\w)/g, (match) => match.toUpperCase());
}

export function toTitleCase(text: string): string {
  return text
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function toStarMask(text: string): string {
  let result = '';

  for (const char of text) {
    result += STAR_PRESERVED.has(char) ? char : '*';
  }

  return result;
}

export function toRandomChars(text: string): string {
  let result = '';

  for (const char of text) {
    if (char === ' ') {
      result += char;
    } else {
      result += RANDOM_CHARS.charAt(Math.floor(Math.random() * RANDOM_CHARS.length));
    }
  }

  return result;
}

export function toCamelCase(text: string): string {
  const words = splitWords(text);
  if (words.length === 0) return '';

  return words
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (index === 0) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');
}

export function toPascalCase(text: string): string {
  const words = splitWords(text);
  if (words.length === 0) return '';

  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

export function toSnakeCase(text: string): string {
  return splitWords(text)
    .map((word) => word.toLowerCase())
    .join('_');
}

export function toKebabCase(text: string): string {
  return splitWords(text)
    .map((word) => word.toLowerCase())
    .join('-');
}

export function trimText(text: string): string {
  return text.trim();
}

export function collapseWhitespace(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

export function reverseText(text: string): string {
  return [...text].reverse().join('');
}

export function invertCase(text: string): string {
  let result = '';

  for (const char of text) {
    if (char === char.toUpperCase() && char !== char.toLowerCase()) {
      result += char.toLowerCase();
    } else if (char === char.toLowerCase() && char !== char.toUpperCase()) {
      result += char.toUpperCase();
    } else {
      result += char;
    }
  }

  return result;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      return success;
    } catch {
      return false;
    }
  }
}

export type TextTransformId =
  | 'upper'
  | 'lower'
  | 'sentence'
  | 'title'
  | 'alternating'
  | 'invert'
  | 'camel'
  | 'pascal'
  | 'snake'
  | 'kebab'
  | 'collapse'
  | 'trim'
  | 'reverse'
  | 'star'
  | 'random';

export const TEXT_TRANSFORMS: Record<TextTransformId, (text: string) => string> = {
  upper: toUpperCase,
  lower: toLowerCase,
  sentence: toSentenceCase,
  title: toTitleCase,
  alternating: toAlternatingCase,
  invert: invertCase,
  camel: toCamelCase,
  pascal: toPascalCase,
  snake: toSnakeCase,
  kebab: toKebabCase,
  collapse: collapseWhitespace,
  trim: trimText,
  reverse: reverseText,
  star: toStarMask,
  random: toRandomChars,
};
