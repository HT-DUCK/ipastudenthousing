'use client';
import { useState, useEffect, JSX, Suspense, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { SvgImage } from 'elements';
import { useScroll, useWindowSize } from 'lib/hooks';
import { ImageType } from 'lib/types';

import { ArrowRequest, BurgerOpenIcon, BurgerCloseIcon } from 'components/svg';

import HeaderMobileMenu from './header-mobile-menu';

const HeaderContent = ({ header_logo_dark_image, header_logo_image, children }: { header_logo_dark_image: ImageType; header_logo_image: ImageType; children: JSX.Element }) => {
	const pathname = usePathname();

	const memoizedChildren = useMemo(() => children, []);

	//__Hooks
	const [scrollPosition] = useScroll();
	const windowSize = useWindowSize();

	//__State
	const [isScrolled, setIsScrolled] = useState<boolean | null>(null);
	const [isOpenedMobileMenu, setIsOpenedMobileMenu] = useState(false);
	const [isTablet, setIsTablet] = useState<boolean | null>(null);

	//__Use Effects
	useEffect(() => {
		if (typeof scrollPosition === 'number' && scrollPosition >= 10) {
			setIsScrolled(true);
		} else {
			setIsScrolled(false);
		}
	}, [scrollPosition, windowSize]);

	useEffect(() => {
		if (windowSize && windowSize[0] !== null && windowSize[0] < 1024) {
			setIsTablet(true);
		} else {
			setIsTablet(false);
		}
	}, [windowSize]);

	useEffect(() => {
		setIsOpenedMobileMenu(false);
	}, [pathname]);

	if (windowSize === null) {
		return null;
	}

	return isTablet !== null ? (
		<header className={`fixed w-full top-0 left-0 z-50 py-4 md:py-5 ${isScrolled ? 'bg-[#242C32] scrolled-menu' : ''} transition-colors duration-500 header-animation`}>
			<div className='wrapper max-w-[1400px]'>
				<div className='relative flex justify-between items-center mx-auto lg:mx-auto'>
					{header_logo_image ? (
						<Link href='/' className='relative'>
							<SvgImage className={`block max-w-45 opacity-1 transition-opacity duration-500 ${isOpenedMobileMenu && isTablet ? 'opacity-0' : 'opacity-100'}`} image={header_logo_image} />
							<SvgImage className={`block absolute top-0 left-0 w-full h-full z-10 transition-opacity duration-500 ${isOpenedMobileMenu && isTablet ? 'opacity-`100' : 'opacity-0'}`} image={header_logo_dark_image} />
						</Link>
					) : null}
					{!isTablet ? <div className='header-menu'>{memoizedChildren}</div> : null}
					<div className='flex justify-end items-center gap-1'>
						{isTablet ? (
							<button className={`btn small ${isOpenedMobileMenu ? 'border_secondary' : 'border'} only-arrow`} type='button' onClick={() => setIsOpenedMobileMenu(!isOpenedMobileMenu)}>
								{isOpenedMobileMenu ? <BurgerCloseIcon width={24} /> : <BurgerOpenIcon width={24} />}
							</button>
						) : null}
						{!isTablet ? <div className='resources-menu'>{memoizedChildren}</div> : null}
						<a href='#request-bov' className='secondary-hover btn small max-md:!hidden' type='button'>
							Request a BOV
						</a>
					</div>
					{isOpenedMobileMenu && isTablet ? (
						<HeaderMobileMenu>
							{memoizedChildren}
							<a href='#request-bov' className='btn mx-auto my-6 justify-center md:w-max' type='button'>
								<ArrowRequest width={24} />
								Request a BOV
							</a>
						</HeaderMobileMenu>
					) : null}
				</div>
			</div>
		</header>
	) : null;
};

const HeaderWithSuspense = (props: any) => (
	<Suspense fallback={<div>Loading...</div>}>
		<HeaderContent {...props} />
	</Suspense>
);

export default HeaderWithSuspense;
