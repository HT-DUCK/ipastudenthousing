'use client';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { updateSearchParams } from 'lib/functions';
import { AnimateWrapper } from 'wrappers';
import { Button } from 'elements';
import Image from 'next/image';
import { PageType } from 'lib/types';
import { LoadingSVG } from 'elements/assets';
import { getLabelInfo } from 'utils/getLabelInfo';
import NoResults from 'components/no-results';
import Link from 'next/link';

import { CalendarIcon, PinIcon, KeyIcon, BadIcon, LoadMoreIcon } from 'components/svg';

const PropertiesResults = ({ default_category = 0 }: { default_category?: number }) => {
	//__Variables
	const posts_per_page = 9;

	//__Hooks
	const pathname = usePathname();
	const searchParams = useSearchParams();

	//__State
	const [category, setCategory] = useState(default_category);
	const [loaded, setLoaded] = useState(false);
	const [page, setPage] = useState(1);
	const [results, setResults] = useState<Array<PageType>>([]);
	const [search, setSearch] = useState<string | null>('');
	const [total, setTotal] = useState(0);
	const [updating, setUpdating] = useState(true);

	//__Functions
	const update = async (offset: number, property_category: any, search: string | null, amount?: number) => {
		setUpdating(true);
		const query: any = {
			amount,
			property_category,
			offset,
			posts_per_page,
			search: search || ''
		};

		const updated = await fetch(`/api/properties?query=${JSON.stringify(query)}`).then((res) => res.json());

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
		const category_param = searchParams.has('cat') ? parseInt(searchParams.get('cat') || '', 10) : default_category;

		if (!loaded) {
			const amount = page_param * posts_per_page;
			update(0, category_param, search_param, amount);
		} else {
			//If category are changed
			if (category_param !== category || search_param !== search) {
				update(0, category_param, search_param);
			} else if (page_param !== page) {
				const offset = (page_param - 1) * posts_per_page;
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
				<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-5 xl:gap-10'>
					{results.map((item: PageType) => {
						const { id, post_title, acf } = item || {};
						const { grid_image, label_type, subtitle, location, units, Beds, year_built, property_categ } = acf || {};
						const labelInfo = property_categ && property_categ?.[0].slug === 'recent-transactions' ? getLabelInfo('closed') : getLabelInfo(label_type);

						return (
							<AnimateWrapper key={`resource-${id}`} animate_type='fade' element='div' threshold={0.1}>
								<Link href={item.relative_path} className='rounded-3xl overflow-hidden relative md:min-h-115 flex group max-md:flex-col md:p-10 lg:p-5 xl:p-10'>
									<div className='max-md:w-full max-md:relative max-md:pt-[77.7%]'>{grid_image?.url ? <Image src={grid_image.url} alt={grid_image.alt} fill className='object-cover md:group-hover:scale-110 transition-transform duration-300 ease-out pointer-events-none' /> : null}</div>
									<div className='absolute bg-gradient-to-b bottom-0 from-black/0 h-[250px] left-0 opacity-50 to-black w-full max-md:hidden' />
									<div className='md:mt-auto max-md:bg-base-creamtone xs:max-md:p-8 max-md:text-black max-xs:p-5'>
										<div className='flex flex-col gap-3 md:gap-4 relative z-2'>
											{labelInfo ? (
												<div className='text-xs px-4 py-1 rounded-full bg-[#8BCF8B] text-black w-max max-md:text-black' style={{ backgroundColor: labelInfo?.color }}>
													{labelInfo?.title}
												</div>
											) : null}
											{post_title ? <h3 className='h4 md:text-white  line-clamp-2'>{post_title}</h3> : null}
										</div>
										{subtitle || location || Beds || units || year_built ? (
											<div className='md:absolute md:top-0 md:left-0 w-full md:h-full z-10 md:p-5 max-md:mt-3 md:pointer-events-none'>
												<div className='back-blur transform-translate-y-100 group-hover:transform-translate-y-0 md:bg-gray-blur rounded-xl md:px-8 lg:px-4 xl:px-8 md:pb-8 md:pt-6 w-full md:text-white max-md:flex max-md:flex-col max-md:gap-6 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 md:pointer-events-none md:group-hover:pointer-events-auto'>
													{subtitle ? <h4 className='max-md:h4 md:font-medium  line-clamp-2' dangerouslySetInnerHTML={{ __html: subtitle }} /> : null}
													{location ? (
														<div className='text-base flex gap-2 items-start md:mt-3 max-md:-order-1'>
															<span className='flex mt-[2px] min-w-5'>
																<PinIcon width={20} />
															</span>
															<p>{location}</p>
														</div>
													) : null}
													{Beds || units || year_built ? (
														<div className='flex gap-2 md:mt-6'>
															{units ? (
																<div className='flex w-full flex-col gap-2'>
																	<div className='text-xs flex gap-2 items-center'>
																		<KeyIcon width={20} />
																		<p className='max-md:text-base-black-50'>Units</p>
																	</div>
																	<p className='h5'>{units}</p>
																</div>
															) : null}
															{Beds ? (
																<div className='flex w-full flex-col gap-2'>
																	<div className='text-xs flex gap-2 items-center'>
																		<BadIcon width={20} />
																		<p className='max-md:text-base-black-50'>Beds</p>
																	</div>
																	<p className='h5'>{Beds}</p>
																</div>
															) : null}
															{year_built ? (
																<div className='flex w-full flex-col gap-2'>
																	<div className='text-xs flex gap-2 items-center max-md:text-base-black'>
																		<CalendarIcon width={20} className='opacity-60' />
																		<p className='max-md:text-base-black-50'>Year Built</p>
																	</div>
																	<p className='h5'>{year_built}</p>
																</div>
															) : null}
														</div>
													) : null}
												</div>
											</div>
										) : null}
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
				<div className='text-center mr-auto max-md:w-full'>
					<Button className='btn cursor-pointer bronze max-md:w-full max-md:justify-center' link={{ title: 'Load More', url: '' }} onClick={() => updatePage()}>
						<LoadMoreIcon width={20} />
					</Button>
				</div>
			) : null}
		</div>
	);
};

export default PropertiesResults;
