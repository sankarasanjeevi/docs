// Turns the markdown in src/content/docs/ into RE_DocsData.tsx, the data file of the
// docs pages on sankarasanjeevi.com (Framer). Run: node scripts/framer-data.mjs
// then paste the output file into Framer's RE_DocsData.tsx (or ask Claude to).
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
const REPO = '.'
const OUT = 'framer-data/docs.json'
const nm = p => pathToFileURL(path.join(REPO, 'node_modules', p)).href
const { unified } = await import(nm('unified/index.js'))
const remarkParse = (await import(nm('remark-parse/index.js'))).default
const remarkGfm = (await import(nm('remark-gfm/index.js'))).default
const remarkRehype = (await import(nm('remark-rehype/index.js'))).default
const rehypeStringify = (await import(nm('rehype-stringify/index.js'))).default

const nav = [
  ['Getting Started', [['About these tools','getting-started/about'],['Installing an extension','getting-started/installation'],['Activating your license','getting-started/licensing']]],
  ['Subtext', [['Overview','subtext/overview'],['Importing captions','subtext/importing'],['Editing captions','subtext/editing'],['Cleanup','subtext/cleanup'],['Review & search','subtext/review-and-search'],['Playback & sync','subtext/playback-and-sync'],['Export & push to Premiere','subtext/output'],['Appearance & settings','subtext/settings']]],
  ['Reference', [['Keyboard shortcuts','reference/keyboard-shortcuts'],['FAQ','reference/faq'],['Changelog','reference/changelog']]],
]
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
const slugify = s => s.replace(/&#x26;/g,'').toLowerCase().replace(/<[^>]+>/g,'').replace(/&amp;/g,'').replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-')
const fixLinks = html => html
  .replace(/href="\/docs\/([^"#]*?)\/?(#[^"]*)?"/g, (m, p, h) => `href="/docs${p ? '/' + p.replace(/\/$/, '') : ''}${h || ''}"`)
  .replace(/href="https:\/\/sankarasanjeevi\.com(\/[^"]*)"/g, 'href="$1"')

async function md2html(src) {
  // asides  :::note[Title] ... :::
  const parts = []
  src = src.replace(/^:::(note|tip|caution|danger)(?:\[([^\]]*)\])?\n([\s\S]*?)\n:::\s*$/gm, (m, kind, title, body) => {
    parts.push({ kind, title: title || (kind === 'tip' ? 'Tip' : 'Note'), body })
    return `ASIDE${parts.length - 1}ASIDE`
  })
  const run = async s => String(await unified().use(remarkParse).use(remarkGfm).use(remarkRehype).use(rehypeStringify).process(s))
  let html = await run(src)
  for (let i = 0; i < parts.length; i++) {
    const a = parts[i]
    const inner = await run(a.body)
    html = html.replace(`<p>ASIDE${i}ASIDE</p>`, `<aside class="re-d-aside ${a.kind}"><p class="re-d-aside-t">${esc(a.title)}</p>${inner}</aside>`)
  }
  return html
}

const pages = []
const headingsOf = html => {
  const hs = []
  html = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (m, lv, inner) => {
    let id = slugify(inner), n = 1, base = id
    while (hs.some(h => h.id === id)) id = base + '-' + (n++)
    hs.push({ id, text: inner.replace(/<[^>]+>/g,'').replace(/&amp;|&#x26;/g,'&'), level: +lv })
    return `<h${lv} id="${id}">${inner}</h${lv}>`
  })
  return { html, hs }
}
for (const [, items] of nav) for (const [label, slug] of items) {
  const raw = fs.readFileSync(path.join(REPO, 'src/content/docs', slug + '.md'), 'utf8').replace(/\r\n/g, '\n')
  const fm = raw.match(/^---\n([\s\S]*?)\n---\n/)
  const meta = Object.fromEntries(fm[1].split('\n').map(l => l.match(/^(\w+):\s*(.*)$/)).filter(Boolean).map(m => [m[1], m[2].replace(/^['"]|['"]$/g, '')]))
  let html = fixLinks(await md2html(raw.slice(fm[0].length)))
  const r = headingsOf(html)
  pages.push({ slug, label, title: meta.title, description: meta.description || '', html: r.html.trim(), headings: r.hs })
}
const data = { nav: nav.map(([g, items]) => ({ group: g, items: items.map(([label, slug]) => ({ label, slug })) })), pages }
fs.mkdirSync('framer-data', { recursive: true })
const d = data
d.home = {
  title: 'Docs',
  tagline: 'Sharp tools for a faster edit. Guides, references, and troubleshooting for every extension.',
  actions: [
    { label: 'About these tools', href: '/docs/getting-started/about', variant: 'accent' },
    { label: 'Get Subtext', href: '/tools/subtext', variant: 'ghost' },
  ],
  start: [
    { title: 'Install an extension', desc: 'Get a .zxp into Premiere Pro.', href: '/docs/getting-started/installation' },
    { title: 'Activate your license', desc: 'One license, up to two computers, works offline.', href: '/docs/getting-started/licensing' },
    { title: 'Subtext overview', desc: 'Edit captions word-by-word inside Premiere Pro.', href: '/docs/subtext/overview' },
    { title: 'Keyboard shortcuts', desc: 'Every gesture and shortcut in one place.', href: '/docs/reference/keyboard-shortcuts' },
  ],
  tools: [
    { title: 'Subtext', status: 'Live', desc: 'A caption editor that lives inside Premiere Pro. Import an SRT, VTT, or CSV, fix the cut and the wording in the panel, then push the result straight back into your Premiere project, ready to drop on your timeline.', linkLabel: 'Read the Subtext docs', href: '/docs/subtext/overview' },
    { title: 'More on the way', status: 'Coming soon', desc: 'More focused Premiere Pro and After Effects extensions are in the works. Their docs will appear here as they ship.', linkLabel: '', href: '' },
  ],
  helpHtml: 'Email <a href="mailto:sankarraknas7272@gmail.com">sankarraknas7272@gmail.com</a> with your Premiere version and a screenshot, or check the <a href="/docs/reference/faq">FAQ</a>.',
}
const src = `/**
 * RE_DocsData: the docs content (sankarasanjeevi.com/docs), GENERATED from the
 * Starlight markdown in Premiere Pro/Premiere Pro CEP Extension Builder/toolninja-docs/
 * src/content/docs/ (the source of truth). Do not hand edit: change the markdown and
 * regenerate. Generated ${new Date().toISOString().slice(0, 10)}.
 */
export interface DocHeading { id: string; text: string; level: number }
export interface DocPage { slug: string; label: string; title: string; description: string; html: string; headings: DocHeading[] }
export interface DocGroup { group: string; items: { label: string; slug: string }[] }

export const DOCS_NAV: DocGroup[] = ${JSON.stringify(d.nav, null, 1)}

export const DOCS_HOME = ${JSON.stringify(d.home, null, 1)}

export const DOCS_PAGES: DocPage[] = ${JSON.stringify(d.pages, null, 1)}
`
fs.writeFileSync('framer-data/RE_DocsData.tsx', src)
console.log(d.pages.length, 'pages, framer-data/RE_DocsData.tsx', src.length, 'chars')
