'use client';
import { useState } from 'react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import AdContainer from '@/components/shared/AdContainer';

export default function ColorConverter() {
  const [hex, setHex] = useState('#FF6B6B');

  const hexToRgb = (h: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
    return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : '';
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Image Tools' }, { label: 'Color Converter' }]} />
      <div><h1 className="text-4xl font-bold mb-2">Color Converter</h1></div>
      <div className="space-y-4">
        <input type="color" value={hex} onChange={(e) => setHex(e.target.value)} className="w-full h-20 rounded-lg" />
        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
          <p className="font-mono text-gray-900 dark:text-white mb-2">HEX: {hex}</p>
          <p className="font-mono text-gray-900 dark:text-white">RGB: {hexToRgb(hex)}</p>
        </div>
      </div>
      <AdContainer slot="1616161616" format="horizontal" />
    </div>
  );
}
