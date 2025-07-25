#!/usr/bin/env node
// scripts/generate-barrels.js

const fs   = require('fs');
const path = require('path');

// === helper: kebab/ampersand/etc → PascalCase ===
function pascalCase(str) {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^([a-z])/,         (_, chr) => chr.toUpperCase());
}

// === generate an index.ts in `dir` that re-exports everything in it ===
function generateBarrel(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const lines = [];

  entries.forEach(e => {
    const name = e.name;
    if (e.isDirectory()) {
      lines.push(
        `export * as ${pascalCase(name)} from './${name}';`
      );
    }
    else if (e.isFile() && name.endsWith('.tsx')) {
      const base = name.replace(/\.tsx$/, '');
      lines.push(
        `export { default as ${pascalCase(base)} } from './${base}';`
      );
    }
  });

  fs.writeFileSync(
    path.join(dir, 'index.ts'),
    lines.join('\n') + '\n'
  );
}

// === main: barrel root + each subfolder ===
const root = path.resolve(__dirname, '../app/components');
generateBarrel(root);

fs.readdirSync(root, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .forEach(d => generateBarrel(path.join(root, d.name)));

console.log('✅ Barrel files generated in app/components and all its subfolders.');
