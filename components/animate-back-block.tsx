'use client';

import { useEffect, useRef, useState } from 'react';

const AnimatedBackBlock = () => {
	const ref = useRef<HTMLDivElement>(null);
	const [transform, setTransform] = useState<string>('scale(1)');
	const [isVisible, setIsVisible] = useState<boolean>(false);

	useEffect(() => {
		if (!ref.current) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting);
			},
			{
				root: null,
				threshold: 0.01
			}
		);

		observer.observe(ref.current);

		return () => {
			if (ref.current) {
				observer.unobserve(ref.current);
			}
		};
	}, []);

	useEffect(() => {
		if (window.innerWidth <= 767) {
			setTransform('scale(1)');
		} else {
			setTransform('scale(0.8)');
		}
	}, []);

	useEffect(() => {
		if (!isVisible || window.innerWidth <= 767) return;
		const handleScroll = () => {
			if (!ref.current) return;

			const rect = ref.current.getBoundingClientRect();
			const windowHeight = window.innerHeight;

			const offsetTop = rect.top;
			const ratio = Math.min(1, Math.max(0, 1 - offsetTop / windowHeight));
			const scale = 0.8 + ratio * 0.2;

			setTransform(`scale(${scale})`);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', handleScroll);
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleScroll);
		};
	}, [isVisible]);

	return (
		<div className='absolute top-0 left-0 w-full h-full'>
			<div
				ref={ref}
				className='w-full h-full bg-white  transition-transform duration-200 ease-out'
				style={{
					transform
				}}
			/>
		</div>
	);
};

export default AnimatedBackBlock;
