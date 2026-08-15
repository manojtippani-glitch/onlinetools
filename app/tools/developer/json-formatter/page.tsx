'use client';

import { useState } from 'react';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import AdContainer from '@/components/shared/AdContainer';

const getLineAndColumn = (input: string, position: number): { line: number; column: number } => {
  let line = 1;
  let column = 1;
  for (let i = 0; i < position && i < input.length; i++) {
    if (input[i] === '\n') {
      line++;
      column = 1;
    } else {
      column++;
    }
  }
  return { line, column };
};

const findErrorPosition = (input: string, message: string): number => {
  // Modern browsers: "Unexpected token ] in JSON at position 113"
  let match = message.match(/at position (\d+)/);
  if (match) return parseInt(match[1]);

  // Fallback: "Unexpected token ] in JSON at position 113"
  match = message.match(/position (\d+)/);
  if (match) return parseInt(match[1]);

  // Chrome/Firefox format: Extract the context from error message
  // Error shows: Unexpected token ']', ..."cript",\n  ]\n}"
  // Find the token in the error message and locate it in input
  const tokenMatch = message.match(/Unexpected token '(.?)'/);
  if (tokenMatch) {
    const token = tokenMatch[1];
    if (token === '') {
      // Handle empty token case (like for ] or })
      return findTokenInInput(input, message, ']') || findTokenInInput(input, message, '}') || -1;
    }
    return input.lastIndexOf(token);
  }

  return -1;
};

const findTokenInInput = (input: string, message: string, token: string): number => {
  // Extract the context after the token from the error message
  // and find the last occurrence of that context in the input
  const contextMatch = message.match(new RegExp('\\' + token + '.*?["}]'));
  if (contextMatch) {
    const context = contextMatch[0];
    // Find where this context appears in the input
    const pos = input.lastIndexOf(context[0]); // Find the token
    if (pos !== -1) {
      return pos;
    }
  }
  // Fallback: just find the last occurrence of the token before any closing bracket
  for (let i = input.length - 1; i >= 0; i--) {
    if (input[i] === token && (i === input.length - 1 || input[i + 1] === '\n' || input[i + 1] === ' ' || input[i + 1] === '\t')) {
      return i;
    }
  }
  return -1;
};

const getDetailedError = (err: Error, input: string): string => {
  const message = err.message;

  // Try to extract position from error message
  const position = findErrorPosition(input, message);
  const lineInfo = position !== -1 ? getLineAndColumn(input, position) : null;
  const lineNumber = lineInfo ? `Line ${lineInfo.line}, Column ${lineInfo.column}` : 'Line unknown';

  if (message.includes('Unexpected token') && message.includes(']')) {
    return `✗ Trailing comma error at ${lineNumber}: Remove the comma before ] or }. JSON doesn't allow trailing commas in arrays or objects.`;
  }

  if (message.includes('Unexpected token') && message.includes('}')) {
    return `✗ Trailing comma error at ${lineNumber}: Remove the comma before } in your object. JSON doesn't allow trailing commas.`;
  }

  if (message.includes('Unexpected token') && message.includes(':')) {
    return `✗ Missing value at ${lineNumber}: Check for a colon (:) without a value after it.`;
  }

  if (message.includes('Unexpected token') && (message.includes('"') || message.includes("'"))) {
    if (position !== -1) {
      const context = input.substring(Math.max(0, position - 20), position + 20);
      return `✗ Syntax error at ${lineNumber} near: "...${context}...". Check for missing quotes, commas, or brackets.`;
    }
    return `✗ Quote error at ${lineNumber}: Check for mismatched or unclosed quotes.`;
  }

  if (message.includes('Unexpected end')) {
    const lastLine = input.split('\n').length;
    return `✗ Incomplete JSON at line ${lastLine}: Your JSON is cut off. Check that all brackets [] and braces {} are properly closed.`;
  }

  if (message.includes('Unexpected token') && message.includes(',')) {
    return `✗ Unexpected comma at ${lineNumber}: Check for extra commas or commas in wrong positions.`;
  }

  return `✗ Invalid JSON at ${lineNumber}: ${message}`;
};

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indentSize, setIndentSize] = useState(2);
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    setError('');
    setOutput('');

    if (!input.trim()) {
      setError('Please enter JSON to format');
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indentSize);
      setOutput(formatted);
    } catch (err) {
      setError(getDetailedError(err as Error, input));
    }
  };

  const handleMinify = () => {
    setError('');
    setOutput('');

    if (!input.trim()) {
      setError('Please enter JSON to minify');
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
    } catch (err) {
      setError(getDetailedError(err as Error, input));
    }
  };

  const handleValidate = () => {
    setError('');

    if (!input.trim()) {
      setError('Please enter JSON to validate');
      return;
    }

    try {
      JSON.parse(input);
      setError('✓ Valid JSON');
      setOutput('');
    } catch (err) {
      setError(getDetailedError(err as Error, input));
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

  const sampleJSON = JSON.stringify({
    name: 'John Doe',
    age: 30,
    email: 'john@example.com',
    skills: ['JavaScript', 'React', 'TypeScript']
  }, null, 2);

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Developer Tools' }, { label: 'JSON Formatter' }]} />

      <div>
        <h1 className="text-4xl font-bold mb-2">JSON Formatter & Validator</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Format, validate, and minify JSON instantly. No server uploads, 100% client-side processing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="font-semibold text-gray-900 dark:text-white">Input JSON</label>
            <button
              onClick={() => setInput(sampleJSON)}
              className="text-sm px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              Load Sample
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JSON here..."
            className="w-full h-80 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Output Section */}
        <div className="space-y-3">
          <label className="font-semibold text-gray-900 dark:text-white">Output JSON</label>
          <div className="relative">
            {output && (
              <button
                onClick={handleCopy}
                className={`absolute top-3 right-3 z-10 text-sm px-3 py-1 rounded transition ${
                  copied
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            )}
            <div className="w-full h-80 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-mono text-sm overflow-auto">
              {output ? (
                <pre className="text-gray-900 dark:text-gray-100">{output}</pre>
              ) : (
                <p className="text-gray-500">Output will appear here...</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
        <label className="flex items-center gap-2">
          <span className="font-medium text-gray-900 dark:text-white">Indent Size:</span>
          <select
            value={indentSize}
            onChange={(e) => setIndentSize(Number(e.target.value))}
            className="px-3 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={8}>8 spaces</option>
            <option value={1}>1 space (Tab)</option>
          </select>
        </label>
      </div>

      {/* Error/Status Message */}
      {error && (
        <div className={`p-4 rounded-lg ${error.startsWith('✓') ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100' : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100'}`}>
          {error}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleFormat}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Format
        </button>
        <button
          onClick={handleMinify}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium"
        >
          Minify
        </button>
        <button
          onClick={handleValidate}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
        >
          Validate
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
        <AdContainer slot="1111111111" format="horizontal" />
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-gray-200 dark:border-gray-800">
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">✨ Format</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Pretty-print JSON with custom indentation</p>
        </div>
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">🔍 Validate</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Check if your JSON is valid</p>
        </div>
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">📦 Minify</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Compress JSON to smallest size</p>
        </div>
      </div>
    </div>
  );
}
