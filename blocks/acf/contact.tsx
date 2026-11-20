import { Button, Mapbox, SvgImage } from 'elements';
import { AnimateWrapper } from 'wrappers';
import { ImageType, LinkType, LocationType } from 'lib/types';
import { AmpersatIcon, PhoneSVG, PinIcon } from 'components/svg';
import Link from 'next/link';

type DataType = {
	content?: string;
	cta: LinkType;
	cta_icon_image?: ImageType;
	custom_class?: string;
	email?: string;
	heading?: string;
	heading_tag: string;
	location?: string;
	map?: LocationType;
	phone?: string;
	sec_anchor_name?: string;
	subheading?: string;
};

const Contact = ({ data }: { data: DataType }) => {
	//__Variables
	const { content, cta, cta_icon_image, custom_class, email, heading, heading_tag, location, map, phone, sec_anchor_name, subheading } = data || {};

	if (!data) return null;
	return (
		<section className={`my-10 md:my-28${custom_class ? ` ${custom_class}` : ''}`} id={sec_anchor_name}>
			<div className='wrapper wrapper-sm flex flex-col gap-8 md:gap-10'>
				{subheading || heading || content || cta?.url ? (
					<div className='flex flex-col items-start gap-8 md:gap-10 md:items-center md:text-center'>
						{subheading ? (
							<AnimateWrapper animate_type='fadeup' element='div' className='' threshold={0}>
								<span className='subheading' dangerouslySetInnerHTML={{ __html: subheading }} />
							</AnimateWrapper>
						) : null}
						{heading ? (
							<AnimateWrapper animate_type='fadeup' element={heading_tag} className=''>
								<span dangerouslySetInnerHTML={{ __html: heading }} />
							</AnimateWrapper>
						) : null}
						{content ? (
							<AnimateWrapper animate_type='fadeup' element='div' className='' threshold={0}>
								<div className='' dangerouslySetInnerHTML={{ __html: content }} />
							</AnimateWrapper>
						) : null}
						{cta?.url ? (
							<AnimateWrapper animate_type='fadeup' element='div'>
								<Button link={cta} className='btn'>
									{cta_icon_image ? <SvgImage image={cta_icon_image} className='' /> : null}
								</Button>
							</AnimateWrapper>
						) : null}
					</div>
				) : null}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-3 text-center  text-black'>
					{email ? (
						<AnimateWrapper animate_type='fadeup' element='div' threshold={0}>
							<Link href={`mailto:${email}`} target='_blank' className='border-solid border-black/10 border rounded-3xl px-6 py-8 transition-ease flex flex-col gap-3 items-center  hover:border-black'>
								<span className='text-xs flex gap-1 items-center'>
									<AmpersatIcon width={20} className='opacity-60' />
									Email
								</span>
								{email}
							</Link>
						</AnimateWrapper>
					) : null}
					{phone ? (
						<AnimateWrapper animate_type='fadeup' element='div' threshold={0}>
							<Link href={`tel:${phone}`} target='_blank' className='border-solid border-black/10 border rounded-3xl px-6 py-8 transition-ease flex flex-col gap-3 items-center hover:border-black'>
								<span className='text-xs flex gap-1 items-center'>
									<PhoneSVG width={20} /> Phone
								</span>
								{phone}
							</Link>
						</AnimateWrapper>
					) : null}
					{location ? (
						<AnimateWrapper animate_type='fadeup' className='col-span-full' element='div' threshold={0}>
							<Link href={`https://www.google.com/maps/search/?api=1&query=${location}`} target='_blank' className='border-solid border-black/10 border rounded-3xl px-6 py-8 transition-ease flex flex-col gap-3 items-center  hover:border-black'>
								<span className='text-xs flex gap-1 items-center'>
									<PinIcon width={20} />
									Location
								</span>
								{location}
							</Link>
						</AnimateWrapper>
					) : null}
				</div>
				{map ? <Mapbox accessToken={process.env.NEXT_PUBLIC_MAPBOXGL_ACCESS_TOKEN || ''} center={[-112.0308183, 33.5100015]} className='h-[230px] overflow-hidden relative rounded-3xl md:h-[600px]' locations={[map]} /> : null}
			</div>
		</section>
	);
};

export default Contact;
