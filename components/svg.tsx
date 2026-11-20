import { SvgType } from 'lib/types';

export const AmpersatIcon = ({ className = '', stroke = 'currentColor', width = undefined }: SvgType) => (
	<svg viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg' className={className} width={width}>
		<path d='M13.3333 9.98883V11.6555C13.3333 12.8061 14.2661 13.7388 15.4167 13.7388V13.7388C16.5673 13.7388 17.5 12.8061 17.5 11.6555V9.98883C17.5 5.84691 14.1425 2.48914 10.0006 2.48883C5.85864 2.48852 2.50061 5.8458 2.5 9.98772C2.49939 14.1296 5.85641 17.4879 9.99833 17.4888' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M13.3333 16.7001C12.2985 17.2181 11.1573 17.4881 10 17.4888' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<circle cx='10.0013' cy='9.98885' r='3.33333' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
);

export const ArrowButtonIcon = ({ className = '', stroke = 'currentColor', width = undefined }: SvgType) => (
	<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' className={className} width={width}>
		<path d='M13.333 9.33301L16 12L13.333 14.667' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path fillRule='evenodd' clipRule='evenodd' d='M12 2.99995V2.99995C14.39 2.99014 16.6849 3.93518 18.3749 5.62516C20.0649 7.31513 21.0099 9.61006 21.0001 12V12C21.0099 14.39 20.0649 16.6849 18.3749 18.3749C16.6849 20.0649 14.39 21.0099 12 21.0001V21.0001C9.61006 21.0099 7.31513 20.0649 5.62516 18.3749C3.93518 16.6849 2.99014 14.39 2.99995 12V12C2.99014 9.61006 3.93518 7.31513 5.62516 5.62516C7.31513 3.93518 9.61006 2.99014 12 2.99995Z' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M8.88904 9.33301L11.556 12L8.88904 14.667' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
);

export const ArrowIcon = ({ className = '', stroke = 'currentColor', width = undefined }: SvgType) => (
	<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' className={className} width={width}>
		<path d='M6.66675 8.33337L10.0001 11.6667L13.3334 8.33337' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
);
export const ArrowRequest = ({ className = '', stroke = 'currentColor', width = undefined }: SvgType) => (
	<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' className={className} width={width}>
		<path fillRule='evenodd' clipRule='evenodd' d='M16.364 16.364V16.364C12.849 19.879 7.15101 19.879 3.63601 16.364V16.364C0.121006 12.849 0.121006 7.15101 3.63601 3.63601V3.63601C7.15101 0.121006 12.849 0.121006 16.364 3.63601V3.63601C19.879 7.15101 19.879 12.849 16.364 16.364Z' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M13 7L7 13' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M8.5 7H13V11.5' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
);

export const ArrowSlider = ({ className = '', stroke = 'currentColor', width = undefined }: SvgType) => (
	<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' className={className} width={width}>
		<path fillRule='evenodd' clipRule='evenodd' d='M10 19V19C5.029 19 1 14.971 1 10V10C1 5.029 5.029 1 10 1V1C14.971 1 19 5.029 19 10V10C19 14.971 14.971 19 10 19Z' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M14 10H6' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M11 7L14 10L11 13' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
);

export const BurgerOpenIcon = ({ className = '', stroke = 'currentColor', width = undefined }: SvgType) => (
	<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' className={className} width={width}>
		<path d='M4 7H20' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M4 12H20' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M4 17H20' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
);

export const BurgerCloseIcon = ({ className = '', stroke = 'currentColor', width = undefined }: SvgType) => (
	<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' className={className} width={width}>
		<path d='M5 5L19 19' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M19 5L5 19' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
);

export const ClockIcon = ({ className = '', stroke = 'currentColor', width = undefined }: SvgType) => (
	<svg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 21 21' className={className} width={width}>
		<path d='M11 5.5v5l-3.5 2' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<circle cx='10.5' cy='10.5' r='9.5' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
);

export const CloseIcon = ({ className = '', stroke = 'currentColor', width = undefined }: SvgType) => (
	<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' className={className} width={width}>
		<path d='M5 5L19 19' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M19 5L5 19' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
);

export const SearchIcon = ({ className = '', stroke = 'currentColor', width = undefined }: SvgType) => (
	<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18' fill='none' className={className} width={width}>
		<path d='M17 17L13.75 13.75' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M13.747 3.187C16.663 6.103 16.663 10.831 13.747 13.747C10.831 16.663 6.103 16.663 3.187 13.747C0.271 10.831 0.271 6.103 3.187 3.187C6.103 0.271 10.831 0.271 13.747 3.187' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
);

