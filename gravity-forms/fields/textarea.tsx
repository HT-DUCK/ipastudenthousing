import React, { useState, useEffect } from 'react';
import { GravityFormsFieldPropsType } from 'lib/types';
import { ExclamationCircle, InfoCircle } from 'flowbite-react-icons/outline';

const Textarea = ({ field, className = '', onChange, attempt, submitted }: GravityFormsFieldPropsType) => {
	//__State
	const [value, setValue] = useState(field.defaultValue);
	const [dirty, setDirty] = useState(false);
	const [invalid, setInvalid] = useState(true);

	//__Variables
	const id = field.id && field.formId ? `input_${field.formId}_${field.id}` : `input_${field.id}`;
	const name = field.id?.toString().indexOf('.') >= 0 ? `${field.label.toLowerCase().replace(' ', '')}_${field.id}` : `input_${field.id}`;
	const label = field.label || '';
	const adminClasses = field.cssClass ? field.cssClass.split(' ') : [];
	const visible = field.visibility === 'visible' || !field.visibility;

	//__Use Effect
	///Reset Value if defaultValue is updated
	useEffect(() => {
		setValue(field.defaultValue || '');
	}, [field.defaultValue]);

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

		if (value !== '' && value !== undefined) {
			setDirty(true);
		}
		onChange({ name, value, valid });
	}, [value]);

	//__Functions
	const change = (e: any) => {
		if (field.maxLength) {
			if (field.maxLength >= e.target.value.length) {
				setValue(e.target.value);
			}
		} else {
			setValue(e.target.value);
		}
	};
	const focus = () => {
		setDirty(true);
	};
	const blur = () => {
		if (value === '') {
			setDirty(false);
		}
	};

	return (
		<div className={`form_field form_field_textarea ${className}${adminClasses.length ? ` ${adminClasses}` : ''}${!visible ? ' hidden' : ''}${dirty ? ' dirty' : ''}${invalid && attempt ? ' invalid' : ''}`}>
			{field.labelPlacement !== 'hidden_label' ? (
				<label htmlFor={id} className='form_label'>
					{field.isRequired ? <span className='text-red-600'>*</span> : ''}
					<span>{label}</span>
				</label>
			) : null}
			<div className='form_textarea_wrap'>
				<textarea id={id} name={name} onChange={change} onFocus={focus} onBlur={blur} placeholder={field.placeholder} className='form_input' rows={field.size === 'small' ? 4 : field.size === 'medium' ? 6 : 8} />
				{invalid && attempt ? (
					<div className='form_invalid_msg'>
						<ExclamationCircle size={18} />
						{field.errorMessage || `A valid ${label} is required`}
					</div>
				) : null}
			</div>
			{field.description ? (
				<div className='form_field_description'>
					<InfoCircle size={18} />
					<div dangerouslySetInnerHTML={{ __html: field.description }} />
				</div>
			) : null}
		</div>
	);
};

export default Textarea;
