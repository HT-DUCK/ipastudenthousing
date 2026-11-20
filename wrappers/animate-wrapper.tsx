'use client';

import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { css } from '@emotion/css';
import { getScrollDirection } from 'lib/functions';

type AnimateType = {
	animate_type?: 'fade' | 'fadeleft' | 'faderight' | 'fadeup' | 'growx' | 'growy' | 'slidedown' | 'slideleft' | 'slideright' | 'slideup' | null;
	attrs?: Record<string, boolean | number | string>;
	children?: React.ReactNode;
	className?: string;
	dangerouslySetInnerHTML?: { __html: string };
	delay?: number;
	ease?: string;
	element: string;
	finish_opacity?: number;
	finish_x_offset?: number;
	finish_y_offset?: number;
	id?: number | string;
	mobile?: boolean;
	offset?: string;
	priority?: boolean;
	repeat?: boolean;
	speed?: number;
	style?: React.CSSProperties;
	threshold?: number;
	width?: string;
};

const AnimateWrapper = ({ attrs, children, animate_type, threshold = 0, element, className, dangerouslySetInnerHTML, style, id, delay = 0, speed = 1.2, offset = '50px', finish_opacity = 1, finish_x_offset = 0, finish_y_offset = 0, ease = 'ease', repeat = true, width = '100%', mobile = true, priority = false }: AnimateType) => {
	//__Hooks
	const [ref, inView, entry] = useInView({ threshold });

	//__State
	const [show, setShow] = useState(false);

	//__Variables
	const scrollDirection = entry ? getScrollDirection(entry) : null;
	if (!animate_type) {
		delay = 0;
	}

	const inlineStyles: any = {
		animate: animate_type
			? {
					transition: `${speed}s ${ease}`,
					transitionProperty: animate_type === 'growx' ? 'width' : 'opacity, transform',
					transitionDelay: show ? `${delay}s` : '0s',
					opacity: animate_type === 'growx' || animate_type === 'growy' || animate_type === 'slideright' || animate_type === 'slideleft' || animate_type === 'slideup' || animate_type === 'slidedown' ? null : show || priority ? finish_opacity || 1 : 0,
					transform: (show || animate_type === 'growx' || animate_type === 'growy') && animate_type !== 'fade' ? `translate(${finish_x_offset}, ${finish_y_offset})` : animate_type === 'fadeleft' || animate_type === 'slideleft' ? `translate(${offset}, 0)` : animate_type === 'faderight' || animate_type === 'slideright' ? `translate(-${offset}, 0)` : animate_type === 'fade' ? null : animate_type === 'slidedown' ? `translate(0, -${offset})` : `translate(0, ${offset})`,
					width: animate_type !== 'growx' ? null : show ? width : 0,
					'@media (max-width: 960px)': {
						transition: !mobile ? 'none' : null,
						transform: !mobile ? 'none' : null
					}
				}
			: null
	};

	const elementDOM = React.createElement(
		element,
		{
			...attrs,
			className: `${css(inlineStyles.animate)}${className ? ` ${className}` : ''}`,
			dangerouslySetInnerHTML,
			ref,
			style
		},
		children
	);

	//__Use Effect
	useEffect(() => {
		if (!animate_type) {
			setShow(true);
		}
	}, []);

	useEffect(() => {
		if (animate_type) {
			if (inView) {
				setShow(true);
			} else {
				if (repeat && scrollDirection !== 'scrollingDownLeave') {
					setShow(false);
				}
			}
		} else {
			setShow(true);
		}
	}, [inView, scrollDirection]);

	return elementDOM;
};

export default AnimateWrapper;
