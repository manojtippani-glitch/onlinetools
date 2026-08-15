'use client';
import { useState } from 'react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import AdContainer from '@/components/shared/AdContainer';

export default function PlagiarismChecker() {
  const [text, setText] = useState('');

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Content Tools', href: '/?category=content' }, { label: 'Text Duplicate Checker' }]} />
      <div>
        <h1 className="headline text-[2rem] mb-2.5">Duplicate Text Checker</h1>
        <p className="text-ink-muted max-w-2xl">
          Compare two passages and see which phrases overlap.
        </p>
      </div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste text to check..." className="w-full h-64 p-4 rounded-lg border border-line bg-surface font-mono text-sm" />
      <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-100">
        <p>Unique words: {new Set(text.toLowerCase().split(/\s+/)).size}</p>
        <p>Total words: {text.trim().split(/\s+/).filter(w => w).length}</p>
      </div>
      <AdContainer slot="1414141414" format="horizontal" />
    </div>
  );
}
