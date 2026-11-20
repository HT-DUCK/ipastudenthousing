import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import { Metadata } from 'next';
import { getMetaData, getPageBySlug, getPages } from 'lib/data';
import Blocks from 'blocks';
import { PageType } from 'lib/types';
import Link from 'next/link';
import { Button } from 'elements';
import { AnimateWrapper } from 'wrappers';
import { getLabelInfo } from 'utils/getLabelInfo';
import Image from 'next/image';

import SliderFull from 'components/slider-full';

import { CalendarIcon, PinIcon, KeyIcon, BadIcon, DistanceIcon, PriceIcon, ArrowIcon /*, CallIcon*/, ArrowButtonIcon } from 'components/svg';

const Property = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { isEnabled } = await draftMode();
	const slug = (await params).slug;
	const page = await getPageBySlug({ slug, type: 'property', preview: isEnabled });
	if (!page?.id) {
		notFound();
	}

	//__Variables
	const { acf, blocks, id, yoast_json, post_title } = page || {};

	const { hero_slider_images, label_type, subtitle, learn_more, location, location_link, units, Beds, year_built, distance_to_campus, price } = acf || {};

	const labelInfo = getLabelInfo(label_type);

	return (
		<>
			{hero_slider_images.length > 1 ? (
				<SliderFull imagesList={hero_slider_images} />
			) : (
				<div className='min-h-[70dvh] relative'>
					<Image src={hero_slider_images[0].url} alt={hero_slider_images[0].alt} fill className='object-cover' priority={true} />
				</div>
			)}
			<section className='py-10 md:py-28 '>
				<div className='wrapper wraper-sm flex flex-col gap-8 md:gap-10'>
					<AnimateWrapper animate_type='fadeup' element='div' threshold={0}>
						<Link href='/properties' className='flex items-center gap-2 text-base text-base-black-50 hover:text-base-gunmetal'>
							<span className='rotate-90'>
								<ArrowIcon width={20} />
							</span>
							Back to Properties
						</Link>
					</AnimateWrapper>
					<AnimateWrapper animate_type='fadeup' element='div' threshold={0} className='flex flex-col md:gap-6 items-start'>
						{labelInfo ? (
							<div className='text-xs px-4 py-1 rounded-full text-black w-max max-md:text-black' style={{ backgroundColor: labelInfo.color }}>
								{labelInfo.title}
							</div>
						) : null}
						<h1 className='h1 text-base-gunmetal max-md:mt-6'>{post_title}</h1>
						<h5 className='h5  text-base-gunmetal max-md:mt-6'>{subtitle}</h5>
						{location_link && location ? (
							<Link href={location_link} target='_blank' className='text-base flex gap-2 items-start max-md:mt-3 hover:text-black transition-ease'>
								<span className='flex mt-[2px] min-w-5'>
									<PinIcon width={20} />
								</span>
								<p>{location}</p>
							</Link>
						) : null}
						<div className='flex gap-3'>
							{learn_more && label_type !== 'closed' ? (
								<Button link={{ title: 'Learn More', url: learn_more, target: '_blank' }} className='btn btn-blue max-md:mt-6 max-md:w-full max-md:justify-center'>
									<ArrowButtonIcon width={24} />
								</Button>
							) : null}
							{/*<Button link={{ title: 'Schedule a Call', url: '' }} className='btn secondary-hover max-md:mt-6 max-md:w-full max-md:justify-center'>
								<CallIcon width={20} />
							</Button>*/}
						</div>
					</AnimateWrapper>
					<AnimateWrapper animate_type='fadeup' element='div' className='flex lg:flex gap-1 max-lg:flex-wrap md:grid md:grid-cols-2' threshold={0}>
						{units ? (
							<div className='w-full flex flex-col gap-2 items-center px-4 py-8 text-center rounded-3xl border border-solid border-base-black-10'>
								<div className='flex items-center gap-1 text-black text-xs'>
									<span className='min-w-5 flex items-center justify-center'>
										<KeyIcon width={20} />
									</span>
									Units
								</div>
								<h5 className='h5 text-black'>{units}</h5>
							</div>
						) : null}
						{Beds ? (
							<div className='w-full flex flex-col gap-2 items-center px-4 py-8 text-center rounded-3xl border border-solid border-base-black-10'>
								<div className='flex items-center gap-1 text-black text-xs'>
									<span className='min-w-5 flex items-center justify-center'>
										<BadIcon width={20} />
									</span>
									Beds
								</div>
								<h5 className='h5 text-black'>{Beds}</h5>
							</div>
						) : null}
						{year_built ? (
							<div className='w-full flex flex-col gap-2 items-center px-4 py-8 text-center rounded-3xl border border-solid border-base-black-10'>
								<div className='flex items-center gap-1 text-black text-xs'>
									<span className='min-w-5 flex items-center justify-center'>
										<CalendarIcon width={20} className='opacity-60' />
									</span>
									Year Built
								</div>
								<h5 className='h5 text-black'>{year_built}</h5>
							</div>
						) : null}
						{distance_to_campus ? (
							<div className='w-full flex flex-col gap-2 items-center px-4 py-8 text-center rounded-3xl border border-solid border-base-black-10'>
								<div className='flex items-center gap-1 text-black text-xs'>
									<span className='min-w-5 flex items-center justify-center'>
										<DistanceIcon width={20} />
									</span>
									Distance to Campus
								</div>
								<h5 className='h5 text-black'>{distance_to_campus}</h5>
							</div>
						) : null}
						{price ? (
							<div className='w-full flex flex-col gap-2 items-center px-4 py-8 text-center rounded-3xl border border-solid border-base-black-10'>
								<div className='flex items-center gap-1 text-black text-xs'>
									<span className='min-w-5 flex items-center justify-center'>
										<PriceIcon width={20} />
									</span>
									Price
								</div>
								<h5 className='h5 text-black'>{price}</h5>
							</div>
						) : null}
					</AnimateWrapper>

					{blocks && blocks.length ? <Blocks key={id} blocks={blocks} /> : ''}
				</div>
			</section>
			{yoast_json?.schema ? <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(yoast_json.schema) }} /> : ''}
		</>
	);
};

export default Property;

//Generate page params
export async function generateStaticParams() {
	const pages = await getPages({ type: 'property' });
	return pages.map((page: PageType) => ({
		slug: page.slug
	}));
}

//Get Meta Data
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const slug = (await params).slug;

	const page = await getPageBySlug({ slug, type: 'property' });

	if (!page?.yoast_json) return {};
	return getMetaData(page.yoast_json);
}
