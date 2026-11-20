import Link from 'next/link';
import { LinkType } from 'lib/types';

type ButtonType = {
	link: LinkType;
	children?: React.ReactNode;
	children_className?: string;
	className?: string;
	hovered?: boolean;
	disabled?: boolean;
	onClick?: (e?: any) => void;
};

const Button = ({ link, children, className = '', children_className, hovered, disabled, onClick }: ButtonType) => {
	const contents = () => (
		<>
			{children && <span className={`${children_className ? ` ${children_className}` : ''}`}>{children}</span>}
			<span className='' dangerouslySetInnerHTML={{ __html: link.title }} />
		</>
	);

	if (!link) return null;
	return link.url ? (
		link.url.includes('#') ? (
			<a href={link.url} className={`${className}${hovered ? ' hovered' : ''}${disabled ? ' disabled' : ''}`} target={link.target || ''} onClick={onClick}>
				{contents()}
			</a>
		) : (
			<Link href={link.url} passHref={link.target === '_blank'} className={`${className}${hovered ? ' hovered' : ''}${disabled ? ' disabled' : ''}`} target={link.target || ''} onClick={onClick}>
				{contents()}
			</Link>
		)
	) : (
		<a className={`${className}${hovered ? ' hovered' : ''}${disabled ? ' disabled' : ''}`} target={link.target || ''} onClick={onClick}>
			{contents()}
		</a>
	);
};

export default Button;
