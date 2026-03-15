import React from 'react';

/**
 * Render simple markdown bold (**text**) as React elements.
 * Handles mixed content: "Normal text **bold text** more normal text"
 * No dependencies — just regex splitting.
 */
export function renderMarkdown(text: string): React.ReactNode {
  if (!text) return null;
  
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

/**
 * HTML version for PDF export — converts **text** to <strong>text</strong>
 */
export function markdownToHtml(text: string): string {
  if (!text) return '';
  return text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}
