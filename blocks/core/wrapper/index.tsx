import Link from 'next/link';
import { AnimateWrapper, DynamicWrapper } from 'wrappers';
import { CoreBlockAttrsType, LinkType } from 'lib/types';

type CoreWrapperType = {
	animate_type?: 'fade' | 'fadeleft' | 'faderight' | 'fadeup' | 'growx' | 'growy' | 'slidedown' | 'slideleft' | 'slideright' | 'slideup' | null;
	attrs?: CoreBlockAttrsType;
	children?: React.ReactNode;
	link?: LinkType | null;
	page_type?: string;
	element: string;
	element_attrs?: Record<string, boolean | number | string>;
	element_class?: string;
	element_styles?: Array<React.CSSProperties>;
};

const CoreWrapper = ({ animate_type, attrs, children, link = null, page_type, element, element_attrs, element_class, element_styles }: CoreWrapperType) => {
	//__Variables
	const { align, backgroundColor, className, fontSize, height, layout, sizeSlug, style, textColor, width } = attrs || {};
	const { flexWrap, justifyContent, orientation } = layout || {};

	const fontSize_options: any = {
		small: 'text-sm',
		medium: 'text-base',
		large: 'text-lg',
		'x-large': 'text-xl'
	};
	const flexWrap_options: any = {
		nowrap: 'flex-wrap',
		wrap: 'flex-nowrap'
	};
	const justifyContent_options: any = {
		center: 'justify-center',
		left: 'justify-start',
		right: 'justify-end',
		stretch: 'justify-stretch'
	};
	const orientation_options: any = {
		horizontal: 'flex-row',
		vertical: 'flex-col'
	};

	const class_name = `${element_class}${className ? ` ${className}` : ''}${align ? ` ${align}` : ''}${fontSize ? ` ${fontSize_options[fontSize]}` : ''}${flexWrap ? ` ${flexWrap_options[flexWrap]}` : ''}${justifyContent ? ` ${justifyContent_options[justifyContent]}` : ''}${orientation ? ` ${orientation_options[orientation]}` : ''}${sizeSlug ? ` ${sizeSlug}` : ''}${page_type ? ` ${page_type}` : ''}`;

	//__Inline Styles
	const inlineStyles = {
		backgroundColor: backgroundColor ? backgroundColor.substring(backgroundColor.lastIndexOf('-') + 1) : style?.color?.background ? style.color.background : '',
		borderRadius: style?.border?.radius ? style.border.radius : '',
		color: textColor ? textColor.substring(textColor.lastIndexOf('-') + 1) : style?.color?.text ? style.color.text : '',
		fontSize: style?.typography?.fontSize ? style.typography.fontSize : '',
		height: height || undefined,
		textAlign: align || undefined,
		width: width ? (element_class === 'wp_button' ? `${width}%` : width) : ''
	};

	//Add any inline styles from Block
	if (element_styles?.length) {
		element_styles.map((item, index) => {
			(inlineStyles as any)[Object.keys(item)[index]] = Object.values(item)[index];
		});
	}

	if (!attrs) return null;
	return element === 'link' && link?.url ? (
		<Link className={class_name} href={link.url} rel={link.rel || undefined} style={inlineStyles} target={link.target || undefined} {...element_attrs}>
			{children}
		</Link>
	) : animate_type ? (
		<AnimateWrapper animate_type={animate_type} attrs={element_attrs} className={class_name} element={element} style={inlineStyles} threshold={0}>
			{children}
		</AnimateWrapper>
	) : (
		<DynamicWrapper attrs={element_attrs} className={class_name} wrapper={element} style={inlineStyles}>
			{children}
		</DynamicWrapper>
	);
};

export default CoreWrapper;
