'use client';
import { useState } from 'react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import AdContainer from '@/components/shared/AdContainer';

export default function JsonToCsv() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Converter Tools', href: '/?category=converter' }, { label: 'JSON to CSV' }]} />
      <div>
        <h1 className="headline text-[2rem] mb-2.5">JSON to CSV</h1>
        <p className="text-ink-muted max-w-2xl">
          Flatten an array of objects into spreadsheet rows, using the keys as headers.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste JSON..." className="h-64 p-4 rounded-lg border border-line bg-surface" />
        <textarea value={output} placeholder="CSV output..." className="h-64 p-4 rounded-lg border border-line bg-surface-sunken" readOnly />
      </div>
      <button className="btn btn-primary">Convert</button>
      <AdContainer slot="1818181819" format="horizontal" />
    </div>
  );
}
