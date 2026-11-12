import fs from 'fs';
import path from 'path';

function getFiles(dir, match) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath, match));
    } else if (file.endsWith(match)) {
      results.push(fullPath);
    }
  });
  return results;
}

const pageFiles = getFiles('src/app', 'page.tsx');
const pages = pageFiles.map(p => {
  let rel = p.replace(/^src[\\\/]app/, '').replace(/[\\\/]page\.tsx$/, '');
  rel = rel.replace(/\\/g, '/');
  return rel === '' ? '/' : rel;
});

console.log('--- RECON: TOTAL APP ROUTE PAGES (' + pages.length + ') ---');
pages.sort().forEach(p => console.log('  Page:', p));

const codeFiles = [...getFiles('src', '.tsx'), ...getFiles('src', '.ts')];
// Matches href="/path" or href={'/path'} or href={`/path...`}
const hrefRegex = /href\s*=\s*(?:\{?\s*["'`](\/[^"'`\s]*)["'`]\s*\}?)/g;
const routerRegex = /router\.(?:push|replace)\s*\(\s*["'`](\/[^"'`\s]*)["'`]/g;

const linkSources = new Map();

for (const file of codeFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = hrefRegex.exec(content)) !== null) {
    const raw = m[1];
    const basePath = raw.split('?')[0].split('#')[0];
    if (!linkSources.has(basePath)) linkSources.set(basePath, new Set());
    linkSources.get(basePath).add(file);
  }
  while ((m = routerRegex.exec(content)) !== null) {
    const raw = m[1];
    const basePath = raw.split('?')[0].split('#')[0];
    if (!linkSources.has(basePath)) linkSources.set(basePath, new Set());
    linkSources.get(basePath).add(file);
  }
}

console.log('\n--- RECON: UNIQUE INTERNAL TARGET PATHS FOUND IN CODE (' + linkSources.size + ') ---');
const uniqueBasePaths = [...linkSources.keys()].sort();
uniqueBasePaths.forEach(p => console.log('  Target:', p));

const nonExistent = [];
for (const basePath of uniqueBasePaths) {
  // If target contains ${, skip dynamic template
  if (basePath.includes('${')) continue;
  let exists = pages.includes(basePath);
  if (!exists) {
    for (const page of pages) {
      if (page.includes('[')) {
        const regexStr = '^' + page.replace(/\[\.\.\.[^\]]+\]/g, '.*').replace(/\[[^\]]+\]/g, '[^/]+') + '$';
        if (new RegExp(regexStr).test(basePath)) {
          exists = true;
          break;
        }
      }
    }
  }
  if (!exists) {
    nonExistent.push({
      basePath,
      sources: [...linkSources.get(basePath)]
    });
  }
}

console.log('\n--- RECON: FLAGGED DEAD OR UNMATCHED LINKS (' + nonExistent.length + ') ---');
nonExistent.forEach(item => {
  console.log(`  Target: ${item.basePath}`);
  item.sources.forEach(s => console.log(`     From: ${s}`));
});
