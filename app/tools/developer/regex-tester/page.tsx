'use client';

import { useState } from 'react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import AdContainer from '@/components/shared/AdContainer';

export default function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [testString, setTestString] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [flags, setFlags] = useState('g');
  const [copied, setCopied] = useState(false);

  const handleTest = () => {
    setError('');
    setOutput('');

    if (!pattern.trim()) {
      setError('Please enter a regex pattern');
      return;
    }

    if (!testString.trim()) {
      setError('Please enter test string');
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const matches = testString.match(regex);

      if (matches) {
        setOutput(`✓ ${matches.length} match(es) found:\n\n${matches.map((m, i) => `${i + 1}. ${m}`).join('\n')}`);
      } else {
        setOutput('✗ No matches found');
      }
    } catch (err) {
      setError(`Invalid regex: ${err instanceof Error ? err.message : 'Unknown error'}`);
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
    setPattern('');
    setTestString('');
    setOutput('');
    setError('');
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Developer Tools', href: '/?category=developer' }, { label: 'Regex Tester' }]} />

      <div>
        <h1 className="text-4xl font-bold mb-2">Regex Tester</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Test and validate regular expressions against test strings.
        </p>
      </div>

      <div className="space-y-4">
        {/* Pattern Input */}
        <div>
          <label className="font-semibold text-gray-900 dark:text-white mb-2 block">Regular Expression Pattern</label>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="/pattern/flags"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Flags */}
        <div>
          <label className="font-semibold text-gray-900 dark:text-white mb-2 block">Flags</label>
          <div className="flex gap-4">
            {['g', 'i', 'm', 's'].map(flag => (
              <label key={flag} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={flags.includes(flag)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFlags(flags + flag);
                    } else {
                      setFlags(flags.replace(flag, ''));
                    }
                  }}
                  className="w-4 h-4"
                />
                <span className="text-gray-900 dark:text-white font-mono">{flag}</span>
              </label>
            ))}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">g=global, i=case-insensitive, m=multiline, s=dotAll</p>
        </div>

        {/* Test String */}
        <div>
          <label className="font-semibold text-gray-900 dark:text-white mb-2 block">Test String</label>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter text to test..."
            className="w-full h-40 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Output */}
        <div>
          <div className="flex justify-between items-center mb-2 h-9">
            <label className="font-semibold text-gray-900 dark:text-white block">Results</label>
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
          <div className="w-full h-40 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-mono text-sm overflow-auto">
            {output ? (
              <pre className="text-gray-900 dark:text-gray-100">{output}</pre>
            ) : (
              <p className="text-gray-500">Results will appear here...</p>
            )}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-lg bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100">
          {error}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleTest}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Test
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
        <AdContainer slot="5555555555" format="horizontal" />
      </div>
    </div>
  );
}
