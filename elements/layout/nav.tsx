import { MenuItemType } from 'lib/types';
import NavItem from './nav-item';

type NavType = {
	btn_element?: React.ReactNode;
	className?: string;
	li_children?: React.ReactNode;
	link_children?: React.ReactNode;
	menu: MenuItemType[] | null;
	toggle_element?: React.ReactNode;
};

const Nav = ({ btn_element, className, li_children, link_children, menu, toggle_element }: NavType) => {
	if (!menu?.length) return null;
	return (
		<nav className={className} role='navigation'>
			<ul>
				{menu.map((item: MenuItemType) => (
					<NavItem key={`nav_item-${item.id}`} item={item} li_children={li_children} link_children={link_children} btn_element={btn_element} toggle_element={toggle_element} />
				))}
			</ul>
		</nav>
	);
};

export default Nav;
