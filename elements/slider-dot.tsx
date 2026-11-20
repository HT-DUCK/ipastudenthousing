type SliderDotType = {
	children?: React.ReactNode;
	className?: string;
	current?: boolean;
	onClick?: () => void;
	style?: React.CSSProperties;
	title?: string | number;
};

const SliderDot = ({ children, className = '', current, onClick, style, title }: SliderDotType) => (
	<button className={`${className} ${current ? 'current' : ''}`} style={style} onClick={onClick}>
		{children}
		<span>{title}</span>
	</button>
);

export default SliderDot;
