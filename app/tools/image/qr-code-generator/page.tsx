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
        <h1 className="text-4xl font-bold mb-2">QR Code Generator</h1>
        <p className="text-gray-600 dark:text-gray-400">Generate QR codes from text or URLs.</p>
      </div>
      <input type="text" placeholder="Enter text or URL..." value={text} onChange={(e) => setText(e.target.value)} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
      <button onClick={generateQR} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">Generate QR Code</button>
      {qrUrl && <div className="text-center p-4 bg-white rounded-lg"><img src={qrUrl} alt="QR Code" className="mx-auto" /></div>}
      <AdContainer slot="1515151515" format="horizontal" />
    </div>
  );
}
