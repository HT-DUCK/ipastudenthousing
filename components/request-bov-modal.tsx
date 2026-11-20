'use client';
import { useEffect, useState } from 'react';

import { CloseIcon } from './svg';
import { GravityFormsType } from 'lib/types';
import { Suspense } from 'react';
import GravityForm from 'gravity-forms';
import { LoadingSVG } from 'elements/assets';

const RequestBlock = ({ form }: { form: GravityFormsType }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [show, setShow] = useState(false);

	const closeModal = () => {
		setShow(false);
		//Wait for animation before unmounting
		setTimeout(() => {
			setIsOpen(false);
			history.replaceState(null, '', '#');
		}, 500);
	};

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement;

			if (target.closest && target.closest('a[href="#request-bov"]')) {
				e.preventDefault();
				setIsOpen(true);
			}
		};

		document.addEventListener('click', handleClick);

		return () => {
			document.removeEventListener('click', handleClick);
		};
	}, []);

	useEffect(() => {
		if (isOpen) {
			setTimeout(() => {
				setShow(true);
			}, 50);
		}
	}, [isOpen]);

	useEffect(() => {
		if (show) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}, [show]);

	if (!isOpen) return null;
	return (
		<div className={`fixed top-0 left-0 w-full h-[100dvh] z-100 px-5 py-8 md:px-0 md:py-0 ${!isOpen ? 'pointer-events-none' : ''}`}>
			<div className={`absolute w-full top-0 left-0 h-full bg-black z-1 ${show ? 'opacity-50' : 'opacity-0'}`} onClick={closeModal} />
			<div className={`max-w-[680px] mx-auto w-full rounded-3xl px-6 py-10 h-full overflow-y-auto relative z-2 bg-white md:mr-0 md:rounded-none md:px-16 transition-ease ${show ? 'md:translate-x-0 opacity-100' : 'md:translate-x-full opacity-0'}`}>
				<button type='button' onClick={closeModal} className='transition-ease absolute top-4 right-4 md:top-8 md:right-8 cursor-pointer text-[#808080] hover:text-black'>
					<CloseIcon width={24} />
				</button>
				<Suspense fallback={<LoadingSVG />}>
					<GravityForm form={form} className='request_form default-form' form_title_tag='h2' />
				</Suspense>
			</div>
		</div>
	);
};

export default RequestBlock;
