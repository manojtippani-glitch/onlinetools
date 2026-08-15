export default function Footer() {
  const tools = [
    { name: 'JSON Formatter', href: '/tools/developer/json-formatter' },
    { name: 'Base64 Encoder', href: '/tools/developer/base64-encoder' },
    { name: 'URL Encoder', href: '/tools/developer/url-encoder' },
    { name: 'Code Beautifier', href: '/tools/developer/code-beautifier' },
    { name: 'Word Counter', href: '/tools/content/word-counter' },
    { name: 'Case Converter', href: '/tools/content/case-converter' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-400 text-sm mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4">Developer</h3>
            <ul className="space-y-2">
              <li><a href="/tools/developer/json-formatter" className="hover:text-white transition">JSON Formatter</a></li>
              <li><a href="/tools/developer/base64-encoder" className="hover:text-white transition">Base64 Encoder</a></li>
              <li><a href="/tools/developer/url-encoder" className="hover:text-white transition">URL Encoder</a></li>
              <li><a href="/tools/developer/code-beautifier" className="hover:text-white transition">Code Beautifier</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Content</h3>
            <ul className="space-y-2">
              <li><a href="/tools/content/word-counter" className="hover:text-white transition">Word Counter</a></li>
              <li><a href="/tools/content/case-converter" className="hover:text-white transition">Case Converter</a></li>
              <li><a href="/tools/content/slug-generator" className="hover:text-white transition">Slug Generator</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Image</h3>
            <ul className="space-y-2">
              <li><a href="/tools/image/qr-code-generator" className="hover:text-white transition">QR Code</a></li>
              <li><a href="/tools/image/color-converter" className="hover:text-white transition">Color Converter</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500">© 2026 OnlineTools. All tools are 100% free and client-side processed.</p>
        </div>
      </div>
    </footer>
  );
}
