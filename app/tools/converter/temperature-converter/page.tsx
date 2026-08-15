'use client';
import { useState } from 'react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import AdContainer from '@/components/shared/AdContainer';

export default function TemperatureConverter() {
  const [celsius, setCelsius] = useState('');
  const fahrenheit = celsius ? ((parseFloat(celsius) * 9/5) + 32).toFixed(2) : '';

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Converter Tools' }, { label: 'Temperature Converter' }]} />
      <div><h1 className="text-4xl font-bold mb-2">Temperature Converter</h1></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div><label className="block mb-2 font-medium">Celsius</label><input type="number" value={celsius} onChange={(e) => setCelsius(e.target.value)} placeholder="Enter °C..." className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" /></div>
        <div><label className="block mb-2 font-medium">Fahrenheit</label><input type="number" value={fahrenheit} readOnly placeholder="°F" className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900" /></div>
      </div>
      <AdContainer slot="1818181821" format="horizontal" />
    </div>
  );
}
