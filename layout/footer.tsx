import Link from 'next/link';
import { Suspense } from 'react';
import { getGravityForms, getMenus, getThemeOptions } from 'lib/data';
import { Nav } from 'elements/layout';
import GravityForm from 'gravity-forms';
import { LoadingSVG } from 'elements/assets';

import { FacebookIcon, InstagramIcon, XIcon, LinkedinIcon, YoutubeIcon, ArrowSlider } from '../components/svg';

const Footer = async ({}) => {
	const [theme_options, form, footer_menu, footer_menu_short] = await Promise.all([getThemeOptions(), getGravityForms(1), getMenus({ slug: 'footer-menu' }), getMenus({ slug: 'footer-menu-short' })]);
	const { footer_mailing_title, address, phone_number, twitterx, youtube, linkedin, instagram, facebook, footer_copyright } = theme_options || {};
	const currentYear = new Date().getFullYear();

	return (
		<footer className='relative z-2 bg-[#242C32] py-10 lg:py-20 text-base-bronze' id='footer' role='contentinfo'>
			<div className='wrapper flex flex-col gap-10 sm:gap-20'>
				<div className='grid sm:grid-cols-2 gap-10'>
					<div className='flex flex-col gap-7 sm:gap-6 md:pr-10'>
						<h3 className='h4 text-white' dangerouslySetInnerHTML={{ __html: footer_mailing_title }} />
						<Suspense fallback={<LoadingSVG />}>
							<GravityForm form={form} className='footer_form' show_form_title={false} show_invalid_message={false} submit_children={<ArrowSlider width={24} />} />
						</Suspense>
					</div>
					<div className='flex flex-col gap-3'>
						{address ? (
							<div className='flex flex-col gap-6'>
								<p className='text-white'>Address</p>
								<p dangerouslySetInnerHTML={{ __html: address }} />
							</div>
						) : null}
						{phone_number ? (
							<Link href={`tel:${phone_number}`} className='transition-ease hover:text-white '>
								{phone_number}
							</Link>
						) : null}
					</div>
				</div>
				<Nav menu={footer_menu} className='footer_menu' />
				<div className='flex flex-col gap-8 text-white md:items-center'>
					<div className='w-full grid sm:grid-cols-2 gap-10'>
						<div className='flex justify-start gap-3 text-base-bronze'>
							{facebook ? (
								<Link href={facebook} target='_blank' rel='noreferrer' className='hover:text-white flex justify-center items-center '>
									<FacebookIcon width={18} />
								</Link>
							) : null}
							{instagram ? (
								<Link href={instagram} target='_blank' rel='noreferrer' className='hover:text-white flex justify-center items-center '>
									<InstagramIcon width={18} />
								</Link>
							) : null}
							{twitterx ? (
								<Link href={twitterx} target='_blank' rel='noreferrer' className='hover:text-white flex justify-center items-center '>
									<XIcon width={18} />
								</Link>
							) : null}
							{linkedin ? (
								<Link href={linkedin} target='_blank' rel='noreferrer' className='hover:text-white flex justify-center items-center '>
									<LinkedinIcon width={18} />
								</Link>
							) : null}
							{youtube ? (
								<Link href={youtube} target='_blank' rel='noreferrer' className='hover:text-white flex justify-center items-center '>
									<YoutubeIcon width={18} />
								</Link>
							) : null}
						</div>
						<Nav menu={footer_menu_short} className='footer_menu_short' />
					</div>
					<div className='w-full text-xs text-base-bronze opacity-70'>
						<p dangerouslySetInnerHTML={{ __html: footer_copyright }} />
						<p>&copy; {currentYear} Marcus & Millichap. All rights reserved.</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
