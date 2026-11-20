import { SvgType } from 'lib/types';

export const CheckmarkSVG = ({ className = '', stroke = 'currentColor', width = undefined }: SvgType) => (
	<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 7' className={className} width={width}>
		<path stroke={stroke} strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.15' d='m8.575.575-5 5-3-3' />
	</svg>
);

export const CloseSVG = ({ className = '', stroke = 'currentColor', width = undefined }: SvgType) => (
	<svg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 14' className={className} width={width}>
		<path d='M.872.872 13.13 13.128M.872 13.128 13.13.872' stroke={stroke} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
);

export const LoadingSVG = ({ className = '', fill = 'currentColor', width = undefined }: SvgType) => (
	<svg version='1.0' viewBox='0 0 512 47' className={className} width={width}>
		<style>{`
			@keyframes loading-dot-1 {
				0% { transform: translateX(0%); }
				63.9% { transform: translateX(105.9%); }
				100% { transform: translateX(105.9%); }
			}
			@keyframes loading-dot-2 {
				0%, 13.5% { transform: translateX(0%); }
				75.7% { transform: translateX(112.7%); }
				100% { transform: translateX(112.7%); }
			}
			@keyframes loading-dot-3 {
				0%, 27% { transform: translateX(0%); }
				89.2% { transform: translateX(119.9%); }
				100% { transform: translateX(119.9%); }
			}
			@keyframes loading-dot-4 {
				0%, 39.5% { transform: translateX(0%); }
				100% { transform: translateX(119.3%); }
			}
			.loading-dot {
				animation-duration: 2220ms;
				animation-iteration-count: infinite;
				animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
				transform-box: view-box;
			}
		`}</style>
		<circle className='loading-dot' style={{ animationName: 'loading-dot-1' }} fill={fill} cx='-14.781' cy='22.328' r='12.813' />
		<circle className='loading-dot' style={{ animationName: 'loading-dot-2' }} fill={fill} cx='-50.328' cy='22.328' r='12.797' />
		<circle className='loading-dot' style={{ animationName: 'loading-dot-3' }} fill={fill} cx='-87.203' cy='22.328' r='12.797' />
		<circle className='loading-dot' style={{ animationName: 'loading-dot-4' }} fill={fill} cx='-125.234' cy='22.328' r='12.797' />
	</svg>
);

export const SearchSVG = ({ className = '', stroke = 'currentColor', width = undefined }: SvgType) => (
	<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16' className={className} width={width}>
		<path d='M11.956 3.156a6.223 6.223 0 1 1-8.8 8.8 6.223 6.223 0 0 1 8.8-8.8M14.667 14.667l-2.709-2.709' stroke={stroke} strokeWidth='1.15' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
);
