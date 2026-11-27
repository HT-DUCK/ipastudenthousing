import { getThemeOptions } from 'lib/data';
import type { Metadata } from 'next';
import type { ScriptType } from 'lib/types';
import Script from 'next/script';
import parse from 'html-react-parser';
import Header from 'layout/header/header';
import Footer from 'layout/footer';
import RequestBlock from 'components/request-bov-modal';
import localFont from 'next/font/local';
import './_styles/base.css';

export const metadata: Metadata = {
	title: 'IPA',
	description: 'IPA'
};

const montserrat = localFont({
	src: [
		{
			path: '../public/fonts/Montserrat-Regular.woff',
			weight: '400',
			style: 'normal'
		},
		{
			path: '../public/fonts/Montserrat-Medium.woff',
			weight: '500',
			style: 'normal'
		},
		{
			path: '../public/fonts/Montserrat-SemiBold.woff',
			weight: '600',
			style: 'normal'
		},
		{
			path: '../public/fonts/Montserrat-Bold.woff',
			weight: '700',
			style: 'normal'
		},
		{
			path: '../public/fonts/Montserrat-Regular.woff2',
			weight: '400',
			style: 'normal'
		},
		{
			path: '../public/fonts/Montserrat-Medium.woff2',
			weight: '500',
			style: 'normal'
		},
		{
			path: '../public/fonts/Montserrat-SemiBold.woff2',
			weight: '600',
			style: 'normal'
		},
		{
			path: '../public/fonts/Montserrat-Bold.woff2',
			weight: '700',
			style: 'normal'
		}
	],
	variable: '--montserrat'
});

const georgia = localFont({
	src: [
		{
			path: '../public/fonts/Georgia.woff',
			weight: '400',
			style: 'normal'
		},
		{
			path: '../public/fonts/Georgia.woff2',
			weight: '400',
			style: 'normal'
		}
	],
	variable: '--georgia'
});

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
	//__Data
	const theme_options = await getThemeOptions();

	//Variables
	const { script_tags, head_tag_analytics, body_tag_analytics_top, body_tag_analytics_bottom, request_form } = theme_options || {};

	return (
		<html lang='en' className={`scroll-smooth ${montserrat.variable} ${georgia.variable}`}>
			<head>
				{script_tags ? script_tags.map((item: ScriptType, index: number) => (item.type === 'code' && item.code ? <Script key={`script-code-${index}`} id={`script-code-${index}`} dangerouslySetInnerHTML={{ __html: item.code }} strategy={item.strategy} /> : item.type === 'source' && item.source ? <Script key={`script-source-${index}`} src={item.source} strategy={item.strategy} /> : null)) : null}
				{head_tag_analytics && parse(head_tag_analytics)}
			</head>
			<body className='body '>
				{body_tag_analytics_top && parse(body_tag_analytics_top)}
				<div className='master overflow-clip'>
					<Header />
					<main role='main'>{children}</main>
					<Footer />
					{request_form ? <RequestBlock form={request_form} /> : null}
				</div>
				{body_tag_analytics_bottom && parse(body_tag_analytics_bottom)}
			</body>
		</html>
	);
};
export default RootLayout;
