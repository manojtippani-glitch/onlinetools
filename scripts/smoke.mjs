/**
 * Smoke test across every route on a running production build.
 *
 * Checks the server-rendered HTML only — this catches build/render
 * breakage, missing metadata, and wrong status codes. It cannot catch
 * client-side behaviour, which still needs the browser.
 */
const BASE = process.env.BASE || 'http://localhost:3100';

// Usage:
//   npm run build && npx next start -p 3100 &
//   npm run smoke
// Or against the deployed site:
//   BASE=https://your-domain npm run smoke

const TOOLS = [
  ['developer', ['json-formatter','base64-encoder','url-encoder','code-beautifier','regex-tester','hash-generator','html-encoder','xml-formatter','timestamp-converter','jwt-decoder','base-converter']],
  ['content', ['word-counter','case-converter','slug-generator','markdown-editor','meta-tag-generator','plagiarism-checker','text-diff','lorem-ipsum']],
  ['image', ['qr-code-generator','qr-code-decoder','color-converter','color-palette','image-compressor']],
  ['converter', ['json-to-csv','csv-to-json','unit-converter','temperature-converter','password-generator','random-generator']],
];

const routes = [
  '/', '/privacy', '/terms', '/contact', '/sitemap.xml', '/robots.txt',
  ...TOOLS.map(([c]) => `/tools/${c}`),
  ...TOOLS.flatMap(([c, ids]) => ids.map((id) => `/tools/${c}/${id}`)),
];

const fails = [];
let checked = 0;

for (const route of routes) {
  const res = await fetch(BASE + route);
  const body = await res.text();
  checked++;

  const problems = [];
  if (res.status !== 200) problems.push(`status ${res.status}`);

  const isPage = !route.endsWith('.xml') && !route.endsWith('.txt');
  if (isPage) {
    if (!/<h1[^>]*>/.test(body)) problems.push('no <h1>');
    if (!/<title>/.test(body)) problems.push('no <title>');
    if (!/rel="canonical"/.test(body)) problems.push('no canonical');
    // Next injects this marker when a page throws during render.
    if (/__next_error__/.test(body)) problems.push('render error');
    if (/Application error/i.test(body)) problems.push('client exception');
  }

  if (problems.length) fails.push(`${route}\n    ${problems.join(', ')}`);
}

console.log(`checked ${checked} routes`);
if (fails.length) {
  console.log(`\n${fails.length} with problems:\n  ` + fails.join('\n  '));
  process.exitCode = 1;
} else {
  console.log('all clean');
}
