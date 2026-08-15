'use client';
import { useState } from 'react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import AdContainer from '@/components/shared/AdContainer';

export default function RandomGenerator() {
  const [result, setResult] = useState('');
  const [type, setType] = useState('number');

  const generate = () => {
    if (type === 'number') {
      setResult(Math.floor(Math.random() * 1000).toString());
    } else if (type === 'string') {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let str = '';
      for (let i = 0; i < 10; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setResult(str);
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Converter Tools', href: '/?category=converter' }, { label: 'Random Generator' }]} />
      <div>
        <h1 className="headline text-[2rem] mb-2.5">Random Generator</h1>
        <p className="text-ink-muted max-w-2xl">
          Random numbers, strings, and throwaway IDs for testing and seed data.
        </p>
      </div>
      <div className="space-y-4">
        <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-3 rounded-lg border border-line bg-surface">
          <option value="number">Random Number</option>
          <option value="string">Random String</option>
        </select>
        <button onClick={generate} className="btn btn-primary w-full">Generate</button>
        {result && <div className="p-4 rounded-lg bg-surface-sunken"><p className="font-mono text-lg">{result}</p></div>}
      </div>
      <AdContainer slot="1818181822" format="horizontal" />
    </div>
  );
}
