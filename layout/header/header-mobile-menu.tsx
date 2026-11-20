import { useEffect } from 'react';

const HeaderMobileMenu = ({ children }: { children: React.ReactNode }) => {
	useEffect(() => {
		document.body.classList.add('overflow-hidden');

		return () => {
			document.body.classList.remove('overflow-hidden');
		};
	}, []);
	return (
		<div className='fixed top-0 left-0 h-[calc(100dvh-8px)] bg-white w-full pt-19 -z-1'>
			<div className='px-10 dark_menu mobile_menu'>{children}</div>
		</div>
	);
};
export default HeaderMobileMenu;
