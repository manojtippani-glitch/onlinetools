'use client';
import { useState } from 'react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import AdContainer from '@/components/shared/AdContainer';

export default function UnitConverter() {
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Converter Tools', href: '/?category=converter' }, { label: 'Unit Converter' }]} />
      <div>
        <h1 className="headline text-[2rem] mb-2.5">Unit Converter</h1>
        <p className="text-ink-muted max-w-2xl">
          Length, weight, and volume across metric and imperial.
        </p>
      </div>
      <div className="space-y-4">
        <input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter value..." className="w-full p-3 rounded-lg border border-line bg-surface" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select className="p-3 rounded-lg border border-line bg-surface"><option>Meters</option><option>Kilometers</option><option>Miles</option></select>
          <select className="p-3 rounded-lg border border-line bg-surface"><option>Meters</option><option>Kilometers</option><option>Miles</option></select>
        </div>
        <button className="btn btn-primary">Convert</button>
        {result && <div className="p-4 rounded-lg bg-surface-sunken">{result}</div>}
      </div>
      <AdContainer slot="1818181820" format="horizontal" />
    </div>
  );
}
