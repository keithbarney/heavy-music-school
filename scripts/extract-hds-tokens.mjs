/**
 * Extract HDS token declarations from main.css (no component CSS, no @font-face).
 * Writes to src/styles/hds-tokens.css.
 * Skips gracefully if HDS not found (Vercel builds use committed file).
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const hdsPath = resolve(__dirname, '../../../design/heavy-design-system/dist/main.css');
const outPath = resolve(__dirname, '../src/styles/hds-tokens.css');

if (!existsSync(hdsPath)) {
  console.log('HDS not found at', hdsPath, '— using committed hds-tokens.css');
  process.exit(0);
}

const css = readFileSync(hdsPath, 'utf8');

// Extract :root { ... } block (tokens only, lines 58–590 roughly)
const rootMatch = css.match(/:root\s*\{[^}]+\}/s);
// Extract [data-theme="dark"] { ... } block
const darkMatch = css.match(/\[data-theme="dark"\]\s*\{[^}]+\}/s);

if (!rootMatch || !darkMatch) {
  console.error('Could not extract token blocks from HDS');
  process.exit(1);
}

const output = `/* Auto-generated from heavy-design-system/dist/main.css — do not edit */\n\n${rootMatch[0]}\n\n${darkMatch[0]}\n`;

writeFileSync(outPath, output);
console.log('Wrote HDS tokens to', outPath);
