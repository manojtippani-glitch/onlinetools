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
        <h1 className="headline text-[2rem] mb-2.5">Hash Generator</h1>
        <p className="text-ink-muted max-w-2xl">
          Turn a string into a short digest for cache keys and quick comparisons.
        </p>
      </div>

      <div>
        <label className="text-[13px] font-medium mb-2 block">Input Text</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to hash..."
          className="field h-40"
        />
      </div>

      {Object.keys(results).length > 0 && (
        <div className="space-y-3">
          <h2 className="text-[13px] font-medium">Hash Results</h2>
          {Object.entries(results).map(([type, hash]) => (
            <div key={type} className="p-4 rounded-lg border border-line bg-surface-sunken">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] font-medium">{type}:</span>
                <button
                  onClick={() => handleCopy(hash)}
                  className={`btn btn-sm ${
                    copied === hash
                      ? 'bg-green-600 text-white'
                      : 'btn-secondary'
                  }`}
                >
                  {copied === hash ? '✓ Copied!' : 'Copy'}
                </button>
              </div>
              <code className="block font-mono text-sm text-ink break-all">{hash}</code>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleGenerate}
          className="btn btn-primary"
        >
          Generate
        </button>
        <button
          onClick={handleClear}
          className="btn btn-ghost"
        >
          Clear
        </button>
      </div>

      <div className="py-4">
        <AdContainer slot="6666666666" format="horizontal" />
      </div>

      <div className="p-4 rounded-lg bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 text-sm">
        This tool provides simple hash functions for demonstration. For production cryptographic hashing (MD5, SHA256, etc.), please use dedicated crypto libraries.
      </div>
    </div>
  );
}
