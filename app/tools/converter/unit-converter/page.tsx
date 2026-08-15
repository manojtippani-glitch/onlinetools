'use client';
import { useState } from 'react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import AdContainer from '@/components/shared/AdContainer';

export default function UnitConverter() {
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Converter Tools' }, { label: 'Unit Converter' }]} />
      <div><h1 className="text-4xl font-bold mb-2">Unit Converter</h1></div>
      <div className="space-y-4">
        <input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter value..." className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"><option>Meters</option><option>Kilometers</option><option>Miles</option></select>
          <select className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"><option>Meters</option><option>Kilometers</option><option>Miles</option></select>
        </div>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg">Convert</button>
        {result && <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900">{result}</div>}
      </div>
      <AdContainer slot="1818181820" format="horizontal" />
    </div>
  );
}
