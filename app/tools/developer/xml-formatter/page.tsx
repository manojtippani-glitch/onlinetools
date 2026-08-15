'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import AdContainer from '@/components/shared/AdContainer';

export default function XmlFormatter() {
  const searchParams = useSearchParams();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [indentSize, setIndentSize] = useState(2);

  useEffect(() => {
    const inputParam = searchParams.get('input');
    if (inputParam) {
      try {
        const decoded = decodeURIComponent(inputParam);
        setInput(decoded);
      } catch (e) {
        // Ignore decoding errors
      }
    }
  }, [searchParams]);

  const formatXml = (xml: string, indent: number): string => {
    const tab = ' '.repeat(indent);
    let formatted = '';
    let depth = 0;
    let inTag = false;
    let tagContent = '';

    for (let i = 0; i < xml.length; i++) {
      const char = xml[i];

      if (char === '<') {
        if (tagContent.trim()) {
          formatted += tagContent.trim() + '\n';
          tagContent = '';
        }
        inTag = true;
        tagContent = char;
      } else if (char === '>') {
        tagContent += char;
        inTag = false;

        const isClosing = tagContent.includes('</');
        const isSelfClosing = tagContent.includes('/>');
        const isComment = tagContent.includes('<!--');
        const isDeclaration = tagContent.includes('<?');

        if (isClosing && !isDeclaration && !isComment) {
          depth = Math.max(0, depth - 1);
        }

        formatted += tab.repeat(depth) + tagContent.trim() + '\n';

        if (!isClosing && !isSelfClosing && !isComment && !isDeclaration) {
          depth++;
        }
        tagContent = '';
      } else if (inTag) {
        tagContent += char;
      } else if (char.trim()) {
        tagContent += char;
      }
    }

    return formatted.trim();
  };

  const handleFormat = () => {
    setError('');
    setOutput('');

    if (!input.trim()) {
      setError('Please enter XML to format');
      return;
    }

    try {
      const formatted = formatXml(input, indentSize);
      setOutput(formatted);
    } catch (err) {
      setError('Invalid XML. Please check your input.');
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
      <Breadcrumbs items={[{ label: 'Developer Tools' }, { label: 'XML Formatter' }]} />

      <div>
        <h1 className="text-4xl font-bold mb-2">XML Formatter</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Format and beautify XML with proper indentation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex items-center h-9">
            <label className="font-semibold text-gray-900 dark:text-white">Input XML</label>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your XML here..."
            className="w-full h-80 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center h-9">
            <label className="font-semibold text-gray-900 dark:text-white">Output XML</label>
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

      {error && (
        <div className="p-4 rounded-lg bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100">
          {error}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleFormat}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Format
        </button>
        <button
          onClick={handleClear}
          className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition font-medium"
        >
          Clear
        </button>
      </div>

      <div className="py-4">
        <AdContainer slot="8888888888" format="horizontal" />
      </div>
    </div>
  );
}
