'use client';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { updateSearchParams } from 'lib/functions';
import { AnimateWrapper } from 'wrappers';
import dateFormat from 'dateformat';
import Link from 'next/link';
import { Button } from 'elements';
import Image from 'next/image';
import { LoadingSVG } from 'elements/assets';
import { ArrowButtonIcon, CalendarIcon, ClockIcon, LoadMoreIcon } from 'components/svg';
import { PageType } from 'lib/types';

const EventsResults = ({ posts_per_page }: { posts_per_page: string }) => {
	//__Hooks
	const pathname = usePathname();
	const searchParams = useSearchParams();

	//__State
	const [loaded, setLoaded] = useState(false);
	const [page, setPage] = useState(1);
	const [results, setResults] = useState<Array<PageType>>([]);
	const [total, setTotal] = useState(0);
	const [updating, setUpdating] = useState(false);

	//__Functions
	const update = async (offset: number, amount?: number) => {
		setUpdating(true);
		const query: any = {
			amount,
			offset,
			posts_per_page
		};
		const updated = await fetch(`/api/events?query=${JSON.stringify(query)}`).then((res) => res.json());

		if (offset === 0) {
			//Reset results
			setResults(updated?.posts);
		} else {
			//Append new results to existing results
			if (updated?.posts?.length) {
				setResults((results) => [...results, ...updated?.posts]);
			}
		}
		setTotal(updated.total || 0);
		setUpdating(false);
	};

	const updatePage = () => {
		const new_page = page + 1;
		if (new_page.toString() !== searchParams.get('p')) {
			window.history.pushState(null, '', `${pathname}?${updateSearchParams(searchParams.toString(), 'p', new_page === 1 ? '' : new_page)}`);
		}
	};

	//__Use Effect
	useEffect(() => {
		const page_param = searchParams.has('p') ? parseInt(searchParams.get('p') || '', 10) : 1;

		if (!loaded) {
			const amount = page_param * parseInt(posts_per_page, 10);
			update(0, amount);
		} else {
			//If search or filters or date are changed
			if (page_param !== page) {
				const offset = (page_param - 1) * parseInt(posts_per_page, 10);
				update(offset);
			}
		}

		setPage(page_param);
		setLoaded(true);
	}, [searchParams]);

	return (
		<div className='flex flex-col items-center gap-10 relative'>
			{/* <div className='self-end -mb-4 text-base-gunmetal text-sm'>{total} Results</div> */}
			{results?.length ? (
				<div className='gap-5 grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:gap-10'>
					{results.map((item) => {
						const { acf, id, post_title, relative_path } = item || {};
						const { end_date, event_time, excerpt, grid_image, start_date } = acf || {};
						return (
							<AnimateWrapper key={`event-${id}`} animate_type='fadeup' element='div'>
								<Link href={relative_path} className='flex flex-col h-full w-full relative group'>
									<div className='h-[260px] relative rounded-t-3xl overflow-hidden '>{grid_image?.url ? <Image src={grid_image.url} alt={grid_image.alt} fill className='object-cover ' /> : <div className='bg-base-creamtone h-full w-full flex items-center justify-center p-10'>Add IPA logo placeholder SVG here</div>}</div>
									<div className='rounded-b-3xl bg-base-creamtone flex flex-col gap-3 transition-ease group-hover:bg-base-bronze px-8 py-7 grow-1'>
										<h4 className='text-md transition-ease group-hover:text-white line-clamp-2' dangerouslySetInnerHTML={{ __html: post_title }} />
										<div className='flex flex-wrap gap-x-6 gap-y-2 text-base text-black/50 group-hover:text-white transition-ease'>
											{start_date ? (
												<div className='flex gap-2 items-start shrink-0'>
													<CalendarIcon width={24} />
													{dateFormat(start_date.replace(/-/g, '/'), 'mmm d, yyyy')}
													{end_date && end_date !== start_date ? ` - ${dateFormat(end_date.replace(/-/g, '/'), 'mmm d, yyyy')}` : ''}
												</div>
											) : null}
											{event_time ? (
												<div className='flex gap-2 items-start'>
													<ClockIcon width={22} />
													{event_time}
												</div>
											) : null}
										</div>
										{excerpt ? <div className='mt-6' dangerouslySetInnerHTML={{ __html: excerpt }} /> : null}
										<div className='flex flex-col grow justify-end mt-2'>
											<div className='arrow_link group-hover:text-white'>
												<ArrowButtonIcon width={24} className='group-hover:opacity-100' /> View Event
											</div>
										</div>
									</div>
								</Link>
							</AnimateWrapper>
						);
					})}
				</div>
			) : null}
			{updating ? (
				<div className='flex justify-center top-0 w-full'>
					<LoadingSVG width={200} fill='#242c32' />
				</div>
			) : null}
			{results?.length < total ? (
				<div className='text-center mx-auto max-md:w-full'>
					<Button className='btn cursor-pointer bronze max-md:w-full max-md:justify-center' link={{ title: 'Load More', url: '' }} onClick={() => updatePage()}>
						<LoadMoreIcon width={20} />
					</Button>
				</div>
			) : null}
		</div>
	);
};

export default EventsResults;
