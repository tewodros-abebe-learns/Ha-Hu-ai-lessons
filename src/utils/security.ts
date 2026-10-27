/**
 * Ha Hu Ai — Security & Sanitization Utilities
 * 
 * Provides defense-in-depth sanitization, prototype pollution defense,
 * URL protocol hardening, and input bounds validation across the app.
 */

const ALLOWED_PROTOCOLS = ['https:', 'http:', 'mailto:'];

/**
 * Validates whether a URL is safe to open/link to.
 * Strictly prevents javascript:, data:, vbscript:, and file: schemes.
 */
export function isSafeUrl(url: unknown): boolean {
  if (typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (!trimmed) return false;

  // Disallow javascript:, data:, vbscript:, blob: with executable schemes
  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith('javascript:') ||
    lower.startsWith('data:') ||
    lower.startsWith('vbscript:') ||
    lower.startsWith('file:') ||
    lower.startsWith('about:')
  ) {
    return false;
  }

  try {
    const parsed = new URL(trimmed, typeof window !== 'undefined' ? window.location.origin : 'https://hahu-ai.app');
    return ALLOWED_PROTOCOLS.includes(parsed.protocol);
  } catch {
    // If it's a relative URL, ensure it doesn't contain protocol bypass tricks
    return !trimmed.includes(':') && !trimmed.startsWith('//');
  }
}

/**
 * Returns a sanitized, safe URL string, or undefined if unsafe.
 */
export function sanitizeSafeUrl(url: unknown, fallback?: string): string | undefined {
  if (isSafeUrl(url)) {
    return (url as string).trim();
  }
  return fallback;
}

/**
 * Sanitizes arbitrary text input, stripping HTML tags, control chars, and bounding length.
 */
export function sanitizeText(input: unknown, maxLength = 64, fallback = ''): string {
  if (typeof input !== 'string') return fallback;
  const cleaned = input
    .replace(/[<>'"/\\`]/g, '') // Strip HTML tags and template delimiters
    .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // Strip control characters
    .trim()
    .slice(0, maxLength);
  return cleaned || fallback;
}

/**
 * Validates and constrains a number within bounds.
 */
export function sanitizeNumber(input: unknown, min: number, max: number, defaultVal: number): number {
  if (typeof input !== 'number' || !Number.isFinite(input) || Number.isNaN(input)) {
    if (typeof input === 'string') {
      const parsed = Number(input);
      if (Number.isFinite(parsed) && !Number.isNaN(parsed)) {
        return Math.max(min, Math.min(max, Math.floor(parsed)));
      }
    }
    return defaultVal;
  }
  return Math.max(min, Math.min(max, Math.floor(input)));
}

/**
 * Deeply strips prototype pollution keys (__proto__, constructor, prototype)
 * from parsed untrusted objects.
 */
export function sanitizeObjectKeys<T>(obj: T): T {
  if (!obj || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeObjectKeys(item)) as unknown as T;
  }

  const clean: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      continue;
    }
    clean[key] = sanitizeObjectKeys(value);
  }
  return clean as T;
}

/**
 * Safely parses a JSON string with prototype pollution defense and safe fallbacks.
 */
export function safeJsonParse<T>(jsonStr: unknown, fallback: T): T {
  if (typeof jsonStr !== 'string' || !jsonStr.trim()) {
    return fallback;
  }
  try {
    const parsed = JSON.parse(jsonStr);
    return sanitizeObjectKeys(parsed) as T;
  } catch {
    return fallback;
  }
}
