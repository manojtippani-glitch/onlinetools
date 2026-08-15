'use client';
import { useState } from 'react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import AdContainer from '@/components/shared/AdContainer';

export default function ImageCompressor() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Image Tools', href: '/?category=image' }, { label: 'Image Compressor' }]} />
      <div><h1 className="text-4xl font-bold mb-2">Image Compressor</h1></div>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <p className="text-gray-600 dark:text-gray-400">Drop image here or click to upload</p>
      </div>
      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg">Select Image</button>
      <AdContainer slot="1717171718" format="horizontal" />
    </div>
  );
}
