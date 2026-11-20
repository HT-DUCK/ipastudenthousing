import { LinkType } from 'lib/types';
import { ArrowRequest } from 'components/svg';
import { Button } from 'elements';

const HeroMainBlock = ({ title, description, hero_button }: { title: string; description: string; hero_button: LinkType }) => (
	<>
		<div className='w-full h-max px-5 py-10 flex flex-col justify-end gap-6 text-white min-h-[100dvh] md:min-h-[0] md:flex-row md:justify-between md:px-10 m-auto md:py-20'>
			<div className='md:w-full md:max-w-150'>
				<h1 className='h1' dangerouslySetInnerHTML={{ __html: title }} />
				{description ? <p dangerouslySetInnerHTML={{ __html: description }} className='mt-6' /> : null}
				{hero_button ? (
					<Button link={hero_button} className='btn mt-6 w-max'>
						<ArrowRequest width={24} />
					</Button>
				) : null}
			</div>
		</div>
	</>
);

export default HeroMainBlock;
