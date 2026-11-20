import type { ImageType } from 'lib/types';
import LogoLines from 'components/logo-lines';
import { AnimateWrapper } from 'wrappers';

type DataType = {
	title: string;
	logos_row_images: ImageType[];
	subtitle: string;
};

const CompanyLogos = ({ data }: { data: DataType }) => {
	if (!data) return null;

	//__Variables
	const { title, subtitle, logos_row_images } = data || {};

	return (
		<section className='py-10 md:py-28 bg-white relative z-2 '>
			<div className='wrapper'>
				<div className='flex flex-col gap-11 md:gap-32 text-center'>
					<AnimateWrapper animate_type='fadeup' element='div' threshold={0} className='flex flex-col gap-6 md:gap-8'>
						{subtitle ? <p className='text-base' dangerouslySetInnerHTML={{ __html: subtitle }} /> : null}
						{title ? <h2 className='h1 text-base-gunmetal' dangerouslySetInnerHTML={{ __html: title }} /> : null}
					</AnimateWrapper>
					{logos_row_images ? <LogoLines logos_row_images={logos_row_images} /> : null}
				</div>
			</div>
		</section>
	);
};

export default CompanyLogos;
