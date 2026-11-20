import { LinkType, ImageType } from 'lib/types';
import { AnimateWrapper } from 'wrappers';
import Image from 'next/image';

type ItemType = {
	icon_image: ImageType;
	description: string;
	title: string;
};

type DataType = {
	title: LinkType;
	items: ItemType[];
	sec_anchor_name: string;
};

const CoreValues = async ({ data }: { data: DataType }) => {
	if (!data) return null;

	//__Variables
	const { title, sec_anchor_name, items } = data || {};

	return (
		<section className={`relative z-2 bg-base-gunmetal py-10 md:py-28 text-center`} id={sec_anchor_name}>
			<div className='wrapper'>
				<AnimateWrapper animate_type='fadeup' element='h2' threshold={0} className='h1 text-white'>
					<span dangerouslySetInnerHTML={{ __html: title }} />
				</AnimateWrapper>
				<AnimateWrapper animate_type='fadeup' element='div' threshold={0} className='grid md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-10 md:gap-y-15 mt-8 md:mt-20'>
					{items.map((item, index) => (
						<div key={`numbers-${index}`} className='w-full flex flex-col gap-4 md:gap-6 items-center'>
							{item.icon_image?.url ? (
								<span className='flex items-center justify-center w-[60px] h-[60px] rounded-full bg-main-electric-blue'>
									<Image src={item.icon_image.url} alt={item.icon_image.alt} width={item.icon_image.width} height={item.icon_image.height} />
								</span>
							) : null}
							<h3 className='h4 text-white'>{item.title}</h3>
							<div>{item.description ? <p className='text-base-creamtone max-w-[346px]' dangerouslySetInnerHTML={{ __html: item.description }} /> : null}</div>
						</div>
					))}
				</AnimateWrapper>
			</div>
		</section>
	);
};

export default CoreValues;
