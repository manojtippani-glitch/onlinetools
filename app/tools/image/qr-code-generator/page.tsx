'use client';
import { useState } from 'react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import AdContainer from '@/components/shared/AdContainer';

export default function QrCodeGenerator() {
  const [text, setText] = useState('');
  const [qrUrl, setQrUrl] = useState('');

  const generateQR = () => {
    const encoded = encodeURIComponent(text);
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encoded}`);
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Image Tools', href: '/?category=image' }, { label: 'QR Code Generator' }]} />
      <div>
        <h1 className="headline text-[2rem] mb-2.5">QR Code Generator</h1>
        <p className="text-ink-muted max-w-2xl">
          Encode a link or a note into a QR code you can download and print.
        </p>
      </div>
      <input type="text" placeholder="Enter text or URL..." value={text} onChange={(e) => setText(e.target.value)} className="w-full p-3 rounded-lg border border-line bg-surface" />
      <button onClick={generateQR} className="btn btn-primary">Generate QR Code</button>
      {qrUrl && <div className="text-center p-4 bg-white rounded-lg"><img src={qrUrl} alt="QR Code" className="mx-auto" /></div>}
      <AdContainer slot="1515151515" format="horizontal" />
    </div>
  );
}
