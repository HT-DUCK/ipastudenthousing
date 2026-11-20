import React from 'react';

type DynamicType = {
	attrs?: Record<string, boolean | number | string>;
	children?: React.ReactNode;
	className?: string;
	dangerouslySetInnerHTML?: { __html: string };
	ref?: any;
	style?: React.CSSProperties;
	wrapper: string;
};

const DynamicWrapper = ({ attrs, children, className, dangerouslySetInnerHTML, ref, style, wrapper }: DynamicType) => {
	const element = React.createElement(
		wrapper,
		{
			...attrs,
			className,
			dangerouslySetInnerHTML,
			style,
			ref
		},
		children
	);

	return element;
};

export default DynamicWrapper;
