import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GravityFormsChoiceType } from 'lib/types';
import { ChevronSort } from 'flowbite-react-icons/outline';

const RankItem = ({ choice, id }: { choice?: GravityFormsChoiceType; id: string }) => {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition
	};

	if (!choice) return null;
	return (
		<div className='form_rank_item' ref={setNodeRef} style={style} {...attributes} {...listeners}>
			<ChevronSort size={18} className='text-grey' />
			{choice.text}
		</div>
	);
};

export default RankItem;
