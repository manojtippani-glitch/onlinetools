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
      <Breadcrumbs items={[{ label: 'Converter Tools', href: '/?category=converter' }, { label: 'Password Generator' }]} />
      <div>
        <h1 className="headline text-[2rem] mb-2.5">Password Generator</h1>
        <p className="text-ink-muted max-w-2xl">
          Generate a random password at the length you want, with the character sets you pick.
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">Length: {length}</label>
          <input type="range" min="8" max="64" value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full" />
        </div>
        <button onClick={generatePassword} className="btn btn-primary w-full">Generate</button>
        {password && <div className="p-4 rounded-lg bg-surface-sunken font-mono"><p className="mb-2 break-all">{password}</p><button onClick={handleCopy} className={`btn btn-secondary btn-sm`}>{copied ? 'Copied' : 'Copy'}</button></div>}
      </div>
      <AdContainer slot="1818181818" format="horizontal" />
    </div>
  );
}
