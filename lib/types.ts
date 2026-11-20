import { HTMLAttributeAnchorTarget } from 'react';

export interface YoastType {
	article_modified_time: string;
	description: string;
	og_image?: {
		height: number;
		type: string;
		url: string;
		width: number;
	}[];
	og_locale: string;
	og_site_name: string;
	og_title: string;
	og_type: 'website' | 'article' | 'book' | 'profile' | 'music.song' | 'music.album' | 'music.playlist' | 'music.radio_station' | 'video.movie' | 'video.episode' | 'video.tv_show' | 'video.other' | undefined;
	og_url: string;
	robots: {
		index: string;
		follow: string;
		nocache: string;
	};
	title: string | undefined;
	twitter_card: any;
}

export interface ScriptType {
	code?: string | null;
	html?: string | null;
	id?: string | null;
	strategy: 'afterInteractive' | 'lazyOnload' | 'beforeInteractive';
	source?: string | null;
	type: string;
}

export interface PageType {
	acf: any;
	author: {
		id: number | string;
		name: string;
	};
	blocks: any;
	child_posts: PageType[];
	content: string;
	excerpt: string;
	id: number | string;
	link: string;
	menu_order: number | string;
	parent: number | string;
	parentObj: PageType;
	post_date: string;
	post_modified: string;
	post_title: string;
	relative_path: string;
	slug: string;
	type: string;
	yoast_json: YoastType;
}

export interface LocationType {
	address: string;
	city: string;
	country: string;
	country_short: string;
	lat: number;
	lng: number;
	name?: string;
	place_id?: string;
	post_code: string;
	state: string;
	state_short: string;
	street_name: string;
	street_name_short: string;
	street_number: string;
	zoom: number;
}

export interface SvgType {
	className?: string;
	fill?: string;
	height?: string | number;
	hidden?: boolean;
	label?: string;
	opacity?: string;
	stroke?: string;
	width?: string | number;
}

export interface LinkType {
	rel?: string | null;
	target?: HTMLAttributeAnchorTarget | null;
	title: string;
	url?: string | null;
}

export interface MenuItemType {
	acf: any;
	attr_title?: string;
	child_items: MenuItemType[];
	classes: string[];
	db_id?: number;
	description?: string;
	id: number | string;
	link: string;
	menu_item_parent?: string;
	menu_order: number;
	object?: string;
	object_id?: string;
	post_parent?: number;
	post_status?: string;
	target: string;
	title: string;
	url: string;
}

export interface ImageType {
	caption?: string;
	id: number | string;
	url: string;
	width: number;
	height: number;
	alt: string;
	link: LinkType | null;
	mime_type: string;
	svg_code: string;
	thumbnail: string;
	medium: string;
}

export interface PositionType {
	horizontal?: string | number;
	vertical?: string | number;
	mobile_horizontal?: string | number;
	mobile_vertical?: string | number;
}

export interface FileType {
	url: string;
	meta: any;
	filename: string;
	webm?: {
		url: string;
	};
	ogg?: {
		url: string;
	};
	fallback_image?: ImageType;
}

export interface VideoType {
	video_type: string;
	play_type?: string;
	file: FileType;
	controls?: boolean;
	autoplay?: boolean;
	muted?: boolean;
	loop?: boolean;
	video_embed_code?: string;
	fallback_image?: ImageType;
}

export interface MediaType {
	caption?: string | null;
	media_type: 'image' | 'images' | 'text' | 'video';
	overlay?: string | null;
	image?: {
		image: ImageType;
		link?: LinkType;
		mobile_image?: ImageType;
		position: PositionType;
	};
	video?: VideoType;
}

