'use client';
type SliderArrowType = {
	children?: React.ReactNode;
	classes?: string;
	className?: string;
	hovered?: boolean;
	onClick?: () => void;
	title: string;
};

const SliderArrow = ({ children, title, classes = '', className, hovered, onClick }: SliderArrowType) => (
	<button className={`${classes} ${className}${hovered ? ' hovered' : ''}`} onClick={onClick}>
		<span style={{ display: 'none' }}>{title}</span>
		{children}
	</button>
);

export default SliderArrow;
