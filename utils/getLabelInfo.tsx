export const getLabelInfo = (labelType?: string) => {
	const labelMap: Record<string, { title: string; color: string }> = {
		available: { title: 'Available', color: '#8BCF8B' },
		closed: { title: 'Closed', color: '#FF876C' },
		'under-contract': { title: 'Under Contract', color: '#FFC574' }
	};

	return labelType ? labelMap[labelType] : null;
};