export const QuestionIcon = ({ className = '', stroke = 'currentColor', width = undefined }: SvgType) => (
	<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' className={className} width={width}>
		<path d='M7.68 7.686A2.18 2.18 0 0 1 9.896 6a2.136 2.136 0 0 1 2.25 2c0 1.504-2.15 2-2.15 3M10.12 13.75a.125.125 0 1 1-.25 0 .125.125 0 0 1 .25 0' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path fillRule='evenodd' clipRule='evenodd' d='M2.627 15.158a9.014 9.014 0 1 1 2.21 2.21L1.995 18l.632-2.842Z' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
);

export const FacebookIcon = ({ className = '', stroke = 'currentColor', width = undefined }: SvgType) => (
	<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18' fill='none' className={className} width={width}>
		<path d='M7.263 8.48535H10.7363' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M10.737 5.59082H10.1295C9.18672 5.59082 8.42172 6.35582 8.42172 7.29857V7.90607V12.4083' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path fillRule='evenodd' clipRule='evenodd' d='M9.00003 16.5C13.1422 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1422 1.5 9.00003 1.5C4.85789 1.5 1.50003 4.85786 1.50003 9C1.50003 13.1421 4.85789 16.5 9.00003 16.5Z' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
);

export const InstagramIcon = ({ className = '', stroke = 'currentColor', width = undefined }: SvgType) => (
	<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18' fill='none' className={className} width={width}>
		<path fillRule='evenodd' clipRule='evenodd' d='M5.622 2.25H12.3788C14.2403 2.25 15.75 3.759 15.75 5.622V12.3788C15.75 14.2403 14.241 15.75 12.378 15.75H5.622C3.75975 15.75 2.25 14.241 2.25 12.378V5.622C2.25 3.75975 3.759 2.25 5.622 2.25V2.25Z' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M12.7118 5.03496C12.5723 5.03571 12.459 5.14896 12.459 5.28846C12.459 5.42796 12.573 5.54121 12.7125 5.54121C12.852 5.54121 12.9653 5.42796 12.9653 5.28846C12.966 5.14821 12.852 5.03496 12.7118 5.03496' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M10.9092 7.09062C11.9636 8.14504 11.9636 9.85458 10.9092 10.909C9.85479 11.9634 8.14525 11.9634 7.09083 10.909C6.03641 9.85458 6.03641 8.14504 7.09083 7.09062C8.14525 6.0362 9.85479 6.0362 10.9092 7.09062' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
);

export const XIcon = ({ className = '', stroke = 'currentColor', width = undefined }: SvgType) => (
	<svg viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg' className={className} width={width}>
		<path d='M11.7973 14.425L4.11193 3.575L6.36592 3.575L13.9006 14.425H11.7973Z' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M3.83203 14.6667L7.9987 10' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M13.8346 3.33301L9.66797 7.99967' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
);

export const LinkedinIcon = ({ className = '', stroke = 'currentColor', width = undefined }: SvgType) => (
	<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18' fill='none' className={className} width={width}>
		<path d='M6.48676 7.93066V11.6124' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M8.94 11.6124V9.46441C8.94 8.61691 9.62625 7.93066 10.4738 7.93066V7.93066C11.3213 7.93066 12.0075 8.61691 12.0075 9.46441V11.6124' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M6.48525 5.7066C6.4005 5.7066 6.3315 5.7756 6.33225 5.86035C6.33225 5.9451 6.40125 6.0141 6.486 6.0141C6.57075 6.0141 6.63975 5.9451 6.63975 5.86035C6.639 5.77485 6.57 5.7066 6.48525 5.7066' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M14.3032 3.69656C17.232 6.62531 17.232 11.3743 14.3032 14.3031C11.3745 17.2318 6.6255 17.2318 3.69675 14.3031C0.767996 11.3743 0.767996 6.62531 3.69675 3.69656C6.6255 0.767813 11.3745 0.767813 14.3032 3.69656' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
);

export const PhoneSVG = ({ className = '', stroke = 'currentColor', width = undefined }: SvgType) => (
	<svg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 25' className={className} width={width}>
		<path d='M18.783 8.268a5.26 5.26 0 0 0-7.56 0M22.578 4.47a10.68 10.68 0 0 0-7.576-3.137 10.676 10.676 0 0 0-7.576 3.139' stroke={stroke} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
		<path fillRule='evenodd' clipRule='evenodd' d='M23.58 24h2.088a2.666 2.666 0 0 0 2.667-2.667v-1.352c0-1.372-.704-2.648-1.87-3.444-2.876-1.961-6.929-3.204-11.464-3.204-4.534 0-8.588 1.243-11.464 3.206-1.165.796-1.869 2.072-1.869 3.442v1.352A2.666 2.666 0 0 0 4.335 24h2.088a2 2 0 0 0 2-2v-1.817c0-.41.241-.788.622-.936 1.768-.686 3.795-1.08 5.956-1.08 2.162 0 4.188.394 5.956 1.08a.998.998 0 0 1 .623.936V22a2 2 0 0 0 2 2v0Z' stroke={stroke} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
);

