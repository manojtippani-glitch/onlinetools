'use client';
import { useState } from 'react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import AdContainer from '@/components/shared/AdContainer';

export default function ImageCompressor() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Image Tools', href: '/?category=image' }, { label: 'Image Compressor' }]} />
      <div>
        <h1 className="headline text-[2rem] mb-2.5">Image Compressor</h1>
        <p className="text-ink-muted max-w-2xl">
          Shrink JPG and PNG files before you ship them. Nothing is uploaded.
        </p>
      </div>
      <div className="border border-dashed border-line-strong rounded-xl p-10 text-center">
        <p className="text-ink-muted">Drop image here or click to upload</p>
      </div>
      <button className="btn btn-primary">Select Image</button>
      <AdContainer slot="1717171718" format="horizontal" />
    </div>
  );
}
