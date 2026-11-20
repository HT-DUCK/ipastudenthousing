import { Button, SvgImage } from 'elements';
import { AnimateWrapper } from 'wrappers';
import Image from 'next/image';
import { ImageType, LinkType } from 'lib/types';
import { ArrowButtonIcon, PlusCircleIcon } from 'components/svg';
import PeopleGridModal from './modal';

export type ItemType = {
	bio?: string;
	facebook?: string;
	image?: ImageType;
	instagram?: string;
	linkedin?: string;
	name: string;
	title?: string;
	twitter_x?: string;
};

type DataType = {
	content?: string;
	cta: LinkType;
	cta_icon_image?: ImageType;
	custom_class?: string;
	heading?: string;
	heading_tag: string;
	people: ItemType[];
	sec_anchor_name?: string;
	subheading?: string;
};

const PeopleGrid = ({ data }: { data: DataType }) => {
	//__Variables
	const { content, cta, cta_icon_image, custom_class, heading, heading_tag, people, sec_anchor_name, subheading } = data || {};

	if (!data) return null;
	return (
		<section id={sec_anchor_name} className={`my-10 md:my-28 ${custom_class ? ` ${custom_class}` : ''}`}>
			<div className='wrapper wrapper-sm'>
				{subheading || heading || content || cta?.url ? (
					<div className={`flex flex-col gap-6 text-center mb-8 md:mb-20`}>
						{subheading ? (
							<AnimateWrapper animate_type='fadeup' element='div' threshold={0}>
								<span dangerouslySetInnerHTML={{ __html: subheading }} />
							</AnimateWrapper>
						) : null}
						{heading ? (
							<AnimateWrapper animate_type='fadeup' element={heading_tag} threshold={0}>
								<span dangerouslySetInnerHTML={{ __html: heading }} />
							</AnimateWrapper>
						) : null}
						{content ? (
							<AnimateWrapper animate_type='fadeup' className='text-content' element='div' threshold={0}>
								<div dangerouslySetInnerHTML={{ __html: content }} />
							</AnimateWrapper>
						) : null}
						{cta?.url ? (
							<AnimateWrapper animate_type='fadeup' className='text-center max-md:w-full' element='div' threshold={0}>
								<Button link={cta} className='btn max-md:w-full'>
									{cta_icon_image ? <SvgImage image={cta_icon_image} className='block w-6 lg:w-8' /> : <ArrowButtonIcon width={24} />}
								</Button>
							</AnimateWrapper>
						) : null}
					</div>
				) : null}
			</div>
			{people?.length ? (
				<div className='flex flex-wrap gap-5 wrapper max-md:flex-col lg:gap-10'>
					{people.map((item, index) => {
						const { image, name, title } = item || {};
						return (
							<PeopleGridModal key={`people-item-${index}`} className='cursor-pointer group h-[560px] overflow-hidden rounded-3xl md:basis-[calc(100%/2-40px/2*(2-1))] lg:basis-[calc(100%/3-40px/3*(3-1))] relative' item={item}>
								{image?.url ? <Image src={image.url} alt={image.alt} fill className='object-cover transition-ease group-hover:scale-110' /> : null}
								<div className='absolute bg-gradient-to-b bottom-0 from-black/0 h-1/2 left-0 opacity-40 to-black w-full' />
								<div className='absolute bottom-8 flex flex-col gap-4 left-0 px-8 w-full'>
									<h2 className='text-white' dangerouslySetInnerHTML={{ __html: name.replace(' ', '<br />') }} />
									<div className='text-base text-white'>{title}</div>
									<div className='cursor-pointer flex gap-2 text-white'>
										<PlusCircleIcon width={24} />
										<div className='text-base'>More</div>
									</div>
								</div>
							</PeopleGridModal>
						);
					})}
				</div>
			) : null}
		</section>
	);
};

export default PeopleGrid;
