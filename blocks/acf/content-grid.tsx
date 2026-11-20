import Link from 'next/link';
import { AnimateWrapper } from 'wrappers';
import { ImageType, LinkType } from 'lib/types';
import Image from 'next/image';

type ItemType = {
	content?: string;
	image?: ImageType;
	link?: LinkType;
	title?: string;
};

type DataType = {
	content?: string;
	custom_class?: string;
	heading?: string;
	items?: Array<ItemType>;
	items_per_row: string | number;
	sec_anchor_name?: string;
};

const ImageGrid = ({ data }: { data: DataType }) => {
	//__Variables
	const { content, custom_class, heading, items, items_per_row, sec_anchor_name } = data || {};
	const basis: any = {
		2: 'lg:basis-[calc(100%/2-40px/2*(2-1))] md:basis-[calc(100%/2-20px/2*(2-1))]',
		3: 'lg:basis-[calc(100%/3-40px/3*(3-1))] md:basis-[calc(100%/3-20px/3*(3-1))]',
		4: 'lg:basis-[calc(100%/4-40px/4*(4-1))] md:basis-[calc(100%/4-20px/4*(4-1))]',
		5: 'lg:basis-[calc(100%/5-40px/5*(5-1))] md:basis-[calc(100%/5-20px/5*(5-1))]'
	};

	if (!data) return null;
	return (
		<section className={`gutter-x my-10 md:my-24 relative${custom_class ? ` ${custom_class}` : ''}`} id={sec_anchor_name}>
			<div className='inner'>
				<div className='text-center'>
					{heading ? (
						<AnimateWrapper animate_type='fadeup' element='h2' className='mb-3 md:mb-10'>
							<span dangerouslySetInnerHTML={{ __html: heading }} />
						</AnimateWrapper>
					) : null}
					{content ? (
						<AnimateWrapper animate_type='fadeup' element='div' className='max-w-[650px] mb-10 mx-auto md:mb-20' threshold={0}>
							<div className='opacity-80' dangerouslySetInnerHTML={{ __html: content }} />
						</AnimateWrapper>
					) : null}
				</div>
				{items?.length ? (
					<div className='flex flex-wrap gap-5 justify-center lg:gap-10 max-md:flex-col'>
						{items?.map((item: ItemType, index: number) => {
							const { content, image, link, title } = item || {};

							return (
								<AnimateWrapper key={`content_grid_${index}`} animate_type='fadeup' className={`flex flex-col group overflow-hidden relative rounded-tr-3xl ${basis[items_per_row]}`} element='div' threshold={0}>
									{image?.url ? (
										<div className={`bg-primary/20 flex h-[260px] items-center justify-center relative transition-ease md:h-[280px]${link?.url ? ' group-hover:scale-110' : ''}`}>
											<Image src={image.url} alt={image.alt} fill className='object-cover' sizes='640px' />
										</div>
									) : null}
									<div className='bg-primary grow p-6 text-white'>
										{title ? <h5 className='mb-1' dangerouslySetInnerHTML={{ __html: title }} /> : null}
										{content ? <div className='opacity-50' dangerouslySetInnerHTML={{ __html: content }} /> : null}
									</div>
									{link?.url ? (
										<Link href={link.url} target={link.target || undefined} className='absolute h-full left-0 top-0 w-full'>
											<span className='hidden'>{title}</span>
										</Link>
									) : null}
								</AnimateWrapper>
							);
						})}
					</div>
				) : null}
			</div>
		</section>
	);
};

export default ImageGrid;
