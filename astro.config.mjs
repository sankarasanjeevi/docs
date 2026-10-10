// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	// GitHub Pages project site. Repo renamed toolninja-docs -> docs on 2026-10-10
	// (Tool Ninja retired). The old address is kept alive by a separate redirect-only
	// repo named toolninja-docs. Keys below are base-relative; targets carry the base.
	site: 'https://sankarasanjeevi.github.io',
	base: '/docs',
	// CutCap was renamed Subtext (2026-07). Keep every old /cutcap/ URL alive —
	// they are linked from the Gumroad page and shipped docs.
	redirects: {
		'/cutcap': '/docs/subtext/overview/',
		'/cutcap/overview': '/docs/subtext/overview/',
		'/cutcap/importing': '/docs/subtext/importing/',
		'/cutcap/editing': '/docs/subtext/editing/',
		'/cutcap/cleanup': '/docs/subtext/cleanup/',
		'/cutcap/review-and-search': '/docs/subtext/review-and-search/',
		'/cutcap/playback-and-sync': '/docs/subtext/playback-and-sync/',
		'/cutcap/output': '/docs/subtext/output/',
		'/cutcap/settings': '/docs/subtext/settings/',
		// MOGRT push is not part of the shipping product — send it to the export page.
		'/cutcap/mogrts': '/docs/subtext/output/',
		// "What is Tool Ninja?" became "About" with the rebrand.
		'/getting-started/what-is-tool-ninja': '/docs/getting-started/about/',
	},
	integrations: [
		starlight({
			title: 'Sankarasanjeevi Docs',
			description:
				"Documentation for Sankarasanjeevi's Premiere Pro and After Effects extensions — focused tools that live right in your workflow.",
			tagline: 'Docs for my Premiere Pro and After Effects extensions',
			customCss: ['./src/styles/theme.css'],
			social: [
				{ icon: 'external', label: 'Tools', href: 'https://sankarasanjeevi.com/tools' },
			],
			editLink: {
				baseUrl: 'https://github.com/sankarasanjeevi/docs/edit/main/',
			},
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'About these tools', slug: 'getting-started/about' },
						{ label: 'Installing an extension', slug: 'getting-started/installation' },
						{ label: 'Activating your license', slug: 'getting-started/licensing' },
					],
				},
				{
					label: 'Subtext',
					items: [
						{ label: 'Overview', slug: 'subtext/overview' },
						{ label: 'Importing captions', slug: 'subtext/importing' },
						{ label: 'Editing captions', slug: 'subtext/editing' },
						{ label: 'Cleanup', slug: 'subtext/cleanup' },
						{ label: 'Review & search', slug: 'subtext/review-and-search' },
						{ label: 'Playback & sync', slug: 'subtext/playback-and-sync' },
						{ label: 'Export & push to Premiere', slug: 'subtext/output' },
						{ label: 'Appearance & settings', slug: 'subtext/settings' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'Keyboard shortcuts', slug: 'reference/keyboard-shortcuts' },
						{ label: 'FAQ', slug: 'reference/faq' },
						{ label: 'Changelog', slug: 'reference/changelog' },
					],
				},
			],
		}),
	],
});
