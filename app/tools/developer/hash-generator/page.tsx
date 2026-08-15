'use client';

import { useState } from 'react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import AdContainer from '@/components/shared/AdContainer';

export default function HashGenerator() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState('');

  const generateHashes = async (text: string) => {
    if (!text.trim()) return;

    const hashes: Record<string, string> = {};

    // Simple hash functions (for demo)
    const djb2 = (str: string): string => {
      let hash = 5381;
      for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash) + str.charCodeAt(i);
      }
      return Math.abs(hash).toString(16);
    };

    hashes['DJB2'] = djb2(text);

    // MD5-like simple hash
    const simpleHash = (str: string): string => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return Math.abs(hash).toString(16).padStart(8, '0');
    };

    hashes['Simple Hash'] = simpleHash(text);

    setResults(hashes);
  };

  const handleGenerate = () => {
    generateHashes(input);
  };

  const handleCopy = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopied(hash);
    setTimeout(() => setCopied(''), 2000);
  };

  const handleClear = () => {
    setInput('');
    setResults({});
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Developer Tools', href: '/?category=developer' }, { label: 'Hash Generator' }]} />

      <div>
        <h1 className="text-4xl font-bold mb-2">Hash Generator</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Generate hash values for text. Note: For production use, integrate with crypto libraries.
        </p>
      </div>

      <div>
        <label className="font-semibold text-gray-900 dark:text-white mb-2 block">Input Text</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to hash..."
          className="w-full h-40 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {Object.keys(results).length > 0 && (
        <div className="space-y-3">
          <h2 className="font-semibold text-gray-900 dark:text-white">Hash Results</h2>
          {Object.entries(results).map(([type, hash]) => (
            <div key={type} className="p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900 dark:text-white">{type}:</span>
                <button
                  onClick={() => handleCopy(hash)}
                  className={`text-sm px-3 py-1 rounded transition ${
                    copied === hash
                      ? 'bg-green-600 text-white'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {copied === hash ? '✓ Copied!' : 'Copy'}
                </button>
              </div>
              <code className="block font-mono text-sm text-gray-900 dark:text-gray-100 break-all">{hash}</code>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleGenerate}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Generate
        </button>
        <button
          onClick={handleClear}
          className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition font-medium"
        >
          Clear
        </button>
      </div>

      <div className="py-4">
        <AdContainer slot="6666666666" format="horizontal" />
      </div>

      <div className="p-4 rounded-lg bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 text-sm">
        ℹ️ This tool provides simple hash functions for demonstration. For production cryptographic hashing (MD5, SHA256, etc.), please use dedicated crypto libraries.
      </div>
    </div>
  );
}
