'use client';
import { memo, useEffect, useRef, useState } from 'react';
import { ImageType, LinkType } from 'lib/types';

type ItemType = {
	background_image?: ImageType;
	columns: boolean;
	column_1?: { content?: string; cta?: LinkType; cta_icon_image?: ImageType; heading?: string; subheading?: string };
	column_2?: { content?: string; cta?: LinkType; cta_icon_image?: ImageType; heading?: string; subheading?: string };
	content?: string;
	cta?: LinkType;
	cta_icon_image?: ImageType;
	heading?: string;
	subheading?: string;
};

const ParallaxContentTabs = ({ blocks, sectionId, headerOffset = 0, bottomOffset = 0 }: { blocks: ItemType[]; sectionId?: string; headerOffset: number; bottomOffset: number }) => {
	const [show, setShow] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);

	const barRef = useRef<HTMLDivElement | null>(null);
	const lockRef = useRef<{ active: boolean; targetIdx: number | null; cancel?: () => void }>({ active: false, targetIdx: null });

	const getSection = () => (sectionId ? document.getElementById(sectionId) : null);
	const getBlockEl = (i: number) => document.getElementById(`parallax_column_${i}`);
	const getBlocks = () => (blocks || []).map((_, i) => getBlockEl(i)).filter(Boolean) as HTMLElement[];

	const computeShow = (section: HTMLElement) => {
		const rect = section.getBoundingClientRect();
		const topReached = rect.top <= headerOffset;
		const bottomNotReached = rect.bottom >= window.innerHeight - bottomOffset;
		return topReached && bottomNotReached;
	};

	const activationRatio = 0.5;
	const activationY = () => headerOffset + window.innerHeight * activationRatio;

	const computeActiveIndexByTopTouch = () => {
		const els = getBlocks();
		const threshold = activationY();
		let candidate = 0;
		for (let i = 0; i < els.length; i++) {
			const top = els[i].getBoundingClientRect().top;
			if (top <= threshold) candidate = i;
		}
		return candidate;
	};

	const scrollActiveTabIntoView = () => {
		const bar = barRef.current;
		if (!bar) return;
		const link = bar.querySelector<HTMLAnchorElement>(`a[data-tab-index="${activeIndex}"]`);
		if (!link) return;

		const target = link.offsetLeft + link.offsetWidth / 2 - bar.clientWidth / 2;
		const max = bar.scrollWidth - bar.clientWidth;
		const clamped = Math.max(0, Math.min(max, target));
		bar.scrollTo({ left: clamped, behavior: 'smooth' });
	};

	useEffect(() => {
		const section = getSection();
		if (!section) return;

		let ticking = false;

		const update = () => {
			setShow(computeShow(section));
			if (!lockRef.current.active) {
				const idx = computeActiveIndexByTopTouch();
				setActiveIndex((prev) => (prev !== idx ? idx : prev));
			}
		};

		const onScrollOrResize = () => {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(() => {
				update();
				ticking = false;
			});
		};

		update();
		window.addEventListener('scroll', onScrollOrResize, { passive: true });
		window.addEventListener('resize', onScrollOrResize);

		const onScrollEnd = () => {
			if (lockRef.current.active) {
				lockRef.current.active = false;
				lockRef.current.targetIdx = null;
				lockRef.current.cancel?.();
				lockRef.current.cancel = undefined;
			}
			update();
		};
		window.addEventListener?.('scrollend', onScrollEnd as any);

		return () => {
			window.removeEventListener('scroll', onScrollOrResize);
			window.removeEventListener('resize', onScrollOrResize);
			window.removeEventListener?.('scrollend', onScrollEnd as any);
		};
	}, [sectionId, blocks, headerOffset, bottomOffset]);

	useEffect(() => {
		if (!show) return;
		const id = requestAnimationFrame(scrollActiveTabIntoView);
		return () => cancelAnimationFrame(id);
	}, [activeIndex, show, blocks.length]);

	const scrollToBlock = (i: number) => {
		const el = getBlockEl(i);
		if (!el) return;

		const targetY = window.scrollY + el.getBoundingClientRect().top - headerOffset;

		lockRef.current.active = true;
		lockRef.current.targetIdx = i;
		setActiveIndex(i);

		window.scrollTo({ top: targetY, behavior: 'smooth' });

		let raf = 0;
		let timeoutId: number | undefined;

		function cancel() {
			if (raf) cancelAnimationFrame(raf);
			if (timeoutId) clearTimeout(timeoutId);
			lockRef.current.cancel = undefined;
		}

		const checkDone = () => {
			const delta = Math.abs(el.getBoundingClientRect().top - headerOffset);
			if (delta <= 2) {
				timeoutId = window.setTimeout(() => {
					lockRef.current.active = false;
					lockRef.current.targetIdx = null;
					cancel();
				}, 120);
				return;
			}
			raf = window.requestAnimationFrame(checkDone);
		};

		lockRef.current.cancel = cancel;
		raf = window.requestAnimationFrame(checkDone);

		requestAnimationFrame(scrollActiveTabIntoView);
	};

	return (
		<div
			ref={barRef}
			className={`fixed top-0 pt-21 md:pt-24 left-0 w-full px-5 lg:px-20 z-9 gap-10 flex justify-between gap-4 transition-opacity duration-200 
        ${show ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        border-b border-white/50 overflow-x-auto bg-black/10 backdrop-blur-md`}
			aria-hidden={!show}
		>
			{blocks?.map((item: ItemType, index: number) => {
				const isActive = index === activeIndex;
				const label = item?.column_1?.subheading ?? item?.column_1?.heading ?? item?.subheading;
				return (
					<a
						key={`parallax_column_tab_${index}`}
						data-tab-index={index}
						href={`#parallax_column_${index}`}
						onClick={(e) => {
							e.preventDefault();
							scrollToBlock(index);
						}}
						aria-current={isActive ? 'true' : undefined}
						className={`text-base font-bold text-center pb-2 -mb-[1px] border-b-2 transition-colors whitespace-nowrap
              ${isActive ? 'text-white border-white' : 'text-white/60 border-transparent'} hover:text-white`}
					>
						{label}
					</a>
				);
			})}
		</div>
	);
};

export default memo(ParallaxContentTabs);
