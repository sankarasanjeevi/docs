// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	// GitHub Pages project site. When a custom domain (docs.toolninja.com) is
	// added, change `site` to the custom domain and remove `base`.
	site: 'https://sankarasanjeevi.github.io',
	base: '/toolninja-docs',
	// CutCap was renamed Subtext (2026-07). Keep every old /cutcap/ URL alive —
	// they are linked from the Gumroad page, the marketing site, and shipped docs.
	redirects: {
		'/cutcap': '/toolninja-docs/subtext/overview/',
		'/cutcap/overview': '/toolninja-docs/subtext/overview/',
		'/cutcap/importing': '/toolninja-docs/subtext/importing/',
		'/cutcap/editing': '/toolninja-docs/subtext/editing/',
		'/cutcap/cleanup': '/toolninja-docs/subtext/cleanup/',
		'/cutcap/review-and-search': '/toolninja-docs/subtext/review-and-search/',
		'/cutcap/playback-and-sync': '/toolninja-docs/subtext/playback-and-sync/',
		'/cutcap/output': '/toolninja-docs/subtext/output/',
		'/cutcap/settings': '/toolninja-docs/subtext/settings/',
		// MOGRT push is not part of the shipping product — send it to the export page.
		'/cutcap/mogrts': '/toolninja-docs/subtext/output/',
	},
	integrations: [
		starlight({
			title: 'Tool Ninja',
			description:
				'Documentation for Tool Ninja — focused Premiere Pro and After Effects extensions that live right in your workflow.',
			tagline: 'Docs for Tool Ninja extensions',
			customCss: ['./src/styles/theme.css'],
			social: [
				{ icon: 'external', label: 'Tools', href: 'https://sankarasanjeevi.com/tools' },
			],
			editLink: {
				baseUrl: 'https://github.com/sankarasanjeevi/toolninja-docs/edit/main/',
			},
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'What is Tool Ninja?', slug: 'getting-started/what-is-tool-ninja' },
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
