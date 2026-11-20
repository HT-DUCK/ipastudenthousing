import Image from 'next/image';
import { AnimateWrapper } from 'wrappers';
import { ImageType } from 'lib/types';

type ItemType = {
	image?: ImageType;
	options?: {
		center?: boolean;
		display?: 'block' | 'inline';
		border_radius?: boolean;
		drop_shadow?: boolean;
	};
	caption?: string | TrustedHTML;
};
type DataType = {
	custom_class?: string;
	sec_anchor_name?: string;
	images?: Array<ItemType>;
	center_images?: boolean;
};

const Images = ({ data }: { data: DataType }) => {
	//__Variables
	const { custom_class, sec_anchor_name, images, center_images } = data || {};

	if (!data) return null;
	return (
		<section className={`gutter-x my-16 lg:my-24${custom_class ? ` ${custom_class}` : ''}`} id={sec_anchor_name}>
			{images?.length ? (
				<div className={`inner relative${center_images ? ' text-center' : ''}`}>
					{images.map((item) => {
						const { image, options, caption } = item || {};

						if (!image?.id || !image?.url) return null;
						return (
							<AnimateWrapper key={`images_${image.id}`} animate_type='fadeup' element='div' className={`${options?.center ? 'mx-auto' : ''} ${options?.display === 'inline' ? 'inline' : 'block'}${options?.border_radius ? ' rounded-xl' : ''}${options?.drop_shadow ? ' shadow-xl' : ''}`}>
								<Image src={image.url} alt={image.alt} width={image.width} height={image.height} />
								{caption ? <h5 className='mt-2' dangerouslySetInnerHTML={{ __html: caption }} /> : null}
							</AnimateWrapper>
						);
					})}
				</div>
			) : null}
		</section>
	);
};

export default Images;
