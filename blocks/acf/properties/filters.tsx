'use client';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { updateSearchParams } from 'lib/functions';
import { TaxonomyTermType } from 'lib/types';
import { ArrowIcon } from 'components/svg';

const PropertiesFilters = ({ categories }: { categories: Array<TaxonomyTermType> }) => {
	//__Hooks
	const pathname = usePathname();
	const searchParams = useSearchParams();

	//__State
	const [category, setCategory] = useState(0);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	//__Use Effect

	useEffect(() => {
		const category_param = searchParams.has('cat') ? parseInt(searchParams.get('cat') || '', 10) : 0;
		if (category_param) {
			setCategory(category_param);
		}
	}, [searchParams]);

	//__Functions
	const toggle = (term_id: number) => {
		setCategory(term_id);
		setDropdownOpen(false);
		window.history.pushState(null, '', `${pathname}?${updateSearchParams(searchParams.toString(), 'cat', term_id === 0 ? '' : term_id.toString(), 'p')}`);
	};

	return (
		<>
			<div className='md:hidden relative w-full'>
				<button onClick={() => setDropdownOpen(!dropdownOpen)} className='btn border_secondary w-full justify-between items-center text-left'>
					{category === 0 ? 'View All' : categories.find((c) => c.term_id === category)?.name}
					<ArrowIcon width={20} />
				</button>
				{dropdownOpen ? (
					<div className='flex flex-col gap-4 absolute left-0 top-full w-full p-8 rounded-3xl bg-white text-black text-base z-5 shadow-main'>
						{categories.map((term) =>
							term.count > 0 ? (
								<div key={term.term_id} onClick={() => toggle(term.term_id)} className={`hover:text-main-electric-blue ${category === term.term_id ? 'text-main-electric-blue' : ''}`}>
									<span dangerouslySetInnerHTML={{ __html: term.name }} />
								</div>
							) : null
						)}
						<div onClick={() => toggle(0)} className={` hover:text-main-electric-blue ${category === 0 ? 'text-main-electric-blue' : ''}`}>
							View All
						</div>
					</div>
				) : null}
			</div>
			<div className='flex gap-2 justify-start items-center max-md:hidden'>
				{categories.length ? (
					<>
						{categories.map((term) =>
							term.count > 0 ? (
								<div key={`term_${term.slug}`} className='relative group'>
									<input className='sr-only ' type='radio' id={`term_${term.term_id}`} name='resource_category' value={term.term_id} checked={category === term.term_id} onChange={() => toggle(term.term_id)} />
									<label className={`btn border_secondary ${String(category) === String(term.term_id) ? 'active' : ''}`} htmlFor={`term_${term.term_id}`}>
										<span dangerouslySetInnerHTML={{ __html: term.name }} />
									</label>
								</div>
							) : null
						)}
						<div className='relative group'>
							<input className='sr-only ' type='radio' id={`term_0`} name='resource_category' value={0} checked={category === 0} onChange={() => toggle(0)} />
							<label className={`btn border_secondary ${category === 0 ? 'active' : null}`} htmlFor='term_0'>
								View All
							</label>
						</div>
					</>
				) : null}
			</div>
		</>
	);
};

export default PropertiesFilters;