export const YoutubeIcon = ({ className = '', stroke = 'currentColor', width = undefined }: SvgType) => (
	<svg viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg' className={className} width={width}>
		<path fillRule='evenodd' clipRule='evenodd' d='M7.5015 11.25L11.3985 9L7.5015 6.75V11.25Z' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path fillRule='evenodd' clipRule='evenodd' d='M5.625 2.25H12.378C14.2402 2.25 15.75 3.75975 15.75 5.622V12.3788C15.75 14.2403 14.2402 15.75 12.378 15.75H5.622C3.75975 15.75 2.25 14.2402 2.25 12.378V5.625C2.25 3.76125 3.76125 2.25 5.625 2.25V2.25Z' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
);

export const StarsIcon = ({ className = '', stroke = 'currentColor', width = undefined }: SvgType) => (
	<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' className={className} width={width}>
		<path d='M12 0L14.6942 8.2918H23.4127L16.3593 13.4164L19.0534 21.7082L12 16.5836L4.94658 21.7082L7.64074 13.4164L0.587322 8.2918H9.30583L12 0Z' fill={stroke} />
	</svg>
);

export const KeyIcon = ({ className = '', stroke = 'currentColor', width = undefined }: SvgType) => (
	<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' className={className} width={width}>
		<g opacity='0.6'>
			<path fillRule='evenodd' clipRule='evenodd' d='M6.99914 17.5V17.5C7.92247 17.5 8.67164 16.7517 8.67247 15.8283L8.6758 12.4584C9.47914 12.1067 10.205 11.5184 10.685 10.5967C11.4466 9.13502 11.3008 7.29835 10.265 6.01668C8.5733 3.92418 5.4083 3.92918 3.72414 6.03168C2.6933 7.31752 2.55247 9.15502 3.32164 10.6125C3.8033 11.5259 4.52747 12.1125 5.32914 12.4617L5.3258 15.8242C5.32497 16.7492 6.07414 17.5 6.99914 17.5V17.5Z' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
			<path d='M7.22661 8.62169C7.22661 8.48586 7.11661 8.37669 6.98161 8.37669C6.84577 8.37753 6.73661 8.48753 6.73661 8.62253C6.73661 8.75836 6.84661 8.86753 6.98161 8.86753C7.11661 8.86753 7.22661 8.75753 7.22661 8.62169' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
			<path d='M11.3849 4.69333C11.3849 3.48167 10.4032 2.5 9.19152 2.5V2.5C7.98069 2.5 6.99902 3.48167 6.99902 4.69333V8.37667' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
			<path d='M9.83057 5.55502L10.2056 5.18002C10.8564 4.52919 11.9114 4.52919 12.5622 5.18002L17.3431 9.96085C17.9939 10.6117 17.9939 11.6667 17.3431 12.3175L15.1372 14.5234C14.4864 15.1742 13.4314 15.1742 12.7806 14.5234L9.90307 11.6459' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		</g>
	</svg>
);

export const BadIcon = ({ className = '', stroke = 'currentColor', width = undefined }: SvgType) => (
	<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' className={className} width={width}>
		<g opacity='0.6'>
			<path fillRule='evenodd' clipRule='evenodd' d='M3.66569 10H16.999C17.9195 10 18.6657 10.7462 18.6657 11.6667V15C18.6657 15.4602 18.2926 15.8333 17.8324 15.8333H2.83236C2.37212 15.8333 1.99902 15.4602 1.99902 15V11.6667C1.99902 10.7462 2.74522 10 3.66569 10Z' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
			<path d='M3.66602 9.99998V5.83331C3.66602 4.4526 4.7853 3.33331 6.16602 3.33331H14.4993C15.8801 3.33331 16.9993 4.4526 16.9993 5.83331V9.99998' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
			<path d='M17.8327 15.8333V17.5' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
			<path d='M2.83268 15.8333V17.5' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
			<rect x='6.16602' y='6.66669' width='4.16667' height='3.33333' rx='1.5' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
			<rect x='10.3325' y='6.66669' width='4.16667' height='3.33333' rx='1.5' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		</g>
	</svg>
);

