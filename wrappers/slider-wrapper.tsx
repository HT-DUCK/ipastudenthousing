'use client';
import { useState } from 'react';
import Slider, { Settings } from 'react-slick';
import { SliderDot } from 'elements';
import './styles/slick.css';

type SliderWrapperType = {
	asNavFor?: any;
	children: React.ReactNode;
	current_className?: string;
	current_0?: boolean;
	ref?: any;
	settings: Settings;
	show_current?: boolean;
};

const SliderWrapper = ({ asNavFor, children, current_className, current_0, ref, settings, show_current }: SliderWrapperType) => {
	const [current, setCurrent] = useState(0);

	if (!settings.customPaging) {
		settings.customPaging = (i) => <SliderDot title={i + 1} current={i === current} />;
	}
	if (!settings.beforeChange) {
		settings.beforeChange = (current, next) => setCurrent(next);
	}

	return (
		<>
			<Slider {...settings} asNavFor={asNavFor} ref={ref}>
				{children}
			</Slider>
			{show_current ? <div className={current_className}>{current <= 9 && current_0 ? `0${current + 1}` : current + 1}</div> : null}
		</>
	);
};

export default SliderWrapper;
