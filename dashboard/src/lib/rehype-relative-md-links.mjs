import { visit } from 'unist-util-visit';
import path from 'node:path';
import fs from 'node:fs';

const DOCS_ROOT = path.resolve(process.cwd(), '..', 'docs');
// base 경로. astro.config.mjs의 base와 일치시킬 것 (호스팅 결정 시 함께 변경).
const SITE_BASE = '';

// 더 깊은 경로가 먼저 매칭되도록 순서 유지
const COLLECTION_MAP = [
  { docsPath: '01-claude-code-refine', urlPrefix: 'claude-code' },
  { docsPath: '02-side-projects', urlPrefix: 'projects' },
  { docsPath: '03-ai-arsenal', urlPrefix: 'arsenal' },
];

const DIR_INDEX_FILES = ['_index.md', 'README.md', 'readme.md', 'index.md'];

const isExternal = (href) => /^([a-z][a-z0-9+.-]*:|\/\/)/i.test(href);

function resolveDirIndex(absDir) {
  for (const f of DIR_INDEX_FILES) {
    const p = path.join(absDir, f);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

export default function rehypeRelativeMdLinks() {
  return (tree, file) => {
    const filePath = file?.history?.[0] ?? file?.path;
    if (!filePath) return;

    visit(tree, 'element', (node) => {
      if (node.tagName !== 'a') return;
      const href = node.properties?.href;
      if (typeof href !== 'string' || !href) return;
      if (isExternal(href) || href.startsWith('/') || href.startsWith('#')) return;

      // path[.md][/][?query][#fragment]
      const m = href.match(/^([^#?]+?)(\.md)?(\/?)(\?[^#]*)?(#.*)?$/i);
      if (!m) return;
      const [, basePath, mdExt, trailingSlash, query = '', fragment = ''] = m;

      const isDirectoryLink = !mdExt && trailingSlash;
      const isMdLink = !!mdExt;
      if (!isDirectoryLink && !isMdLink) return;

      const fileDir = path.dirname(filePath);
      let targetAbs = path.resolve(fileDir, basePath);

      if (isDirectoryLink) {
        const indexFile = resolveDirIndex(targetAbs);
        if (!indexFile) return;
        targetAbs = indexFile.replace(/\.md$/i, '');
      }

      const relFromDocs = path
        .relative(DOCS_ROOT, targetAbs)
        .split(path.sep)
        .join('/');

      if (relFromDocs.startsWith('..')) return;

      for (const c of COLLECTION_MAP) {
        if (relFromDocs === c.docsPath || relFromDocs.startsWith(c.docsPath + '/')) {
          const remainder = relFromDocs.slice(c.docsPath.length).replace(/^\//, '');
          const slug = remainder
            .split('/')
            .filter(Boolean)
            .map((s) => s.toLowerCase())
            .join('/');
          const urlPath = slug
            ? `${SITE_BASE}/${c.urlPrefix}/${slug}/`
            : `${SITE_BASE}/${c.urlPrefix}/`;
          node.properties.href = `${urlPath}${query}${fragment}`;
          return;
        }
      }
    });
  };
}