export const CalendarIcon = ({ className = '', stroke = 'currentColor', width = undefined }: SvgType) => (
	<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' className={className} width={width}>
		<path d='M6.58268 2.5V5' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M14.0827 2.5V5' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M7.41585 9.58335H6.58252' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M7.41585 12.5H6.58252' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M10.7493 9.58335H9.91602' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M10.7493 12.5H9.91602' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M14.0824 9.58335H13.249' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M14.0824 12.5H13.249' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<rect x='2.83252' y='3.75' width='15' height='13.75' rx='3' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
);

export const PinIcon = ({ className = '', stroke = 'currentColor', width = undefined }: SvgType) => (
	<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' className={className} width={width}>
		<path d='M5.33252 10.9608C3.80169 11.6475 2.83252 12.6408 2.83252 13.75C2.83252 15.8208 6.19002 17.5 10.3325 17.5C14.475 17.5 17.8325 15.8208 17.8325 13.75C17.8325 12.6408 16.8634 11.6475 15.3325 10.9608' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M13.3762 14.1667C12.4732 14.7543 11.4093 15.0456 10.3329 15C9.25645 15.0456 8.1926 14.7543 7.28955 14.1667' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M12.1657 3.26091C12.9086 4.00378 13.1308 5.12102 12.7288 6.09165C12.3268 7.06229 11.3796 7.69516 10.329 7.69516C9.27842 7.69516 8.33127 7.06229 7.92923 6.09165C7.5272 5.12102 7.74945 4.00378 8.49235 3.26091C8.97937 2.77361 9.64007 2.49982 10.329 2.49982C11.018 2.49982 11.6787 2.77361 12.1657 3.26091' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M10.3325 9.35999V12.5' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
);

export const LoadMoreIcon = ({ className = '', stroke = 'currentColor', width = undefined }: SvgType) => (
	<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' className={className} width={width}>
		<path d='M12.6675 11.3329L10.0005 13.9999L7.33348 11.3329' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path fillRule='evenodd' clipRule='evenodd' d='M19.0004 10V10C19.0102 12.39 18.0652 14.6849 16.3752 16.3749C14.6852 18.0649 12.3903 19.0099 10.0003 19.0001V19.0001C7.61037 19.0099 5.31544 18.0649 3.62546 16.3749C1.93548 14.6849 0.990449 12.39 1.00026 10V10C0.990449 7.61006 1.93548 5.31513 3.62546 3.62516C5.31544 1.93518 7.61037 0.990143 10.0003 0.999953V0.999953C12.3903 0.990144 14.6852 1.93518 16.3752 3.62516C18.0652 5.31513 19.0102 7.61006 19.0004 10Z' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M12.6675 6.88904L10.0005 9.55604L7.33348 6.88904' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
);

export const DistanceIcon = ({ className = '', stroke = 'currentColor', width = undefined }: SvgType) => (
	<svg viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg' className={className} width={width}>
		<g opacity='0.6'>
			<path d='M12.242 16.6192H7.46452C6.43286 16.6192 5.59619 15.7825 5.59619 14.7508V14.7508C5.59619 13.7192 6.43286 12.8825 7.46452 12.8825H12.8654C13.897 12.8825 14.7337 12.0458 14.7337 11.0142V11.0125C14.7337 9.98083 13.897 9.14417 12.8654 9.14417H10.5804' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
			<path fillRule='evenodd' clipRule='evenodd' d='M6.84061 9.14246C6.84061 9.14246 3.93311 6.75413 3.93311 4.57413C3.93311 2.96829 5.23477 1.66663 6.84061 1.66663C8.44644 1.66663 9.74811 2.96829 9.74811 4.57413C9.74811 6.75496 6.84061 9.14246 6.84061 9.14246Z' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
			<path d='M6.83952 4.44911C6.72452 4.44911 6.63202 4.54244 6.63202 4.65744C6.63202 4.77161 6.72535 4.86494 6.83952 4.86494C6.95452 4.86494 7.04702 4.77161 7.04702 4.65744C7.04785 4.54244 6.95452 4.44911 6.83952 4.44911' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
			<path d='M17.2661 15.7416L15.5078 17.4999' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
			<path d='M15.5078 15.7416L17.2661 17.4999' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		</g>
	</svg>
);

