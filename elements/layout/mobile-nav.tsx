'use client';
import { useEffect, useState } from 'react';
import HamburgerNav from '../hamburger-nav';

type MobileNavType = {
	children?: React.ReactNode;
	className?: string;
	hamburger_className?: string;
	scroll_top?: boolean;
};

const MobileNav = ({ children, className = '', hamburger_className = '', scroll_top = false }: MobileNavType) => {
	//__State
	const [open, setOpen] = useState(false);

	//__Functions
	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
		const el = (e.target as HTMLElement).closest('a[href], button, [role="button"], .toggle_element');
		if (el?.tagName === 'A') setOpen(false);
	};

	//__Effects
	useEffect(() => {
		if (open) {
			document.documentElement.style.overflow = 'hidden';
			document.body.classList.add('mobile_nav_open');
			if (scroll_top) {
				window.scrollTo({ top: 0, behavior: 'instant' });
			}
		} else {
			document.documentElement.style.overflow = 'unset';
			document.body.classList.remove('mobile_nav_open');
		}
	}, [open]);

	// Listen for body class changes and sync 'open' state
	useEffect(() => {
		const observer = new MutationObserver(() => {
			const hasClass = document.body.classList.contains('mobile_nav_open');
			setOpen(hasClass);
		});
		observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
		return () => observer.disconnect();
	}, []);

	return (
		<>
			<div className={`${className}${open ? ' open' : ''}`} onClick={handleClick}>
				{children}
			</div>
			<HamburgerNav className={hamburger_className} onClick={() => setOpen(!open)} open={open} />
		</>
	);
};

export default MobileNav;
