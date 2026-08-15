'use client';

import { useState } from 'react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import AdContainer from '@/components/shared/AdContainer';

export default function SlugGenerator() {
  const [input, setInput] = useState('');
  const [slug, setSlug] = useState('');
  const [copied, setCopied] = useState(false);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleGenerate = () => {
    const result = generateSlug(input);
    setSlug(result);
  };

  const handleCopy = () => {
    if (slug) {
      navigator.clipboard.writeText(slug);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Content Tools' }, { label: 'Slug Generator' }]} />
      <div>
        <h1 className="text-4xl font-bold mb-2">Slug Generator</h1>
        <p className="text-gray-600 dark:text-gray-400">Generate URL-friendly slugs from text.</p>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text to convert to slug..."
        className="w-full h-40 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />

      {slug && (
        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Generated Slug:</p>
          <div className="relative">
            <code className="block font-mono text-lg text-gray-900 dark:text-white break-all mb-3">{slug}</code>
            <button
              onClick={handleCopy}
              className={`text-sm px-3 py-1 rounded transition ${
                copied ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}

      <button
        onClick={handleGenerate}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
      >
        Generate Slug
      </button>

      <div className="py-4">
        <AdContainer slot="1111111111" format="horizontal" />
      </div>
    </div>
  );
}
