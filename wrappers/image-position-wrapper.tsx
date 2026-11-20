'use client';
import { css } from '@emotion/css';
import { PositionType } from 'lib/types';

const ImagePositionWrapper = ({ children, className, position }: { children: React.ReactNode; className?: string; position?: PositionType }) => {
	const inlineStyles = {
		img: {
			'@media (min-width: 768px)': {
				objectPosition: `${position?.horizontal ? `${position.horizontal}%` : '50%'} ${position?.vertical ? `${position.vertical}%` : 0}`
			},
			'@media (max-width: 767px)': {
				objectPosition: `${position?.mobile_horizontal ? `${position.mobile_horizontal}%` : position?.horizontal ? `${position.horizontal}%` : '50%'} ${position?.mobile_vertical ? `${position.mobile_vertical}%` : position?.vertical ? `${position.vertical}%` : 0}`
			}
		}
	};

	return <div className={`${css(inlineStyles)}${className ? ` ${className}` : ''}`}>{children}</div>;
};

export default ImagePositionWrapper;
