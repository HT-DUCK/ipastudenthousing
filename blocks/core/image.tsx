import Image from 'next/image';
import parse from 'html-react-parser';
import CoreWrapper from './wrapper';
import { CoreBlockType } from 'lib/types';

const CoreImage = ({ data, page_type, animate = true }: { data: CoreBlockType; page_type?: string; animate?: boolean }) => {
	//__Variables
	const { attrs, innerHTML } = data || {};
	const { image } = attrs || {};

	if (!data) return null;
	return (
		<CoreWrapper animate_type={animate ? 'fadeup' : undefined} attrs={attrs} element='div' element_class='wp_image' page_type={page_type}>
			{image?.url ? <Image src={image.url} alt={image.alt} width={image.width} height={image.height} /> : innerHTML ? parse(innerHTML) : null}
		</CoreWrapper>
	);
};

export default CoreImage;
