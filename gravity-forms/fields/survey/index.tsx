import { useState, useEffect, useCallback } from 'react';
import Rank from './rank';
import { GravityFormsFieldPropsType } from 'lib/types';
import { ExclamationCircle, InfoCircle } from 'flowbite-react-icons/outline';

const Survey = ({ field, className = '', onChange, attempt, submitted }: GravityFormsFieldPropsType) => {
	//__Variables
	const id = field.id && field.formId ? `input_${field.formId}_${field.id}` : `input_${field.id}`;
	const name = field.id && field.id?.toString().indexOf('.') >= 0 ? `${field.label.toLowerCase().replace(' ', '')}_${field.id}` : `input_${field.id}`;
	const label = field.placeholder || field.label || null;
	const adminClasses = field.cssClass ? field.cssClass.split(' ') : [];
	const visible = field.visibility === 'visible' || !field.visibility;

	//__State
	const [value, setValue] = useState(field.defaultValue || '');
	const [invalid, setInvalid] = useState<boolean>(true);

	//__Use Effect
	//Reset Value if defaultValue is updated
	useEffect(() => {
		setValue(field.defaultValue || '');
	}, [field.defaultValue, field.type]);

	//Reset Value when form is submitted
	useEffect(() => {
		if (submitted) {
			setValue(field.defaultValue || '');
		}
	}, [submitted]);

	//Send data to Form when field is updated
	useEffect(() => {
		let valid = true;
		if (field.isRequired) {
			if (value === '') {
				valid = false;
			}
		}

		setInvalid(!valid);

		onChange({ name, value, valid });
	}, [value]);

	//__Callbacks
	const handleRank = useCallback((value: []) => {
		setValue(value.toString());
	}, []);

	if (!field) return null;
	return (
		<div className={`form_field form_field_survey ${className}${adminClasses.length ? ` ${adminClasses}` : ''}${!visible ? ' hidden' : ''}${invalid && attempt ? ' invalid' : ''}`}>
			{field.labelPlacement !== 'hidden_label' ? (
				<label htmlFor={id} className='form_label'>
					{field.isRequired ? <span className='text-red-600'>*</span> : ''}
					{label}
				</label>
			) : null}
			{field.inputType === 'rank' ? <Rank id={id} choices={field.choices} handleRank={handleRank} /> : null}
			<input type='hidden' id={id} name={name} placeholder={field.placeholder} value={value} className='form_input' />
			{invalid && attempt ? (
				<div className='form_invalid_msg'>
					<ExclamationCircle size={18} />
					{field.errorMessage || `A valid ${label} is required`}
				</div>
			) : null}
			{field.description ? (
				<div className='form_field_description'>
					<InfoCircle size={18} />
					<div dangerouslySetInnerHTML={{ __html: field.description }} />
				</div>
			) : null}
		</div>
	);
};

export default Survey;
