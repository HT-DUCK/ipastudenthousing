import { Nav } from 'elements/layout';
import HeaderContent from './header-content';
import { getMenus, getThemeOptions } from 'lib/data';

const Header = async ({}) => {
	const [theme_options, main_menu] = await Promise.all([getThemeOptions(), getMenus({ slug: 'main-menu' })]);
	const { header_logo_dark_image, header_logo_image } = theme_options || {};

	return (
		<HeaderContent header_logo_dark_image={header_logo_dark_image} header_logo_image={header_logo_image}>
			<Nav menu={main_menu} className='main_menu' />
		</HeaderContent>
	);
};

export default Header;
