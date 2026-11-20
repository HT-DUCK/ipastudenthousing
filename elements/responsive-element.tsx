'use client';
import { useEffect, useState } from 'react';
import { useResponsiveSize } from 'lib/hooks';

type ResponsiveElementType = {
	base: React.ReactNode;
	lg?: React.ReactNode;
	md?: React.ReactNode;
	sm?: React.ReactNode;
	Twoxl?: React.ReactNode;
	xl?: React.ReactNode;
};

const ResponsiveElement = ({ base, lg, md, sm, Twoxl, xl }: ResponsiveElementType) => {
	//__Hooks
	const responsiveSize = useResponsiveSize();

	//__State
	const [element, setElement] = useState<React.ReactNode>(base);
	const [label, setLabel] = useState('');

	useEffect(() => {
		if (responsiveSize) {
			if (responsiveSize >= 1536 && Twoxl) {
				setLabel('2xl');
			} else if (responsiveSize >= 1200 && xl) {
				setLabel('xl');
			} else if (responsiveSize >= 1024 && lg) {
				setLabel('lg');
			} else if (responsiveSize >= 768 && md) {
				setLabel('md');
			} else if (responsiveSize >= 640 && sm) {
				setLabel('sm');
			} else if (base) {
				setLabel('base');
			}
		}
	}, [responsiveSize, base, lg, md, sm, Twoxl, xl]);

	useEffect(() => {
		if (label) {
			setElement(label === '2xl' ? Twoxl : label === 'xl' ? xl : label === 'lg' ? lg : label === 'md' ? md : label === 'sm' ? sm : base);
		}
	}, [label]);

	return element;
};
export default ResponsiveElement;