export interface CoreBlockAttrsType {
	align?: 'left' | 'right' | 'center';
	backgroundColor?: string;
	className?: string;
	fontSize?: string;
	height?: string;
	id?: number;
	image: ImageType;
	layout?: {
		flexWrap?: string;
		justifyContent?: string;
		orientation?: string;
	};
	level?: string;
	ordered?: string;
	reversed?: boolean;
	sizeSlug: string;
	start?: number;
	style?: {
		border?: {
			radius?: string;
		};
		color?: {
			background?: string;
			text?: string;
		};
		fontSize?: string;
		typography?: {
			fontSize?: string;
		};
	};
	textColor?: string;
	type?: string;
	url?: string;
	width?: number | string;
}

export interface CoreBlockType {
	id: string;
	attrs: CoreBlockAttrsType;
	blockName: string;
	innerBlocks: CoreBlockType[];
	innerContent: string[] | null[];
	innerHTML?: string;
}

export type ParalaxBlockType = {
	button: LinkType;
	image: ImageType;
	description_wysiwyg: string;
	title: string;
};

export type AlternatingRowsType = {
	background_color?: string;
	content: {
		content?: string;
		cta?: LinkType;
		cta_style?: string;
		heading?: string;
		heading_tag: string;
		subheading_additional?: string;
		subheading?: string;
		subheading_bg_color?: string;
		subheading_color?: string;
	};
	media: MediaType;
	text_color?: string;
};

export interface GravityFormsConditionalLogicType {
	actionType: 'show' | 'hide';
	enabled: boolean;
	logicType: 'all' | 'any';
	rules: {
		fieldId: string;
		operator: 'is' | 'isnot' | '>' | '<' | 'contains' | 'starts_with' | 'ends_with';
		value: string;
	}[];
}

export interface GravityFormsChoiceType {
	isSelected?: boolean;
	price: string;
	text: string;
	value: string;
}

export interface GravityFormsFieldType {
	adminLabel: string;
	allowedExtensions?: string;
	checkboxLabel?: string;
	content?: string;
	choices: GravityFormsChoiceType[];
	conditionalLogic?: GravityFormsConditionalLogicType;
	cssClass: string;
	defaultValue?: string | null;
	description: string;
	errorMessage: string;
	formId: number;
	id: number;
	inputName: string;
	inputs: any[];
	inputType: string;
	isRequired: boolean;
	label: string;
	labelPlacement?: string;
	layoutGridColumnSpan: number;
	layoutGroupId?: string;
	maxFiles: string;
	maxFileSize?: number;
	maxLength: number;
	multipleFiles: boolean;
	phoneFormat?: string;
	placeholder: string;
	size?: string;
	type: string;
	visibility: string;
}

export interface FileUploadType {
	file_icon?: React.ReactNode;
	remove_icon?: React.ReactNode;
	show_file_size?: boolean;
	upload_icon?: React.ReactNode;
}

export interface GravityFormsFieldPropsType {
	attempt: boolean;
	bypass_validation?: boolean;
	className?: string;
	extra_valid?: boolean;
	field: GravityFormsFieldType;
	file_upload?: FileUploadType;
	multipleUploadFiles?: { label: string; files: any[] } | null;
	onChange: Function;
	submitted: boolean;
	validation?: string;
}

export interface GravityFormsConditionalFieldType {
	conditionalLogic: GravityFormsConditionalLogicType;
	id: number;
	name: string;
	type: string;
	visible: boolean;
}

export interface GravityFormsSubmitType {
	children?: React.ReactNode;
	text?: string;
	disabled?: boolean;
	submitting?: boolean;
	className?: string;
	buttonClass?: string;
}

export interface GravityFormsType {
	id: number;
	fields: GravityFormsFieldType[];
	button: {
		type: string;
		text: string;
		imageUrl: string;
		width: string;
		location: string;
		layoutGridColumnSpan: number;
		id: string;
	};
	title: string;
	description: string;
	enableHoneypot: boolean;
	cssClass: string;
}

export interface FieldValueType {
	name: string;
	value: string | boolean;
	valid: boolean;
	type?: string;
}

export interface TaxonomyTermType {
	acf?: any;
	count: number;
	description?: string;
	name: string;
	slug: string;
	taxonomy: string;
	term_id: number;
	yoast_json?: YoastType;
}
