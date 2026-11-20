'use client';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { updateSearchParams } from 'lib/functions';
import { AnimateWrapper } from 'wrappers';
import Link from 'next/link';
import { Button } from 'elements';
import Image from 'next/image';
import { LoadingSVG } from 'elements/assets';
import { ArrowButtonIcon } from 'components/svg';
import { PageType, TaxonomyTermType } from 'lib/types';

import NoResults from 'components/no-results';

import { LoadMoreIcon } from 'components/svg';

const NewsResults = ({ posts_per_page }: { posts_per_page: string }) => {
	//__Hooks
	const pathname = usePathname();
	const searchParams = useSearchParams();

	//__State
	const [category, setCategory] = useState(0);
	const [loaded, setLoaded] = useState(false);
	const [page, setPage] = useState(1);
	const [results, setResults] = useState<Array<PageType>>([]);
	const [search, setSearch] = useState<string | null>('');
	const [total, setTotal] = useState(0);
	const [updating, setUpdating] = useState(true);

	//__Functions
	const update = async (offset: number, category: any, search: string | null, amount?: number) => {
		setUpdating(true);
		const query: any = {
			amount,
			category,
			offset,
			posts_per_page,
			search: search || ''
		};
		const updated = await fetch(`/api/news?query=${JSON.stringify(query)}`).then((res) => res.json());

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
		const search_param = searchParams.has('s') ? searchParams.get('s') : '';
		const category_param = searchParams.has('cat') ? parseInt(searchParams.get('cat') || '', 10) : 0;

		if (!loaded) {
			const amount = page_param * parseInt(posts_per_page, 10);
			update(0, category_param, search_param, amount);
		} else {
			//If search or filters or date are changed
			if (category_param !== category || search_param !== search) {
				update(0, category_param, search_param);
			} else if (page_param !== page) {
				const offset = (page_param - 1) * parseInt(posts_per_page, 10);
				update(offset, category_param, search_param);
			}
		}

		setSearch(search_param);
		setCategory(category_param);
		setPage(page_param);
		setLoaded(true);
	}, [searchParams]);

	return (
		<div className='flex flex-col items-center gap-10 relative'>
			<div className='self-end -mb-4 text-base-gunmetal text-base'>{total} Results</div>
			{results?.length > 0 ? (
				<div className='w-full gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:gap-10'>
					{results.map((item) => {
						const { acf, id, post_title, relative_path } = item || {};
						const { category, excerpt, grid_image } = acf || {};
						return (
							<AnimateWrapper key={`new-${id}`} animate_type='fadeup' element='div' threshold={0}>
								<Link href={relative_path} className='relative group'>
									<div className='h-[260px] relative rounded-t-3xl overflow-hidden '>{grid_image?.url ? <Image src={grid_image.url} alt={grid_image.alt} fill className='object-cover ' /> : <div className='bg-base-creamtone h-full w-full flex items-center justify-center p-10'>Add IPA logo placeholder SVG here</div>}</div>
									<div className='rounded-b-3xl bg-base-creamtone flex flex-col gap-3 transition-ease group-hover:bg-base-bronze px-8 py-7'>
										{category?.length ? (
											<div className='flex gap-1'>
												{category?.map((category_item: TaxonomyTermType) => (
													<div key={`new_type_${category_item.term_id}`} className='bg-base-bronze inline-flex px-4 py-1 rounded-full text-xs group-hover:bg-white transition-ease' dangerouslySetInnerHTML={{ __html: category_item.name }} />
												))}
											</div>
										) : null}
										<h4 className='text-md transition-ease group-hover:text-white line-clamp-2' dangerouslySetInnerHTML={{ __html: post_title }} />
										{excerpt ? <div className='mt-6' dangerouslySetInnerHTML={{ __html: excerpt }} /> : null}
										<div className='flex flex-col grow justify-end mt-2'>
											<div className='arrow_link group-hover:text-white'>
												<ArrowButtonIcon width={24} className='group-hover:opacity-100' /> Read More
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
			{results?.length === 0 && !updating ? <NoResults /> : null}
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

export default NewsResults;
