'use client';
import { usePathname } from 'next/navigation';

type NavItemWrapperType = {
	children?: React.ReactNode;
	className?: string;
	id?: string;
	url: string;
};

const NavItemWrapper = ({ children, className, id, url }: NavItemWrapperType) => {
	//__Hooks
	const pathname = usePathname();

	//__Variables
	const last_index_slash = pathname.lastIndexOf('/');
	const current_cat_path = pathname.substring(0, last_index_slash);

	return (
		<li className={`${className}${pathname === url || current_cat_path === url ? ' current' : ''}`} id={id}>
			{children}
		</li>
	);
};
export default NavItemWrapper;
