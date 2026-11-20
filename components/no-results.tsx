import { NoResultIcon } from 'components/svg';

const NoResults = () => (
	<div className='flex flex-col items-center gap-6 relative text-base-gunmetal/50 max-w-[600px] mx-auto text-center'>
		<div className='flex justify-center items-center rounded-4xl w-14 h-14 bg-base-creamtone text-[#989EA3]'>
			<NoResultIcon width={24} />
		</div>
		<h3 className='h2'>Sorry, No Results!</h3>
		<p className=''>The page you are looking for was moved, removed, renamed or might never existed.</p>
	</div>
);

export default NoResults;
