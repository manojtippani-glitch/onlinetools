'use client';
import { useState } from 'react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import AdContainer from '@/components/shared/AdContainer';

export default function QrCodeDecoder() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Image Tools' }, { label: 'QR Code Decoder' }]} />
      <div><h1 className="text-4xl font-bold mb-2">QR Code Decoder</h1></div>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <p className="text-gray-600 dark:text-gray-400">Upload QR code image to decode</p>
      </div>
      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg">Upload Image</button>
      <AdContainer slot="1717171719" format="horizontal" />
    </div>
  );
}
