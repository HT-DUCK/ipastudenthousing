'use client';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { updateSearchParams } from 'lib/functions';

import { CloseIcon, SearchIcon } from 'components/svg';

const NewsSearch = ({}) => {
	//__Hooks
	const pathname = usePathname();
	const searchParams = useSearchParams();

	//__State
	const [value, setValue] = useState('');

	//__Use Effect
	//Update value state if searchParams present
	useEffect(() => {
		if (searchParams?.has('s') && value !== searchParams.get('s')) {
			setValue(searchParams.get('s') || '');
		}
	}, [searchParams]);

	//__Functions
	const change = (e: React.ChangeEvent<HTMLInputElement>) => {
		const field = e.target;
		setValue(field.value);
	};
	const focus = (e: React.ChangeEvent<HTMLInputElement>) => {
		change(e);
	};

	const submit = (e: any) => {
		e.preventDefault();
		if (value !== searchParams.get('s')) {
			window.history.pushState(null, '', `${pathname}?${updateSearchParams(searchParams.toString(), 's', value, 'p')}`);
		}
	};

	const clear = () => {
		setValue('');
		if (searchParams?.has('s')) {
			window.history.pushState(null, '', `${pathname}?${updateSearchParams(searchParams.toString(), 's', '', 'p')}`);
		}
	};

	return (
		<form onSubmit={submit} noValidate>
			<div className='relative'>
				<div className='overflow-hidden'>
					<input type='text' id='news_search_bar' name='news_search_bar' placeholder='Search' className='input-search' value={value} onChange={(e) => change(e)} onFocus={focus} />
					{value !== '' ? (
						<span className='absolute cursor-pointer m-auto top-[50%] translate-y-[-50%] right-7' role='button' onClick={() => clear()}>
							<CloseIcon width={24} />
							<span className='hidden'>Close</span>
						</span>
					) : null}
				</div>
				<button className='absolute bottom-0 left-7 top-0' type='submit'>
					<SearchIcon width={18} />
				</button>
			</div>
		</form>
	);
};

export default NewsSearch;
