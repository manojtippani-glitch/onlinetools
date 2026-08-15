export const TOOLS_METADATA = {
  // Developer Tools
  'json-formatter': {
    title: 'JSON Formatter & Validator - Format JSON Online',
    description: 'Format, validate, and minify JSON with custom indentation. Free online tool with pretty printing. 100% client-side processing.',
    keywords: 'json formatter, json validator, json beautifier, format json online, minify json',
  },
  'base64-encoder': {
    title: 'Base64 Encoder/Decoder - Encode & Decode Online',
    description: 'Encode text to Base64 or decode Base64 strings. Free online Base64 encoder/decoder tool. 100% client-side.',
    keywords: 'base64 encoder, base64 decoder, encode base64, decode base64, base64 online',
  },
  'url-encoder': {
    title: 'URL Encoder/Decoder - Encode URLs Safely Online',
    description: 'Encode text to URL-safe format or decode encoded URLs. Free online URL encoder/decoder tool.',
    keywords: 'url encoder, url decoder, encode url, decode url, url safe encoding',
  },
  'code-beautifier': {
    title: 'Code Beautifier - Format & Beautify Code Online',
    description: 'Format and beautify code with proper indentation. Supports JavaScript, JSON, HTML, XML. Free online code formatter.',
    keywords: 'code beautifier, code formatter, format code, beautify code, pretty print code',
  },
  'regex-tester': {
    title: 'Regex Tester - Test Regular Expressions Online',
    description: 'Test and validate regular expressions against test strings. Real-time regex matching with flags support.',
    keywords: 'regex tester, regular expression tester, test regex, regex validator, pattern tester',
  },
  'hash-generator': {
    title: 'Hash Generator - Generate Text Hashes Online',
    description: 'Generate hash values for text. Simple hash functions for demonstration. Free online hash generator.',
    keywords: 'hash generator, text hash, generate hash, hash online, hash function',
  },
  'html-encoder': {
    title: 'HTML Entity Encoder/Decoder - Encode HTML Safely',
    description: 'Encode and decode HTML entities safely. Convert special characters to HTML entities and vice versa.',
    keywords: 'html encoder, html decoder, html entity, encode html, decode html',
  },
  'xml-formatter': {
    title: 'XML Formatter - Format & Validate XML Online',
    description: 'Format and validate XML with proper indentation. Free online XML formatter and validator tool.',
    keywords: 'xml formatter, xml validator, format xml, validate xml, xml beautifier',
  },

  // Content Tools
  'word-counter': {
    title: 'Word Counter - Count Words, Characters & More',
    description: 'Count words, characters, sentences, paragraphs in real-time. Free online word counter and text statistics tool.',
    keywords: 'word counter, character counter, word counter online, text statistics, count words',
  },
  'case-converter': {
    title: 'Case Converter - Convert Text Case Online',
    description: 'Convert text between different cases: uppercase, lowercase, title case, camelCase, snake_case, kebab-case.',
    keywords: 'case converter, text case converter, uppercase converter, lowercase converter, camelcase',
  },
  'slug-generator': {
    title: 'Slug Generator - Generate URL-Friendly Slugs',
    description: 'Generate URL-friendly slugs from text. Create clean URLs for web pages and content. Free online slug generator.',
    keywords: 'slug generator, url slug generator, generate slug, url friendly slug, permalink',
  },
  'markdown-editor': {
    title: 'Markdown Editor - Live Markdown to HTML Preview',
    description: 'Write markdown and see live HTML preview. Free online markdown editor with real-time conversion.',
    keywords: 'markdown editor, markdown to html, live markdown preview, markdown converter',
  },
  'meta-tag-generator': {
    title: 'Meta Tag Generator - Generate SEO Meta Tags',
    description: 'Generate SEO meta tags for your website. Create title, description, and social meta tags. Free tool.',
    keywords: 'meta tag generator, seo meta tags, meta description generator, open graph tags',
  },
  'plagiarism-checker': {
    title: 'Text Duplicate Checker - Check for Duplicate Text',
    description: 'Check for duplicate text and analyze uniqueness. Free online text duplicate checker and plagiarism detector.',
    keywords: 'plagiarism checker, duplicate text checker, text similarity, plagiarism detector',
  },

  // Image Tools
  'qr-code-generator': {
    title: 'QR Code Generator - Generate QR Codes Online',
    description: 'Generate QR codes from text or URLs. Free online QR code generator with customizable output.',
    keywords: 'qr code generator, generate qr code, qr code maker, qr code creator',
  },
  'qr-code-decoder': {
    title: 'QR Code Decoder - Decode QR Codes Online',
    description: 'Decode and read QR codes from images. Free online QR code decoder and reader tool.',
    keywords: 'qr code decoder, decode qr code, read qr code, qr code reader',
  },
  'color-converter': {
    title: 'Color Converter - Convert Between Color Formats',
    description: 'Convert colors between HEX, RGB, HSL formats. Free online color converter with live preview.',
    keywords: 'color converter, hex to rgb, rgb converter, color code converter, color format',
  },
  'color-palette': {
    title: 'Color Palette Generator - Generate Color Palettes',
    description: 'Generate beautiful color palettes. Free online color palette generator with hex codes.',
    keywords: 'color palette generator, palette generator, color scheme generator, palette creator',
  },
  'image-compressor': {
    title: 'Image Compressor - Compress Images Without Quality Loss',
    description: 'Compress images without losing quality. Free online image compressor for JPG, PNG, WebP.',
    keywords: 'image compressor, compress image, image optimizer, reduce image size, image minifier',
  },

  // Converter Tools
  'json-to-csv': {
    title: 'JSON to CSV Converter - Convert JSON to CSV Online',
    description: 'Convert JSON data to CSV format. Free online JSON to CSV converter tool.',
    keywords: 'json to csv, convert json to csv, json csv converter, json to csv online',
  },
  'unit-converter': {
    title: 'Unit Converter - Convert Between Units Online',
    description: 'Convert between different units: length, weight, volume, temperature. Free online unit converter.',
    keywords: 'unit converter, convert units, length converter, weight converter, measurement converter',
  },
  'temperature-converter': {
    title: 'Temperature Converter - Convert Temperature Scales',
    description: 'Convert between Celsius, Fahrenheit, and Kelvin. Free online temperature converter tool.',
    keywords: 'temperature converter, celsius to fahrenheit, convert temperature, temperature calculator',
  },
  'password-generator': {
    title: 'Password Generator - Generate Strong Random Passwords',
    description: 'Generate secure random passwords with customizable length and character sets. Free online password generator.',
    keywords: 'password generator, random password generator, strong password, secure password',
  },
  'random-generator': {
    title: 'Random Generator - Generate Random Numbers & Strings',
    description: 'Generate random numbers and strings. Free online random data generator tool.',
    keywords: 'random generator, random number generator, random string generator, random data',
  },
};

export function getToolMetadata(toolId: string) {
  return TOOLS_METADATA[toolId as keyof typeof TOOLS_METADATA] || {
    title: 'OnlineTools - Free Online Tools',
    description: 'Free online tools for developers, content creators, and more.',
    keywords: 'online tools, free tools, developer tools',
  };
}
