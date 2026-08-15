'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import AdContainer from '@/components/shared/AdContainer';

export default function CodeBeautifier() {
  const searchParams = useSearchParams();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [indentSize, setIndentSize] = useState(2);
  const [language, setLanguage] = useState('javascript');

  useEffect(() => {
    const inputParam = searchParams.get('input');
    const langParam = searchParams.get('language');

    if (inputParam) {
      try {
        const decoded = decodeURIComponent(inputParam);
        setInput(decoded);
      } catch (e) {
        // Ignore decoding errors
      }
    }

    if (langParam && ['javascript', 'json', 'html', 'xml'].includes(langParam)) {
      setLanguage(langParam);
    }
  }, [searchParams]);

  const beautifyCode = (code: string, lang: string, indent: number): string => {
    let result = code;
    const indentStr = ' '.repeat(indent);

    if (lang === 'javascript' || lang === 'json') {
      let depth = 0;
      let inString = false;
      let stringChar = '';
      let formatted = '';

      for (let i = 0; i < result.length; i++) {
        const char = result[i];
        const prevChar = i > 0 ? result[i - 1] : '';

        if ((char === '"' || char === "'" || char === '`') && prevChar !== '\\') {
          if (!inString) {
            inString = true;
            stringChar = char;
          } else if (char === stringChar) {
            inString = false;
          }
        }

        if (!inString) {
          if (char === '{' || char === '[') {
            formatted += char + '\n' + indentStr.repeat(depth + 1);
            depth++;
          } else if (char === '}' || char === ']') {
            depth = Math.max(0, depth - 1);
            formatted = formatted.trimEnd() + '\n' + indentStr.repeat(depth) + char;
          } else if (char === ',') {
            formatted += char + '\n' + indentStr.repeat(depth);
          } else if (char === ':') {
            formatted += char + ' ';
          } else if (char === ' ' || char === '\n' || char === '\t') {
            if (formatted[formatted.length - 1] !== ' ' && formatted[formatted.length - 1] !== '\n') {
              formatted += ' ';
            }
          } else {
            formatted += char;
          }
        } else {
          formatted += char;
        }
      }
      return formatted.trim();
    }

    if (lang === 'html' || lang === 'xml') {
      let depth = 0;
      let formatted = '';
      let inTag = false;
      let tag = '';

      for (let i = 0; i < result.length; i++) {
        const char = result[i];

        if (char === '<') {
          if (formatted.trim()) {
            formatted += '\n' + indentStr.repeat(depth);
          }
          inTag = true;
          tag = char;
        } else if (char === '>') {
          tag += char;
          formatted += tag;
          inTag = false;

          if (tag.includes('</')) {
            depth = Math.max(0, depth - 1);
          } else if (!tag.includes('/>') && !tag.match(/<(br|hr|img|input|meta|link)[\s>]/i)) {
            depth++;
          }
        } else if (inTag) {
          tag += char;
        } else if (char.trim()) {
          formatted += char;
        }
      }
      return formatted.trim();
    }

    return result;
  };

  const handleBeautify = () => {
    setError('');
    setOutput('');

    if (!input.trim()) {
      setError('Please enter code to beautify');
      return;
    }

    try {
      const formatted = beautifyCode(input, language, indentSize);
      setOutput(formatted);
    } catch (err) {
      setError('Failed to beautify code. Please check your input.');
    }
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Developer Tools' }, { label: 'Code Beautifier' }]} />

      <div>
        <h1 className="text-4xl font-bold mb-2">Code Beautifier</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Format and beautify your code with proper indentation. Supports JavaScript, JSON, HTML, and XML.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-3">
          <div className="flex items-center h-9">
            <label className="font-semibold text-gray-900 dark:text-white">Input Code</label>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your code here..."
            className="w-full h-80 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Output Section */}
        <div className="space-y-3">
          <div className="flex justify-between items-center h-9">
            <label className="font-semibold text-gray-900 dark:text-white">Output Code</label>
            {output ? (
              <button
                onClick={handleCopy}
                className={`text-sm px-3 py-1 rounded transition ${
                  copied
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            ) : (
              <div className="w-12 h-9" />
            )}
          </div>
          <div className="w-full h-80 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-mono text-sm overflow-auto">
            {output ? (
              <pre className="text-gray-900 dark:text-gray-100">{output}</pre>
            ) : (
              <p className="text-gray-500">Output will appear here...</p>
            )}
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
          <label className="flex items-center gap-2">
            <span className="font-medium text-gray-900 dark:text-white">Language:</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
            >
              <option value="javascript">JavaScript</option>
              <option value="json">JSON</option>
              <option value="html">HTML</option>
              <option value="xml">XML</option>
            </select>
          </label>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
          <label className="flex items-center gap-2">
            <span className="font-medium text-gray-900 dark:text-white">Indent Size:</span>
            <select
              value={indentSize}
              onChange={(e) => setIndentSize(Number(e.target.value))}
              className="px-3 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={8}>8 spaces</option>
            </select>
          </label>
        </div>
      </div>

      {/* Error/Status Message */}
      {error && (
        <div className="p-4 rounded-lg bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100">
          {error}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleBeautify}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Beautify
        </button>
        <button
          onClick={handleClear}
          className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition font-medium"
        >
          Clear
        </button>
      </div>

      {/* Ad Space */}
      <div className="py-4">
        <AdContainer slot="4444444444" format="horizontal" />
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 border-t border-gray-200 dark:border-gray-800">
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">✨ Multiple Languages</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">JavaScript, JSON, HTML, and XML</p>
        </div>
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">🎯 Custom Indentation</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">2, 4, or 8 space indentation</p>
        </div>
      </div>
    </div>
  );
}
