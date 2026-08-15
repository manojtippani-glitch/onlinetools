'use client';
import { useState } from 'react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import AdContainer from '@/components/shared/AdContainer';

export default function Tool() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Image Tools' }, { label: '${tool^}' }]} />
      <div><h1 className="text-4xl font-bold mb-2">${tool^}</h1></div>
      <textarea placeholder="Tool input..." className="w-full h-64 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg">Process</button>
      <AdContainer slot="1717171717" format="horizontal" />
    </div>
  );
}