export const PriceIcon = ({ className = '', stroke = 'currentColor', width = undefined }: SvgType) => (
	<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' className={className} width={width}>
		<g opacity='0.6'>
			<path d='M10.6999 7.49998V8.1732' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
			<path d='M9.0332 9.51964C9.13057 8.6925 9.87074 8.09455 10.6999 8.17321' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
			<path d='M10.6999 14.1667V13.4935' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
			<path d='M12.3669 12.147C12.2695 12.9741 11.5293 13.5721 10.7002 13.4934' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
			<path d='M12.3244 9.22594C12.0737 8.55585 11.4143 8.12849 10.7002 8.17325' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
			<path d='M9.07617 12.4408C9.32694 13.1109 9.98633 13.5382 10.7004 13.4935' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
			<path d='M9.0332 9.51965V9.51965C9.0332 10.0897 9.43555 10.5805 9.99451 10.6923L11.4052 10.9744C11.9642 11.0862 12.3665 11.577 12.3665 12.147V12.147' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
			<path fillRule='evenodd' clipRule='evenodd' d='M18.2002 14.1667V8.93284C18.2002 7.92023 17.7399 6.96253 16.9492 6.32995L13.3031 3.41306C11.7813 2.19565 9.61901 2.19565 8.09726 3.41306L4.4512 6.32995C3.66049 6.96253 3.20019 7.92024 3.2002 8.93285V14.1667C3.2002 16.0076 4.69258 17.5 6.53353 17.5H14.8669C16.7078 17.5 18.2002 16.0076 18.2002 14.1667Z' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		</g>
	</svg>
);

export const CallIcon = ({ className = '', stroke = 'currentColor', width = undefined }: SvgType) => (
	<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 22 19' fill='none' className={className} width={width}>
		<path d='M13.835 6.201C13.115 5.462 12.113 5 11 5C9.88704 5 8.88504 5.462 8.16504 6.201' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M16.6819 3.353C15.2279 1.899 13.2189 1 10.9999 1C8.78087 1 6.77187 1.899 5.31787 3.354' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path fillRule='evenodd' clipRule='evenodd' d='M17.434 18H19C20.105 18 21 17.105 21 16V14.986C21 13.957 20.472 13 19.598 12.403C17.441 10.932 14.401 10 11 10C7.599 10 4.559 10.932 2.402 12.404C1.528 13.001 1 13.958 1 14.986V16C1 17.105 1.895 18 3 18H4.566C5.394 18 6.066 17.328 6.066 16.5V15.137C6.066 14.83 6.247 14.546 6.533 14.435C7.859 13.921 9.379 13.625 11 13.625C12.621 13.625 14.141 13.921 15.467 14.435C15.753 14.546 15.934 14.83 15.934 15.137V16.5C15.934 17.328 16.606 18 17.434 18V18Z' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
);

export const NoResultIcon = ({ className = '', stroke = 'currentColor', width = undefined }: SvgType) => (
	<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' className={className} width={width}>
		<path d='M10.75 16.25L13.25 13.75' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M13.25 16.25L10.75 13.75' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M3 9H21' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M11 5.995L10.995 6L11 6.005L11.005 6L11 5.995' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M8.5 5.995L8.495 6L8.5 6.005L8.505 6L8.5 5.995' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M6 5.995L5.995 6L6 6.005L6.005 6L6 5.995' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M11 5.995L10.995 6L11 6.005L11.005 6L11 5.995' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M8.5 5.995L8.495 6L8.5 6.005L8.505 6L8.5 5.995' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M6 5.995L5.995 6L6 6.005L6.005 6L6 5.995' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path fillRule='evenodd' clipRule='evenodd' d='M18 21H6C4.34315 21 3 19.6569 3 18V6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V18C21 19.6569 19.6569 21 18 21Z' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
);

export const NotFoundPageIcon = ({ className = '', width = undefined }: SvgType) => (
	<svg viewBox='0 0 56 56' fill='none' xmlns='http://www.w3.org/2000/svg' className={className} width={width}>
		<path d='M0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28Z' fill='#AFA9A0' />
		<path fillRule='evenodd' clipRule='evenodd' d='M28 37V37C23.029 37 19 32.971 19 28V28C19 23.029 23.029 19 28 19V19C32.971 19 37 23.029 37 28V28C37 32.971 32.971 37 28 37Z' stroke='black' strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
		<path d='M32 26L27 31L24 28' stroke='black' strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
);

export const PlusCircleIcon = ({ className = '', stroke = 'currentColor', width = undefined }: SvgType) => (
	<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 22 22' className={className} width={width}>
		<path d='M11 21c5.5 0 10-4.5 10-10S16.5 1 11 1 1 5.5 1 11s4.5 10 10 10ZM7 11h8M11 15V7' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
);
