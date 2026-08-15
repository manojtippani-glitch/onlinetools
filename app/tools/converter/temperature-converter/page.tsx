'use client';
import { useState } from 'react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import AdContainer from '@/components/shared/AdContainer';

export default function TemperatureConverter() {
  const [celsius, setCelsius] = useState('');
  const fahrenheit = celsius ? ((parseFloat(celsius) * 9/5) + 32).toFixed(2) : '';

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Converter Tools', href: '/?category=converter' }, { label: 'Temperature Converter' }]} />
      <div>
        <h1 className="headline text-[2rem] mb-2.5">Temperature Converter</h1>
        <p className="text-ink-muted max-w-2xl">
          Celsius, Fahrenheit, and Kelvin, converted as you type.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div><label className="block mb-2 font-medium">Celsius</label><input type="number" value={celsius} onChange={(e) => setCelsius(e.target.value)} placeholder="Enter °C..." className="w-full p-3 rounded-lg border border-line bg-surface" /></div>
        <div><label className="block mb-2 font-medium">Fahrenheit</label><input type="number" value={fahrenheit} readOnly placeholder="°F" className="w-full p-3 rounded-lg border border-line bg-surface-sunken" /></div>
      </div>
      <AdContainer slot="1818181821" format="horizontal" />
    </div>
  );
}
