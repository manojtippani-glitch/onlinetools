'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import AdContainer from '@/components/shared/AdContainer';

export default function WordCounter() {
  const searchParams = useSearchParams();
  const [text, setText] = useState('');

  useEffect(() => {
    const inputParam = searchParams.get('input');
    if (inputParam) {
      try {
        const decoded = decodeURIComponent(inputParam);
        setText(decoded);
      } catch (e) {
        // Ignore decoding errors
      }
    }
  }, [searchParams]);

  const countStats = (str: string) => {
    const chars = str.length;
    const charsNoSpaces = str.replace(/\s/g, '').length;
    const words = str.trim() ? str.trim().split(/\s+/).length : 0;
    const lines = str ? str.split('\n').length : 0;
    const paragraphs = str.trim() ? str.trim().split(/\n\n+/).length : 0;
    const sentences = str ? (str.match(/[.!?]+/g) || []).length : 0;

    return { chars, charsNoSpaces, words, lines, paragraphs, sentences };
  };

  const stats = countStats(text);

  const StatCard = ({ label, value }: { label: string; value: number }) => (
    <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 border border-blue-200 dark:border-blue-700">
      <p className="text-gray-600 dark:text-gray-300 text-sm">{label}</p>
      <p className="text-3xl font-bold text-blue-600 dark:text-blue-300">{value}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Content Tools' }, { label: 'Word Counter' }]} />

      <div>
        <h1 className="text-4xl font-bold mb-2">Word Counter</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Count words, characters, paragraphs, and more in real-time.
        </p>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type your text here..."
        className="w-full h-64 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard label="Characters" value={stats.chars} />
        <StatCard label="Chars (no spaces)" value={stats.charsNoSpaces} />
        <StatCard label="Words" value={stats.words} />
        <StatCard label="Lines" value={stats.lines} />
        <StatCard label="Paragraphs" value={stats.paragraphs} />
        <StatCard label="Sentences" value={stats.sentences} />
      </div>

      <div className="py-4">
        <AdContainer slot="9999999999" format="horizontal" />
      </div>
    </div>
  );
}
