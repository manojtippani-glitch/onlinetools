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
        <h1 className="text-4xl font-bold mb-2">Text Duplicate Checker</h1>
        <p className="text-gray-600 dark:text-gray-400">Check for duplicate text and phrases.</p>
      </div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste text to check..." className="w-full h-64 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 font-mono text-sm" />
      <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-100">
        <p>Unique words: {new Set(text.toLowerCase().split(/\s+/)).size}</p>
        <p>Total words: {text.trim().split(/\s+/).filter(w => w).length}</p>
      </div>
      <AdContainer slot="1414141414" format="horizontal" />
    </div>
  );
}
