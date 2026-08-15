'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import AdContainer from '@/components/shared/AdContainer';

const TOOLS = [
  // Developer Tools
  { id: 'json-formatter', name: 'JSON Formatter', category: 'developer', description: 'Format and validate JSON with pretty printing', icon: '📄' },
  { id: 'base64-encoder', name: 'Base64 Encoder', category: 'developer', description: 'Encode/decode text to Base64', icon: '🔐' },
  { id: 'url-encoder', name: 'URL Encoder', category: 'developer', description: 'Encode/decode URLs safely', icon: '🔗' },
  { id: 'code-beautifier', name: 'Code Beautifier', category: 'developer', description: 'Format and beautify code', icon: '✨' },
  { id: 'regex-tester', name: 'Regex Tester', category: 'developer', description: 'Test and validate regular expressions', icon: '🧪' },
  { id: 'hash-generator', name: 'Hash Generator', category: 'developer', description: 'Generate MD5, SHA1, SHA256 hashes', icon: '#️⃣' },
  { id: 'html-encoder', name: 'HTML Encoder', category: 'developer', description: 'Encode/decode HTML entities', icon: '🏷️' },
  { id: 'xml-formatter', name: 'XML Formatter', category: 'developer', description: 'Format and validate XML', icon: '📋' },

  // Content Tools
  { id: 'word-counter', name: 'Word Counter', category: 'content', description: 'Count words, characters, sentences', icon: '📊' },
  { id: 'case-converter', name: 'Case Converter', category: 'content', description: 'Convert text case (uppercase, lowercase, title)', icon: '🔤' },
  { id: 'slug-generator', name: 'Slug Generator', category: 'content', description: 'Generate URL-friendly slugs', icon: '🎯' },
  { id: 'markdown-editor', name: 'Markdown Editor', category: 'content', description: 'Live Markdown to HTML preview', icon: '📝' },
  { id: 'meta-tag-generator', name: 'Meta Tag Generator', category: 'content', description: 'Generate SEO meta tags', icon: '🏷️' },
  { id: 'plagiarism-checker', name: 'Text Duplicate', category: 'content', description: 'Check for duplicate text', icon: '🔍' },

  // Image Tools
  { id: 'qr-code-generator', name: 'QR Code Generator', category: 'image', description: 'Generate QR codes from text', icon: '📲' },
  { id: 'qr-code-decoder', name: 'QR Code Decoder', category: 'image', description: 'Decode QR codes', icon: '🔎' },
  { id: 'color-converter', name: 'Color Converter', category: 'image', description: 'Convert between color formats', icon: '🎨' },
  { id: 'color-palette', name: 'Color Palette', category: 'image', description: 'Generate color palettes', icon: '🌈' },
  { id: 'image-compressor', name: 'Image Compressor', category: 'image', description: 'Compress images without quality loss', icon: '🖼️' },

  // Converter Tools
  { id: 'json-to-csv', name: 'JSON to CSV', category: 'converter', description: 'Convert JSON to CSV format', icon: '📊' },
  { id: 'unit-converter', name: 'Unit Converter', category: 'converter', description: 'Convert between units (length, weight, etc)', icon: '📏' },
  { id: 'temperature-converter', name: 'Temperature Converter', category: 'converter', description: 'Convert between temperature scales', icon: '🌡️' },
  { id: 'password-generator', name: 'Password Generator', category: 'converter', description: 'Generate strong random passwords', icon: '🔑' },
  { id: 'random-generator', name: 'Random Generator', category: 'converter', description: 'Generate random strings and numbers', icon: '🎲' },
];

const CATEGORIES = [
  { id: 'developer', name: 'Developer Tools', icon: '👨‍💻' },
  { id: 'content', name: 'Content Tools', icon: '📝' },
  { id: 'image', name: 'Image Tools', icon: '🎨' },
  { id: 'converter', name: 'Converter Tools', icon: '🔄' },
];

export default function Home() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const filtered = useMemo(() => {
    return TOOLS.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) ||
                          tool.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !category || tool.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Free Online Tools for Everyone
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          25+ free, instant tools for developers, content creators, and more. No login required, no ads interfering with tools, 100% client-side processing.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto">
        <input
          type="search"
          placeholder="Search tools..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => setCategory('')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            !category
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          All Tools
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              category === cat.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Ad Section */}
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          <AdContainer slot="0000000000" format="horizontal" />
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(tool => (
          <Link key={tool.id} href={`/tools/${tool.category}/${tool.id}`}>
            <div className="group bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition cursor-pointer h-full">
              <div className="text-4xl mb-3">{tool.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                {tool.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {tool.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No tools found. Try a different search.
          </p>
        </div>
      )}

      {/* Trust Signals */}
      <div className="grid grid-cols-3 gap-6 py-12 border-t border-gray-200 dark:border-gray-800">
        <div className="text-center">
          <div className="text-3xl mb-2">✅</div>
          <p className="font-semibold text-gray-900 dark:text-white">100% Free</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">No hidden costs</p>
        </div>
        <div className="text-center">
          <div className="text-3xl mb-2">🔒</div>
          <p className="font-semibold text-gray-900 dark:text-white">Private</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">No data uploaded</p>
        </div>
        <div className="text-center">
          <div className="text-3xl mb-2">⚡</div>
          <p className="font-semibold text-gray-900 dark:text-white">Instant</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Instant processing</p>
        </div>
      </div>
    </div>
  );
}
