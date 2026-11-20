type HamburgerNavType = {
	className?: string;
	open: boolean;
	onClick?: () => void;
};

const HamburgerNav = ({ className = '', open, onClick }: HamburgerNavType) => (
	<button className={`${className}${open ? ' open' : ''}`} onClick={onClick} role='button' aria-expanded='false'>
		<span style={{ display: 'none' }}>Navigation</span>
		<div className='wrapper'>
			<div className='line line_top' />
			<div className='line line_middle' />
			<div className='line line_bottom' />
		</div>
	</button>
);

export default HamburgerNav;
