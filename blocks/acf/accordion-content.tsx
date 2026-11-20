'use client';
import { useState } from 'react';

type ItemType = {
	content?: string;
	title: string;
};

type DataType = {
	content?: string;
	custom_class?: string;
	heading?: string;
	items?: Array<ItemType>;
	sec_anchor_name?: string;
};

const AccordionContent = ({ data }: { data: DataType }) => {
	//__Variables
	const { content, heading, items, custom_class, sec_anchor_name } = data || {};

	//__State
	const [open, setOpen] = useState<number[]>([]);

	//__Functions
	const updateOpen = (index: number) => {
		let open_copy = [...open];
		if (open_copy.includes(index)) {
			open_copy = open_copy.filter((e) => e !== index);
		} else {
			open_copy.push(index);
		}
		setOpen(open_copy);
	};

	if (!data || !items?.length) return null;
	return (
		<section className={`gutter-x my-16 lg:my-28${custom_class ? ` ${custom_class}` : ''}`} id={sec_anchor_name}>
			<div className='inner text-center'>
				{heading ? <h2 className='md:mb-7' dangerouslySetInnerHTML={{ __html: heading }} /> : null}
				{content ? <div className='mb-11 text-[17px] md:mb-14 md:text-xl' dangerouslySetInnerHTML={{ __html: content }} /> : null}
			</div>
			<div className='flex flex-col gap-3 mx-auto max-w-[800px]'>
				{items.map((item: ItemType, index: number) => {
					const { content, title } = item || {};
					return (
						<div key={`accordion_${index}`} className={`px-6 py-5 rounded-tr-3xl md:px-8 ${open.includes(index) ? 'bg-white shadow-2xl' : 'bg-primary text-white'}`}>
							<div className='cursor-pointer flex gap-2 items-center justify-between' onClick={() => updateOpen(index)}>
								<div className='font-semibold text-xl md:text-2xl' dangerouslySetInnerHTML={{ __html: title }} />
								{open.includes(index) ? '-' : '+'}
							</div>
							{content ? <div className={`overflow-hidden transition-ease ${open.includes(index) ? 'max-h-[1000px] mt-3' : 'max-h-0 mt-0'}`} dangerouslySetInnerHTML={{ __html: content }} /> : null}
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default AccordionContent;
