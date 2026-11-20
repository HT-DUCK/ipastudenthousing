'use client';
import { useState, useEffect } from 'react';

export function useScroll() {
	const [position, setPosition] = useState<number>(0);
	const [direction, setDirection] = useState<'down' | 'up' | null>(null);

	useEffect(() => {
		let prevScrollY = 0;

		function updateScroll() {
			const scrollY = window.scrollY;

			if (scrollY === 0) {
				setDirection(null);
			}
			if (scrollY > prevScrollY) {
				setDirection('down');
			} else if (scrollY < prevScrollY) {
				setDirection('up');
			}

			setPosition(scrollY);
			prevScrollY = scrollY;
		}
		window.addEventListener('scroll', updateScroll);
		return () => window.removeEventListener('scroll', updateScroll);
	}, []);

	return [position, direction];
}

export function useWindowSize() {
	const hasWindow = typeof window !== 'undefined';

	function getSize() {
		const width = hasWindow ? window.innerWidth : null;
		const height = hasWindow ? window.innerHeight : null;
		return [width, height];
	}
	const [size, setSize] = useState(getSize());

	function updateSize() {
		setSize([window.innerWidth, window.innerHeight]);
	}
	useEffect(() => {
		if (hasWindow) {
			window.addEventListener('resize', updateSize);
			return () => window.removeEventListener('resize', updateSize);
		}
	}, [hasWindow]);
	return size;
}

export function useResponsiveSize() {
	const [responsiveSize, setResponsiveSize] = useState<number>();

	const updateSize = () => setResponsiveSize(window.innerWidth >= 1536 ? 1536 : window.innerWidth >= 1280 ? 1280 : window.innerWidth >= 1024 ? 1024 : window.innerWidth >= 768 ? 768 : window.innerWidth >= 640 ? 640 : 1);

	useEffect(() => {
		updateSize();

		window.addEventListener('resize', updateSize);
		return () => window.removeEventListener('resize', updateSize);
	}, []);

	return responsiveSize;
}
