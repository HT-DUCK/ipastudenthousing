'use client';
import { useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CloseIcon, FacebookIcon, InstagramIcon, LinkedinIcon, XIcon } from 'components/svg';
import { ItemType } from '.';
import { Modal } from 'elements';

const PeopleGridModal = ({ children, className, item }: { children?: React.ReactNode; className?: string; item: ItemType }) => {
	//__Variables
	const { bio, facebook, image, instagram, linkedin, name, title, twitter_x } = item || {};

	//__State
	const [open, setOpen] = useState(false);

	//__Callbacks
	const handleModal = useCallback((value: boolean) => {
		setOpen(value);
	}, []);

	if (!item) return null;
	return (
		<div className={className} onClick={() => setOpen(true)}>
			{children}
			{open ? (
				<Modal className='modal' close_element={<CloseIcon width={24} />} handleModal={handleModal}>
					<div className='flex max-md:flex-col h-full'>
						<div className='md:w-1/2 relative max-md:pt-[100%]'>{image?.url ? <Image src={image.url} alt={image.alt} fill className='object-cover' /> : null}</div>
						<div className='p-8 md:p-16 pb-0 md:pb-0 overflow-auto md:w-1/2 [scrollbar-width:thin]'>
							<div className='h-full flex flex-col '>
								<div className='flex flex-col gap-4 md:gap-8'>
									<h2 dangerouslySetInnerHTML={{ __html: name }} />
									<div className='font-bold text-lg text-base-gunmetal/70'>{title}</div>
									{bio ? <div className='text-base text-base-gunmetal/70' dangerouslySetInnerHTML={{ __html: bio }} /> : null}
								</div>
								<div className='flex gap-2 sticky bottom-0 pt-8 bg-white pb-8 md:pb-16 modal-background-fade mt-auto'>
									{twitter_x ? (
										<Link href={twitter_x} target='_blank' className=' hover:text-base-gunmetal'>
											<XIcon width={20} />
										</Link>
									) : null}
									{linkedin ? (
										<Link href={linkedin} target='_blank' className='hover:text-base-gunmetal'>
											<LinkedinIcon width={20} />
										</Link>
									) : null}
									{facebook ? (
										<Link href={facebook} target='_blank'>
											<FacebookIcon width={20} />
										</Link>
									) : null}
									{instagram ? (
										<Link href={instagram} target='_blank'>
											<InstagramIcon width={20} />
										</Link>
									) : null}
								</div>
							</div>
						</div>
					</div>
				</Modal>
			) : null}
		</div>
	);
};

export default PeopleGridModal;
