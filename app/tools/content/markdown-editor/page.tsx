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
        <h1 className="headline text-[2rem] mb-2.5">Markdown Editor</h1>
        <p className="text-ink-muted max-w-2xl">
          Write Markdown on the left and watch the rendered HTML update beside it.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <textarea value={markdown} onChange={(e) => setMarkdown(e.target.value)} placeholder="Enter markdown..." className="h-96 p-4 rounded-lg border border-line bg-surface font-mono text-sm" />
        <div className="h-96 p-4 rounded-lg border border-line bg-surface-sunken overflow-auto prose dark:prose-invert max-w-none">{markdown}</div>
      </div>
      <AdContainer slot="1212121212" format="horizontal" />
    </div>
  );
}
