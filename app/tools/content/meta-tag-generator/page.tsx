'use client';
import { useState } from 'react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import AdContainer from '@/components/shared/AdContainer';

export default function MetaTagGenerator() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [copied, setCopied] = useState(false);

  const generateMeta = () => {
    return `<meta name="title" content="${title}">
<meta name="description" content="${description}">
<meta name="keywords" content="${keywords}">
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateMeta());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Content Tools', href: '/?category=content' }, { label: 'Meta Tag Generator' }]} />
      <div>
        <h1 className="text-4xl font-bold mb-2">Meta Tag Generator</h1>
        <p className="text-gray-600 dark:text-gray-400">Generate SEO meta tags easily.</p>
      </div>
      <div className="space-y-4">
        <input type="text" placeholder="Page Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
        <textarea placeholder="Meta Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full h-24 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
        <input type="text" placeholder="Keywords (comma separated)" value={keywords} onChange={(e) => setKeywords(e.target.value)} className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
      </div>
      <pre className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 overflow-auto text-sm">{generateMeta()}</pre>
      <button onClick={handleCopy} className={`px-6 py-2 rounded-lg transition font-medium ${copied ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>{copied ? '✓ Copied!' : 'Copy Code'}</button>
      <AdContainer slot="1313131313" format="horizontal" />
    </div>
  );
}
