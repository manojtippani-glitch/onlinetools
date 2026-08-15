'use client';

import { useState } from 'react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import AdContainer from '@/components/shared/AdContainer';

export default function Base64Encoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleEncode = () => {
    setError('');
    setOutput('');

    if (!input.trim()) {
      setError('Please enter text to encode');
      return;
    }

    try {
      const encoded = btoa(unescape(encodeURIComponent(input)));
      setOutput(encoded);
    } catch (err) {
      setError('Failed to encode. Please check your input.');
    }
  };

  const handleDecode = () => {
    setError('');
    setOutput('');

    if (!input.trim()) {
      setError('Please enter base64 to decode');
      return;
    }

    try {
      const decoded = decodeURIComponent(escape(atob(input)));
      setOutput(decoded);
    } catch (err) {
      setError('Invalid Base64. Please check your input.');
    }
  };

  const handleAutoDetect = () => {
    setError('');
    setOutput('');

    if (!input.trim()) {
      setError('Please enter text');
      return;
    }

    try {
      // Try to decode first
      const decoded = decodeURIComponent(escape(atob(input)));
      setOutput(decoded);
    } catch {
      // If decode fails, encode instead
      try {
        const encoded = btoa(unescape(encodeURIComponent(input)));
        setOutput(encoded);
      } catch (err) {
        setError('Failed to process. Please check your input.');
      }
    }
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Developer Tools', href: '/?category=developer' }, { label: 'Base64 Encoder' }]} />

      <div>
        <h1 className="text-4xl font-bold mb-2">Base64 Encoder/Decoder</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Encode text to Base64 or decode Base64 strings. 100% client-side processing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-3">
          <div className="flex items-center h-9">
            <label className="font-semibold text-gray-900 dark:text-white">Input</label>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to encode or Base64 to decode..."
            className="w-full h-80 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Character count: {input.length} | Encoded size: {Math.ceil((input.length * 4) / 3)} bytes
          </p>
        </div>

        {/* Output Section */}
        <div className="space-y-3">
          <div className="flex justify-between items-center h-9">
            <label className="font-semibold text-gray-900 dark:text-white">Output</label>
            {output ? (
              <button
                onClick={handleCopy}
                className={`text-sm px-3 py-1 rounded transition ${
                  copied
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            ) : (
              <div className="w-12 h-9" />
            )}
          </div>
          <div className="w-full h-80 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-mono text-sm overflow-auto break-all">
            {output ? (
              <pre className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">{output}</pre>
            ) : (
              <p className="text-gray-500">Output will appear here...</p>
            )}
          </div>
        </div>
      </div>

      {/* Error/Status Message */}
      {error && (
        <div className="p-4 rounded-lg bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100">
          {error}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleEncode}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Encode
        </button>
        <button
          onClick={handleDecode}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
        >
          Decode
        </button>
        <button
          onClick={handleAutoDetect}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium"
        >
          Auto Detect
        </button>
        <button
          onClick={handleClear}
          className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition font-medium"
        >
          Clear
        </button>
      </div>

      {/* Ad Space */}
      <div className="py-4">
        <AdContainer slot="2222222222" format="horizontal" />
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-gray-200 dark:border-gray-800">
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">🔐 Encode</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Convert text to Base64 format</p>
        </div>
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">🔓 Decode</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Convert Base64 back to text</p>
        </div>
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">🎯 Auto Detect</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Automatically detect and convert</p>
        </div>
      </div>
    </div>
  );
}
