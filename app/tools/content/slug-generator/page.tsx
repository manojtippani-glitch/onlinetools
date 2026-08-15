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
      <Breadcrumbs items={[{ label: 'Content Tools', href: '/?category=content' }, { label: 'Slug Generator' }]} />
      <div>
        <h1 className="headline text-[2rem] mb-2.5">Slug Generator</h1>
        <p className="text-ink-muted max-w-2xl">
          Turn a headline into a clean URL segment, lowercased and hyphenated.
        </p>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text to convert to slug..."
        className="field h-40"
      />

      {slug && (
        <div className="p-4 rounded-lg bg-surface-sunken border border-line">
          <p className="text-ink-muted text-sm mb-2">Generated Slug:</p>
          <div className="relative">
            <code className="block font-mono text-lg text-ink break-all mb-3">{slug}</code>
            <button
              onClick={handleCopy}
              className={`btn btn-sm ${
                copied ? 'bg-green-600 text-white' : 'btn-secondary'
              }`}
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      )}

      <button
        onClick={handleGenerate}
        className="btn btn-primary"
      >
        Generate Slug
      </button>

      <div className="py-4">
        <AdContainer slot="1111111111" format="horizontal" />
      </div>
    </div>
  );
}
