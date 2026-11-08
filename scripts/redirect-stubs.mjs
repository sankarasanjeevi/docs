// The docs moved to sankarasanjeevi.com/docs (Framer) on 2026-11-08, as ONE page
// with a section per guide (anchor = slug with / -> -, e.g. #subtext-output).
// This writes redirect-site/: one tiny page per old address, each sending the
// reader to that guide's section; an old in-page hash (#history) maps to the
// section's heading (#subtext-output-history). The deploy workflow
// publishes redirect-site/ instead of the Astro build. The markdown in
// src/content/docs/ stays the source; scripts/framer-data.mjs turns it into
// the Framer data file.
import fs from 'node:fs'
import path from 'node:path'

const NEW = 'https://sankarasanjeevi.com/docs'
const OUT = 'redirect-site'
const slugs = []
const walk = (dir, pre = '') => {
	for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
		if (f.isDirectory()) walk(path.join(dir, f.name), pre + f.name + '/')
		else if (/\.mdx?$/.test(f.name)) slugs.push(pre + f.name.replace(/\.mdx?$/, ''))
	}
}
walk('src/content/docs')

const map = {}
const sec = (slug) => `${NEW}#${slug.split('/').join('-')}`
for (const s of slugs) map[s === 'index' ? '' : s] = s === 'index' ? NEW : sec(s)
// Old addresses Astro used to redirect (CutCap became Subtext; Tool Ninja retired).
for (const p of ['overview', 'importing', 'editing', 'cleanup', 'review-and-search', 'playback-and-sync', 'output', 'settings'])
	map[`cutcap/${p}`] = sec(`subtext/${p}`)
map['cutcap'] = sec('subtext/overview')
map['cutcap/mogrts'] = sec('subtext/output')
map['getting-started/what-is-tool-ninja'] = sec('getting-started/about')

const page = (to, keepHash = true) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>The docs moved</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="${to}">
<meta http-equiv="refresh" content="0; url=${to}">
<script>var t=${JSON.stringify(to)},h=location.hash.slice(1);location.replace(${keepHash ? "h ? (t.indexOf('#') > 0 ? t + '-' + h : t + '#' + h) : t" : 't'})</script>
</head><body><p>The docs moved to <a href="${to}">${to}</a>.</p></body></html>
`
fs.rmSync(OUT, { recursive: true, force: true })
for (const [from, to] of Object.entries(map)) {
	const dir = path.join(OUT, from)
	fs.mkdirSync(dir, { recursive: true })
	fs.writeFileSync(path.join(dir, 'index.html'), page(to))
}
fs.writeFileSync(path.join(OUT, '404.html'), page(NEW, false))
fs.writeFileSync(path.join(OUT, '.nojekyll'), '')
console.log(Object.keys(map).length, 'redirects written to', OUT)
