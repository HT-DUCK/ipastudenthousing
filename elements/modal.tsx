'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type ModalType = {
	children: React.ReactNode;
	className?: string;
	close_element?: React.ReactNode;
	handleModal: (show: boolean) => void;
	position?: 'fixed' | 'absolute';
	style?: React.CSSProperties;
};

const Modal = ({ children, className, close_element, position = 'fixed', style, handleModal }: ModalType) => {
	const [show, setShow] = useState(false);
	const [topOffset, setTopOffset] = useState(0);

	//Delay show to allow for animation
	useEffect(() => {
		if (position === 'fixed') {
			document.body.style.overflow = 'hidden';
			document.body.style.height = '100%';
			document.body.classList.add('modal_open');
		}

		setTimeout(() => {
			setShow(true);
			setTopOffset(window.scrollY);
		}, 50);
	}, []);

	const close = () => {
		setShow(false);
		//Wait for animation before unmounting Modal
		setTimeout(() => {
			document.body.style.overflow = 'unset';
			document.body.style.height = 'unset';
			document.body.classList.remove('modal_open');
			handleModal(false);
		}, 500);
	};

	const inlineStyles = {
		modal: {
			position,
			top: position === 'absolute' ? topOffset : ''
		}
	};

	return createPortal(
		<div className={`${className} ${show ? 'show' : ''}`} style={style}>
			<div className='backdrop' onClick={() => close()} />
			<div className='box' style={inlineStyles.modal}>
				{children}
				<div className='close' onClick={() => close()} role='button'>
					{close_element}
				</div>
			</div>
		</div>,
		document.body
	);
};

export default Modal;
