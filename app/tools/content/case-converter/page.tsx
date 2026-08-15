'use client';

import { useState } from 'react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import AdContainer from '@/components/shared/AdContainer';

export default function CaseConverter() {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState('');

  const cases = {
    uppercase: (s: string) => s.toUpperCase(),
    lowercase: (s: string) => s.toLowerCase(),
    titlecase: (s: string) => s.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' '),
    camelcase: (s: string) => s.split(/[\s_-]+/).map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1)).join(''),
    snakecase: (s: string) => s.toLowerCase().replace(/[\s-]/g, '_'),
    kebabcase: (s: string) => s.toLowerCase().replace(/[\s_]/g, '-'),
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Content Tools' }, { label: 'Case Converter' }]} />
      <div>
        <h1 className="text-4xl font-bold mb-2">Case Converter</h1>
        <p className="text-gray-600 dark:text-gray-400">Convert text between different cases instantly.</p>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text here..."
        className="w-full h-40 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {Object.entries(cases).map(([name, fn]) => {
          const result = fn(input);
          return (
            <div key={name} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <p className="font-semibold text-gray-900 dark:text-white mb-2 capitalize">{name.replace(/case$/, '')}</p>
              <div className="relative">
                <code className="block font-mono text-sm text-gray-600 dark:text-gray-400 break-all mb-2">{result || '—'}</code>
                <button
                  onClick={() => handleCopy(result)}
                  className={`text-xs px-2 py-1 rounded transition ${
                    copied === result ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {copied === result ? '✓' : 'Copy'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="py-4">
        <AdContainer slot="1010101010" format="horizontal" />
      </div>
    </div>
  );
}
