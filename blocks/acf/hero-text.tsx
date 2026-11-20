import { ImageType, LinkType } from 'lib/types';
import Link from 'next/link';
import { ArrowButtonIcon, ArrowIcon } from 'components/svg';
import { Button, SvgImage } from 'elements';

type DataType = {
	back_link?: LinkType;
	content: string;
	cta: LinkType;
	cta_icon_image?: ImageType;
	heading: string;
	sec_anchor_name?: string;
	stack_content: boolean;
};

const HeroText = async ({ data }: { data: DataType }) => {
	if (!data) return null;

	//__Variables
	const { back_link, content, cta, cta_icon_image, heading, sec_anchor_name } = data || {};

	return (
		<section className='pt-29 md:pt-26 pb-10 md:pb-20 bg-base-gunmetal z-2 relative' id={sec_anchor_name}>
			<div className='wrapper'>
				<div className='md:py-10 lg:px-10'>
					<div className='flex gap-6 md:gap-8 flex-col max-w-230'>
						{back_link?.url ? (
							<Link href={back_link?.url} className='flex gap-2 text-base text-base-creamtone hover:text-white'>
								<ArrowIcon width={20} className='rotate-90 opacity-60' /> {back_link?.title}
							</Link>
						) : null}
						<div className='w-full'>{heading ? <h1 className='h1 text-white' dangerouslySetInnerHTML={{ __html: heading }} /> : null}</div>
						{content || cta?.url ? (
							<div className='flex gap-6 w-full flex-col md:pt-4'>
								{content ? <div className='flex flex-col gap-6 text-white text-base' dangerouslySetInnerHTML={{ __html: content }} /> : null}
								{cta?.url ? (
									<div className='flex grow justify-end items-end max-md:w-full'>
										<Button link={cta} className='btn max-md:w-full'>
											{cta_icon_image ? <SvgImage image={cta_icon_image} className='block w-5' /> : <ArrowButtonIcon width={24} />}
										</Button>
									</div>
								) : null}
							</div>
						) : null}
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroText;
