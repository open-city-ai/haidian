const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');
const file = path.join(root, 'manifest.json');
const manifest = JSON.parse(fs.readFileSync(file, 'utf8'));
const entries = [
  { path: 'visual/assets/build-v5.js', role: 'verification_script', required: false, language: 'neutral' },
  { path: 'visual/assets/embed-v5-html.js', role: 'verification_script', required: false, language: 'neutral' },
  { path: 'visual/assets/enrich-v5-data.js', role: 'verification_script', required: false, language: 'neutral' },
  { path: 'visual/assets/qa-v5-html.js', role: 'verification_script', required: false, language: 'neutral' },
  { path: 'visual/assets/register-v5-manifest.js', role: 'verification_script', required: false, language: 'neutral' },
  { path: 'visual/assets/two-answers-v5.css', role: 'asset', required: true, language: 'neutral' },
  { path: 'visual/assets/two-answers-v5.js', role: 'asset', required: true, language: 'neutral' },
];

for (const entry of entries) {
  const target = manifest.files.find((item) => item.path === entry.path) || entry;
  Object.assign(target, entry);
  target.sha256 ||= 'pending';
  if (!manifest.files.includes(target)) manifest.files.push(target);
}
manifest.files.sort((a, b) => a.path.localeCompare(b.path));
manifest.generated_at = '2026-08-15T10:00:00Z';
fs.writeFileSync(file, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`registered ${entries.length} V5 build files`);
