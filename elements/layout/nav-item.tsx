'use client';
import { useState, useRef, Suspense } from 'react';
import Link from 'next/link';
import parse from 'html-react-parser';
import SvgImage from '../svg-image';
import { MenuItemType } from 'lib/types';
import NavItemWrapper from './nav-item-wrapper';

type NavItemType = {
	btn_element?: React.ReactNode;
	item: MenuItemType;
	li_children?: React.ReactNode;
	link_children?: React.ReactNode;
	toggle_element?: React.ReactNode;
};

const NavItem = ({ btn_element, item, li_children, link_children, toggle_element }: NavItemType) => {
	//__State
	const [toggleOpen, setToggleOpen] = useState(false);

	//__Refs
	const subnavRefs = useRef<any>([]);

	const navItemContents = (item: MenuItemType) => {
		const { acf, classes, title } = item || {};
		const { image } = acf || {};

		const btn_item = classes?.includes('btn') || false;

		return (
			<>
				{image ? <SvgImage image={image} /> : null}
				{btn_item && btn_element ? btn_element : null}
				{link_children}
				{parse(title || '')}
			</>
		);
	};

	const liContents = (item: MenuItemType) => {
		const { child_items, classes, id, link, target } = item || {};

		const toggle_item = classes?.includes('toggle') || false;
		const btn_item = classes?.includes('btn') || false;
		const no_link = classes?.includes('label') || classes?.includes('placeholder') ? true : false;
		const open_toggle = toggle_item && toggleOpen;
		const toggle_subnav = {
			height: subnavRefs.current[id] && toggleOpen ? subnavRefs.current[id]?.scrollHeight : 0
		};

		return (
			<>
				{no_link ? (
					<span className={`label_text ${btn_item ? 'btn' : ''}`}>{navItemContents(item)}</span>
				) : link.includes('#') ? (
					<a href={link || ''} target={target} className={btn_item ? 'btn' : ''}>
						{navItemContents(item)}
					</a>
				) : (
					<Link href={link || ''} as={link} passHref={target === '_blank' ? true : false} target={target}>
						{navItemContents(item)}
					</Link>
				)}
				{toggle_item ? (
					<span className='toggle_element' aria-label='toggle' onClick={() => setToggleOpen(!toggleOpen)}>
						{toggle_element}
					</span>
				) : null}
				{child_items?.length ? (
					<ul ref={(e: any) => (subnavRefs.current[id] = e)} style={toggle_item ? toggle_subnav : undefined} className={open_toggle ? 'open_toggle' : ''}>
						{child_items.map((item) => navItem(item))}
					</ul>
				) : null}
				{li_children}
			</>
		);
	};

	const navItem = (item: MenuItemType) => {
		const { child_items, classes, id, link } = item || {};

		const toggle_item = classes?.includes('toggle') || false;
		const open_toggle = toggle_item && toggleOpen;

		return (
			<Suspense
				key={`nav_item-${id}`}
				fallback={
					<li key={`nav_item-${id}`} className={`${classes.toString().replace(/,/g, ' ')}${open_toggle ? ' open' : ''}${child_items?.length ? ' child_items' : ''}`} id={id?.toString() || ''}>
						{liContents(item)}
					</li>
				}
			>
				<NavItemWrapper className={`${classes.toString().replace(/,/g, ' ')}${open_toggle ? ' open' : ''}${child_items?.length ? ' child_items' : ''}`} id={id?.toString() || ''} url={link || ''}>
					{liContents(item)}
				</NavItemWrapper>
			</Suspense>
		);
	};

	return navItem(item);
};
export default NavItem;
