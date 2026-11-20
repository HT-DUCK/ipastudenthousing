import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		deviceSizes: [375, 480, 640, 960, 1200, 1600, 1920],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'admin.ipastudenthousing.com'
			},
			{
				protocol: 'https',
				hostname: 'media.ipastudenthousing.com'
			}
		]
	},
	eslint: {
		dirs: ['app', 'components', 'blocks', 'layout', 'forms']
	},
	async redirects() {
		return [
			{
				source: '/:path((?!api/preview).*)',
				has: [
					{
						type: 'query',
						key: 'preview',
						value: 'true'
					}
				],
				destination: `/api/preview?secret=${process.env.PREVIEW_TOKEN}&path=:path`,
				permanent: true
			}
		];
	}
};

export default nextConfig;
