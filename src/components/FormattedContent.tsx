import React from 'react';

interface FormattedContentProps {
  content: string;
  className?: string;
}

// Helper to convert raw LaTeX expressions to human-friendly clean math strings
export const cleanMathNotation = (rawText: string): string => {
  if (!rawText) return '';

  let text = rawText;

  // Replace common LaTeX fraction patterns: \frac{a}{b} -> (a / b) or a / b
  // Nested or simple
  let prev = '';
  while (prev !== text) {
    prev = text;
    text = text.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '($1 / $2)');
  }

  // Replace LaTeX sqrt: \sqrt{a} -> √(a)
  text = text.replace(/\\sqrt\{([^{}]+)\}/g, '√($1)');
  text = text.replace(/\\sqrt/g, '√');

  // Replace common LaTeX symbols with Unicode math symbols
  text = text.replace(/\\cdot/g, ' · ');
  text = text.replace(/\\times/g, ' × ');
  text = text.replace(/\\div/g, ' ÷ ');
  text = text.replace(/\\implies/g, ' ⇒ ');
  text = text.replace(/\\iff/g, ' ⇔ ');
  text = text.replace(/\\Rightarrow/g, ' ⇒ ');
  text = text.replace(/\\rightarrow/g, ' → ');
  text = text.replace(/\\Leftarrow/g, ' ⇐ ');
  text = text.replace(/\\leftarrow/g, ' ← ');
  text = text.replace(/\\pm/g, ' ± ');
  text = text.replace(/\\mp/g, ' ∓ ');
  text = text.replace(/\\neq/g, ' ≠ ');
  text = text.replace(/\\le(q)?\b/g, ' ≤ ');
  text = text.replace(/\\ge(q)?\b/g, ' ≥ ');
  text = text.replace(/\\approx/g, ' ≈ ');
  text = text.replace(/\\in\b/g, ' ∈ ');
  text = text.replace(/\\notin\b/g, ' ∉ ');
  text = text.replace(/\\subset\b/g, ' ⊂ ');
  text = text.replace(/\\cup\b/g, ' ∪ ');
  text = text.replace(/\\cap\b/g, ' ∩ ');
  text = text.replace(/\\emptyset/g, ' ∅ ');
  text = text.replace(/\\infty/g, ' ∞ ');
  text = text.replace(/\\int/g, ' ∫ ');
  text = text.replace(/\\sum/g, ' ∑ ');
  text = text.replace(/\\prod/g, ' ∏ ');
  text = text.replace(/\\pi\b/g, ' π ');
  text = text.replace(/\\theta\b/g, ' θ ');
  text = text.replace(/\\alpha\b/g, ' α ');
  text = text.replace(/\\beta\b/g, ' β ');
  text = text.replace(/\\Delta\b/g, ' Δ ');
  text = text.replace(/\\lambda\b/g, ' λ ');
  text = text.replace(/\\mu\b/g, ' µ ');
  text = text.replace(/\\sigma\b/g, ' σ ');
  text = text.replace(/\\omega\b/g, ' ω ');
  text = text.replace(/\\left\(/g, '(');
  text = text.replace(/\\right\)/g, ')');
  text = text.replace(/\\left\[/g, '[');
  text = text.replace(/\\right\]/g, ']');
  text = text.replace(/\\left\\{/g, '{');
  text = text.replace(/\\right\\}/g, '}');
  text = text.replace(/\\left\|/g, '|');
  text = text.replace(/\\right\|/g, '|');
  text = text.replace(/\\text\{([^{}]+)\}/g, '$1');
  text = text.replace(/\\mathrm\{([^{}]+)\}/g, '$1');
  text = text.replace(/\\mathbf\{([^{}]+)\}/g, '$1');
  text = text.replace(/\\mathbb\{([^{}]+)\}/g, '$1');
  text = text.replace(/\\quad/g, '  ');
  text = text.replace(/\\qquad/g, '    ');
  text = text.replace(/\\,/g, ' ');
  text = text.replace(/\\;/g, ' ');
  text = text.replace(/\\!/g, '');

  // Exponent formatting for clean readability: ^2 -> ², ^3 -> ³, ^n -> ⁿ
  text = text.replace(/\^2\b/g, '²');
  text = text.replace(/\^3\b/g, '³');
  text = text.replace(/\^n\b/g, 'ⁿ');
  text = text.replace(/\^\{2\}/g, '²');
  text = text.replace(/\^\{3\}/g, '³');
  text = text.replace(/\^\{n\}/g, 'ⁿ');
  text = text.replace(/\^\{([^{}]+)\}/g, '^($1)');
  text = text.replace(/_\{([^{}]+)\}/g, '_($1)');

  // Clean remaining dollar signs used for inline math $...$ or $$...$$
  text = text.replace(/\$\$([^\$]+)\$\$/g, '$1');
  text = text.replace(/\$([^\$]+)\$/g, '$1');

  // Strip dangling backslashes before plain letters
  text = text.replace(/\\([a-zA-Z]+)/g, '$1');

  return text;
};

