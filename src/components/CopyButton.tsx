"use client";

import { useState, useCallback } from "react";

interface CopyButtonProps {
  text: string;
  className?: string;
}

export default function CopyButton({ text, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className={`text-xs px-2.5 py-1 rounded-md transition-all ${
        copied
          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
          : "bg-neutral-800 text-neutral-400 border border-neutral-700 hover:text-neutral-200 hover:border-neutral-600 cursor-pointer"
      } ${className}`}
      aria-label={copied ? "Copied!" : `Copy "${text}" to clipboard`}
      type="button"
    >
      {copied ? "✓ Copied" : "Copy"}
    </button>
  );
}
