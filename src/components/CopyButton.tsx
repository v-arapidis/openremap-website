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
          ? "bg-brand/20 text-brand-bright border border-brand/30"
          : "bg-surface-2 text-ink-muted border border-edge hover:text-ink hover:border-ink-faint cursor-pointer"
      } ${className}`}
      aria-label={copied ? "Copied!" : `Copy "${text}" to clipboard`}
      type="button"
    >
      {copied ? "✓ Copied" : "Copy"}
    </button>
  );
}
