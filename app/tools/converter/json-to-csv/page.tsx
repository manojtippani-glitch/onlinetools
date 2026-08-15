'use client';
import { useState } from 'react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import AdContainer from '@/components/shared/AdContainer';

export default function JsonToCsv() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Converter Tools' }, { label: 'JSON to CSV' }]} />
      <div><h1 className="text-4xl font-bold mb-2">JSON to CSV Converter</h1></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste JSON..." className="h-64 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
        <textarea value={output} placeholder="CSV output..." className="h-64 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900" readOnly />
      </div>
      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg">Convert</button>
      <AdContainer slot="1818181819" format="horizontal" />
    </div>
  );
}
