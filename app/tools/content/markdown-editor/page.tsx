'use client';
import { useState } from 'react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import AdContainer from '@/components/shared/AdContainer';

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState('# Hello\n\nStart typing markdown...');

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Content Tools', href: '/?category=content' }, { label: 'Markdown Editor' }]} />
      <div>
        <h1 className="text-4xl font-bold mb-2">Markdown Editor</h1>
        <p className="text-gray-600 dark:text-gray-400">Live markdown preview editor.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <textarea value={markdown} onChange={(e) => setMarkdown(e.target.value)} placeholder="Enter markdown..." className="h-96 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 font-mono text-sm" />
        <div className="h-96 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 overflow-auto prose dark:prose-invert max-w-none">{markdown}</div>
      </div>
      <AdContainer slot="1212121212" format="horizontal" />
    </div>
  );
}
