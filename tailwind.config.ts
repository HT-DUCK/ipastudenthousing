import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}', './layout/**/*.{js,ts,jsx,tsx,mdx}', './blocks/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			spacing: {
				'72': '18rem'
			},
			colors: {
				primary: 'rgba(var(--color-primary), 1)',
				secondary: 'rgba(var(--color-secondary), 1)'
			},
			screens: {
				mobile: { max: '767px' },
				mobilelg: { max: '1023px' }
			}
		}
	},
	plugins: []
};
export default config;
