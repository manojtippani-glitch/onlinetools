'use client';
import { useState } from 'react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import AdContainer from '@/components/shared/AdContainer';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Converter Tools' }, { label: 'Password Generator' }]} />
      <div><h1 className="text-4xl font-bold mb-2">Password Generator</h1></div>
      <div className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">Length: {length}</label>
          <input type="range" min="8" max="64" value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full" />
        </div>
        <button onClick={generatePassword} className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Generate</button>
        {password && <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 font-mono"><p className="mb-2 break-all">{password}</p><button onClick={handleCopy} className={`text-sm px-3 py-1 rounded ${copied ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'}`}>{copied ? '✓ Copied!' : 'Copy'}</button></div>}
      </div>
      <AdContainer slot="1818181818" format="horizontal" />
    </div>
  );
}
