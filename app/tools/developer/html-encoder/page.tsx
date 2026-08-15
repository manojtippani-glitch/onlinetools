'use client';


import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import AdContainer from '@/components/shared/AdContainer';

const HTML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
};

const ENTITY_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(HTML_ENTITIES).map(([k, v]) => [v, k])
);

export default function HtmlEncoder() {
  const searchParams = useSearchParams();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

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

  const encodeHtml = (text: string): string => {
    return text.replace(/[&<>"'\/]/g, (char) => HTML_ENTITIES[char] || char);
  };

  const decodeHtml = (text: string): string => {
    let result = text;
    Object.entries(ENTITY_MAP).forEach(([entity, char]) => {
      result = result.replace(new RegExp(entity, 'g'), char);
    });
    return result;
  };

  const handleEncode = () => {
    if (input.trim()) {
      setOutput(encodeHtml(input));
    }
  };

  const handleDecode = () => {
    if (input.trim()) {
      setOutput(decodeHtml(input));
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
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Developer Tools', href: '/?category=developer' }, { label: 'HTML Encoder' }]} />

      <div>
        <h1 className="text-4xl font-bold mb-2">HTML Entity Encoder</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Encode and decode HTML entities safely.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex items-center h-9">
            <label className="font-semibold text-gray-900 dark:text-white">Input</label>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter HTML or entities..."
            className="w-full h-80 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center h-9">
            <label className="font-semibold text-gray-900 dark:text-white">Output</label>
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
          <div className="w-full h-80 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-mono text-sm overflow-auto break-all">
            {output ? (
              <pre className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">{output}</pre>
            ) : (
              <p className="text-gray-500">Output will appear here...</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleEncode}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Encode
        </button>
        <button
          onClick={handleDecode}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
        >
          Decode
        </button>
        <button
          onClick={handleClear}
          className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition font-medium"
        >
          Clear
        </button>
      </div>

      <div className="py-4">
        <AdContainer slot="7777777777" format="horizontal" />
      </div>
    </div>
  );
}
