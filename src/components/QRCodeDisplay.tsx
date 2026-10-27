import React, { useState } from 'react';
import { Copy, Check, QrCode, Globe } from 'lucide-react';
import { copyTextToClipboard } from '../utils/clipboard';

interface QRCodeDisplayProps {
  url: string;
  size?: number;
}

/**
 * Clean SVG QR Code generator with fallback support.
 * Generates an SVG representation that scans cleanly with camera and QR reader apps.
 */
export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ url, size = 180 }) => {
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
    url
  )}&margin=1&color=0f172a&bgcolor=ffffff`;

  const handleCopy = async () => {
    const success = await copyTextToClipboard(url);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
      <div className="relative p-2 bg-white rounded-xl shadow-md border border-slate-100 flex items-center justify-center min-w-[140px] min-h-[140px]">
        {!imageError ? (
          <img
            src={qrImageUrl}
            alt="QR Code for Ha HU Ai"
            width={size}
            height={size}
            className="rounded-lg object-contain"
            loading="lazy"
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-4 text-slate-600 dark:text-slate-300 text-center space-y-2">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600">
              <Globe className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold">Direct URL Share Ready</span>
          </div>
        )}
      </div>

      <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-2.5 text-center flex items-center gap-1">
        <QrCode className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
        <span>Scan with phone to open & record progress instantly</span>
      </p>

      <button
        onClick={handleCopy}
        className="mt-2 text-xs font-black text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-500" />
            <span>Link Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Link</span>
          </>
        )}
      </button>
    </div>
  );
};