// Formats inline text with bold, italic, code-like spans and clean inline formulas
const formatInlineText = (text: string): React.ReactNode[] => {
  const clean = cleanMathNotation(text);
  
  // Split by bold (**text**), italic (*text*), or inline code (`code`)
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*.*?\*\*|\*.*?\*|`.*?`)/g;
  const tokens = clean.split(regex);

  tokens.forEach((token, idx) => {
    if (!token) return;
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={idx} className="font-bold text-amber-300">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      parts.push(
        <em key={idx} className="italic text-slate-300">
          {token.slice(1, -1)}
        </em>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code
          key={idx}
          className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-emerald-400 font-mono text-xs"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else {
      parts.push(token);
    }
  });

  return parts;
};

export const FormattedContent: React.FC<FormattedContentProps> = ({
  content,
  className = ''
}) => {
  if (!content) return null;

  const lines = content.split('\n');
  const renderedElements: React.ReactNode[] = [];

  let inTable = false;
  let tableRows: string[][] = [];
  let tableHeaders: string[] = [];

  const flushTable = () => {
    if (inTable && (tableHeaders.length > 0 || tableRows.length > 0)) {
      renderedElements.push(
        <div key={`table-${renderedElements.length}`} className="my-3 overflow-x-auto rounded-xl border border-slate-700 bg-slate-950/80 shadow-md">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            {tableHeaders.length > 0 && (
              <thead className="bg-slate-800 text-amber-300 font-bold border-b border-slate-700">
                <tr>
                  {tableHeaders.map((th, hIdx) => (
                    <th key={hIdx} className="p-2.5 sm:p-3 border-r border-slate-700/60 last:border-r-0">
                      {formatInlineText(th.trim())}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {tableRows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-900/60 transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="p-2.5 sm:p-3 border-r border-slate-800/80 last:border-r-0 font-sans">
                      {formatInlineText(cell.trim())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      inTable = false;
      tableRows = [];
      tableHeaders = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Markdown Table Detection
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const cells = trimmed
        .split('|')
        .slice(1, -1)
        .map(c => c.trim());

      // Check if this is separator row (| :--- | :--- |)
      const isSeparator = cells.every(c => /^:?-+:?$/.test(c));

      if (isSeparator) {
        // Just marks that preceding row was header
        inTable = true;
      } else if (!inTable && tableHeaders.length === 0) {
        inTable = true;
        tableHeaders = cells;
      } else {
        tableRows.push(cells);
      }
      continue;
    } else {
      flushTable();
    }

    if (!trimmed) {
      renderedElements.push(<div key={`empty-${i}`} className="h-2" />);
      continue;
    }

    // Horizontal Rule
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      renderedElements.push(
        <hr key={`hr-${i}`} className="my-3 border-t border-slate-700/80" />
      );
      continue;
    }

    // Headings
    if (trimmed.startsWith('### ')) {
      renderedElements.push(
        <h3
          key={`h3-${i}`}
          className="text-base sm:text-lg font-bold text-amber-400 mt-4 mb-1.5 flex items-center gap-1.5"
        >
          {formatInlineText(trimmed.replace('### ', ''))}
        </h3>
      );
      continue;
    }

    if (trimmed.startsWith('## ')) {
      renderedElements.push(
        <h2
          key={`h2-${i}`}
          className="text-lg sm:text-xl font-extrabold text-white mt-5 mb-2 pb-1 border-b border-slate-700/60"
        >
          {formatInlineText(trimmed.replace('## ', ''))}
        </h2>
      );
      continue;
    }

    if (trimmed.startsWith('# ')) {
      renderedElements.push(
        <h1
          key={`h1-${i}`}
          className="text-xl sm:text-2xl font-black text-amber-400 mt-6 mb-3"
        >
          {formatInlineText(trimmed.replace('# ', ''))}
        </h1>
      );
      continue;
    }

    // Highlighted Formula Box / Centered Math (e.g. $$ formula $$ or line with prominent math)
    if (
      (rawLine.trim().startsWith('$$') && rawLine.trim().endsWith('$$')) ||
      (rawLine.trim().startsWith('$$\\') && rawLine.includes('$$'))
    ) {
      const cleanFormula = cleanMathNotation(rawLine);
      renderedElements.push(
        <div
          key={`math-block-${i}`}
          className="my-2.5 p-3 rounded-2xl bg-gradient-to-r from-blue-950/70 via-slate-900 to-blue-950/70 border border-blue-500/40 text-emerald-300 font-mono font-bold text-sm sm:text-base text-center shadow-inner overflow-x-auto"
        >
          {cleanFormula}
        </div>
      );
      continue;
    }

    // Bullet points
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
      const bulletText = trimmed.replace(/^(\*|-|•)\s+/, '');
      renderedElements.push(
        <div key={`bullet-${i}`} className="flex items-start space-x-2 my-1 pl-1">
          <span className="text-amber-400 text-sm font-bold mt-0.5">•</span>
          <div className="text-slate-200 text-sm leading-relaxed flex-1">
            {formatInlineText(bulletText)}
          </div>
        </div>
      );
      continue;
    }

    // Numbered list (e.g. 1. 2.)
    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (numMatch) {
      renderedElements.push(
        <div key={`num-${i}`} className="flex items-start space-x-2.5 my-1.5 pl-1">
          <span className="px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-400 text-xs font-bold shrink-0 mt-0.5">
            {numMatch[1]}
          </span>
          <div className="text-slate-200 text-sm leading-relaxed flex-1">
            {formatInlineText(numMatch[2])}
          </div>
        </div>
      );
      continue;
    }

    // Callout boxes with icons (💡, ⚠️, ✅, 📝, 🎯, 📌)
    if (
      trimmed.startsWith('💡') ||
      trimmed.startsWith('⚠️') ||
      trimmed.startsWith('✅') ||
      trimmed.startsWith('📝') ||
      trimmed.startsWith('🎯') ||
      trimmed.startsWith('📌')
    ) {
      renderedElements.push(
        <div
          key={`callout-${i}`}
          className="my-3 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm leading-relaxed shadow-sm flex items-start space-x-2.5"
        >
          <div className="text-slate-200 flex-1">
            {formatInlineText(trimmed)}
          </div>
        </div>
      );
      continue;
    }

    // Regular paragraph
    renderedElements.push(
      <p key={`p-${i}`} className="text-slate-200 text-sm leading-relaxed my-1">
        {formatInlineText(trimmed)}
      </p>
    );
  }

  flushTable();

  return <div className={`space-y-1 ${className}`}>{renderedElements}</div>;
};
