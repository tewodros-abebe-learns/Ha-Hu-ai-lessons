/**
 * Reliable multi-tier clipboard & native share utilities.
 * Ensures smooth sharing across all browsers, mobile devices, iframes, and hosting providers.
 */

export async function copyTextToClipboard(text: string): Promise<boolean> {
  // Tier 1: Modern navigator.clipboard API
  if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to fallback
    }
  }

  // Tier 2: Hidden textarea fallback (works on older mobile browsers, iframes & non-HTTPS local networks)
  if (typeof document !== 'undefined') {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      
      // Prevent scrolling to bottom of screen
      textArea.style.position = 'fixed';
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.width = '2em';
      textArea.style.height = '2em';
      textArea.style.padding = '0';
      textArea.style.border = 'none';
      textArea.style.outline = 'none';
      textArea.style.boxShadow = 'none';
      textArea.style.background = 'transparent';
      textArea.style.opacity = '0';
      
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) return true;
    } catch {
      // Ignore
    }
  }

  return false;
}

/**
 * Native OS share dialog support for mobile browsers (WhatsApp, Telegram, iMessage, etc.)
 */
export async function shareNative(options: {
  title?: string;
  text?: string;
  url?: string;
}): Promise<boolean> {
  if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
    try {
      await navigator.share(options);
      return true;
    } catch {
      // User cancelled share or unsupported
      return false;
    }
  }
  return false;
}

/**
 * Checks if the device supports native mobile sharing
 */
export function canNativeShare(): boolean {
  return typeof navigator !== 'undefined' && typeof navigator.share === 'function';
}
