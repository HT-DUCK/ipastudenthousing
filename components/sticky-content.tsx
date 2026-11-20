'use client';

import { useEffect, useRef } from 'react';

const StickyContent = ({ children, onlyDesktop }: { children: React.ReactNode; onlyDesktop?: boolean }) => {
	const containerRef = useRef<HTMLDivElement>(null);

	const updateStickyTop = () => {
		if (!containerRef.current) return;

		const container = containerRef.current;
		const windowHeight = window.innerHeight;
		const containerHeight = container.clientHeight;
		const windowWidth = window.innerWidth;

		if (onlyDesktop && windowWidth < 767) {
			container.style.top = '0px';
			return;
		}

		if (containerHeight > windowHeight) {
			const difference = containerHeight - windowHeight;
			container.style.top = `-${difference}px`;
		} else {
			const offset = (windowHeight - containerHeight) / 2;
			container.style.top = `${offset}px`;
		}
	};

	useEffect(() => {
		let prevHeight = 0;
		let checkCount = 0;
		const maxChecks = 20;

		const interval = setInterval(() => {
			if (!containerRef.current) return;

			const currentHeight = containerRef.current.clientHeight;

			if (currentHeight !== prevHeight) {
				prevHeight = currentHeight;
				updateStickyTop();
			} else {
				checkCount++;
			}

			if (checkCount > 4 || checkCount >= maxChecks) {
				clearInterval(interval);
			}
		}, 300);

		window.addEventListener('resize', updateStickyTop);

		return () => {
			clearInterval(interval);
			window.removeEventListener('resize', updateStickyTop);
		};
	}, []);
	return (
		<div ref={containerRef} className={`${onlyDesktop ? 'md:sticky' : 'sticky'} w-full z-2`} style={{ top: '0px' }}>
			{children}
		</div>
	);
};

export default StickyContent;
