'use client';
import { useState } from 'react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import AdContainer from '@/components/shared/AdContainer';

export default function ColorPalette() {
  const [colors, setColors] = useState(['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8']);

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Image Tools', href: '/?category=image' }, { label: 'Color Palette' }]} />
      <div>
        <h1 className="headline text-[2rem] mb-2.5">Color Palette Generator</h1>
        <p className="text-ink-muted max-w-2xl">
          Pick a base color and build a matching set, with hex codes ready to copy.
        </p>
      </div>
      <div className="grid grid-cols-5 gap-3">
        {colors.map((color) => (
          <div key={color} className="h-24 rounded-lg" style={{ backgroundColor: color }}><p className="p-2 font-mono text-xs text-white">{color}</p></div>
        ))}
      </div>
      <button className="btn btn-primary">Generate Palette</button>
      <AdContainer slot="1717171717" format="horizontal" />
    </div>
  );
}
