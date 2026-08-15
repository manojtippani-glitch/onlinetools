import Link from 'next/link';

const COLUMNS = [
  {
    heading: 'Developer',
    links: [
      { name: 'JSON Formatter', href: '/tools/developer/json-formatter' },
      { name: 'Base64', href: '/tools/developer/base64-encoder' },
      { name: 'URL Encoder', href: '/tools/developer/url-encoder' },
      { name: 'Regex Tester', href: '/tools/developer/regex-tester' },
    ],
  },
  {
    heading: 'Text',
    links: [
      { name: 'Word Counter', href: '/tools/content/word-counter' },
      { name: 'Case Converter', href: '/tools/content/case-converter' },
      { name: 'Slug Generator', href: '/tools/content/slug-generator' },
      { name: 'Markdown', href: '/tools/content/markdown-editor' },
    ],
  },
  {
    heading: 'Image',
    links: [
      { name: 'QR Code', href: '/tools/image/qr-code-generator' },
      { name: 'Color Converter', href: '/tools/image/color-converter' },
      { name: 'Palette', href: '/tools/image/color-palette' },
      { name: 'Compressor', href: '/tools/image/image-compressor' },
    ],
  },
  {
    heading: 'Convert',
    links: [
      { name: 'JSON to CSV', href: '/tools/converter/json-to-csv' },
      { name: 'Units', href: '/tools/converter/unit-converter' },
      { name: 'Temperature', href: '/tools/converter/temperature-converter' },
      { name: 'Passwords', href: '/tools/converter/password-generator' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 mb-14">
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="eyebrow mb-4">{col.heading}</h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-ink-muted hover:text-ink transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hairline pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[13px] text-ink-subtle">
            Every tool runs locally in your browser. Nothing is uploaded.
          </p>
          <p className="font-mono text-[11px] text-ink-subtle">
            © {new Date().getFullYear()} OnlineTools
          </p>
        </div>
      </div>
    </footer>
  );
}
