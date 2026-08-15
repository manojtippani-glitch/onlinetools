'use client';
import { useState } from 'react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import AdContainer from '@/components/shared/AdContainer';

export default function QrCodeDecoder() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Image Tools', href: '/?category=image' }, { label: 'QR Code Decoder' }]} />
      <div>
        <h1 className="headline text-[2rem] mb-2.5">QR Code Reader</h1>
        <p className="text-ink-muted max-w-2xl">
          Upload a QR image and read the text back out of it.
        </p>
      </div>
      <div className="border border-dashed border-line-strong rounded-xl p-10 text-center">
        <p className="text-ink-muted">Upload QR code image to decode</p>
      </div>
      <button className="btn btn-primary">Upload Image</button>
      <AdContainer slot="1717171719" format="horizontal" />
    </div>
  );
}
