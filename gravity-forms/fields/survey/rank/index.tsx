import React, { useEffect, useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import RankItem from './item';
import { GravityFormsChoiceType } from 'lib/types';

type RankType = {
	choices: GravityFormsChoiceType[];
	handleRank: Function;
	id: string;
};

const Rank = ({ choices, id, handleRank }: RankType) => {
	//__Variables
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	);

	//__State
	const [items, setItems] = useState(choices.map((e) => e.value));

	//__Functions
	const handleDragEnd = (e: any) => {
		const { active, over } = e;

		if (active.id !== over.id) {
			setItems((items) => {
				const oldIndex = items.indexOf(active.id);
				const newIndex = items.indexOf(over.id);

				return arrayMove(items, oldIndex, newIndex);
			});
		}
	};

	//__Use Eff
	useEffect(() => {
		handleRank(items);
	}, [items]);

	if (!choices?.length) return null;
	return (
		<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
			<SortableContext items={items} strategy={verticalListSortingStrategy}>
				{items.map((item) => (
					<RankItem key={`${id}_${item}`} choice={choices.find((e) => e.value === item)} id={item} />
				))}
			</SortableContext>
		</DndContext>
	);
};

export default Rank;
