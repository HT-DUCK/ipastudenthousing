import Image from 'next/image';
import type { ImageType } from 'lib/types';

const SvgImage = ({ image, className }: { image: ImageType; className?: string }) => (image?.url ? image?.mime_type === 'image/svg+xml' && image?.svg_code ? <span dangerouslySetInnerHTML={{ __html: image.svg_code }} className={className} /> : <Image src={image.url} alt={image.alt} width={image.width} height={image.height} priority={true} className={className} /> : '');

export default SvgImage;
