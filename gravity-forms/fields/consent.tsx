import { useState, useEffect } from 'react';
import { GravityFormsFieldPropsType } from 'lib/types';
import { Check, ExclamationCircle } from 'flowbite-react-icons/outline';

const Consent = ({ field, className = '', onChange, attempt, submitted }: GravityFormsFieldPropsType) => {
	//__Variables
	const id = field.id && field.formId ? `input_${field.formId}_${field.id}` : `input_${field.id}`;
	const name = field.id && field.id?.toString().indexOf('.') >= 0 ? `${field.label.toLowerCase().replace(' ', '')}_${field.id}_1` : `input_${field.id}_1`;
	const label = field.label || '';
	const adminClasses = field.cssClass ? field.cssClass.split(' ') : [];
	const visible = field.visibility === 'visible' || !field.visibility;

	//__State
	const [invalid, setInvalid] = useState(field.isRequired);
	const [checked, setChecked] = useState(false);

	//__Use Effect
	useEffect(() => {
		//Send back to form to initiate Valid Object
		if (field.isRequired) {
			onChange({ name, value: '', valid: false });
		}
	}, [field.isRequired]);

	//Reset Value when form is submitted
	useEffect(() => {
		if (submitted) {
			setChecked(false);
		}
	}, [submitted]);

	//__Functions
	//Send data to Form when field is updated
	const change = (e: any) => {
		const value = e.target.checked ? e.target.value : '';
		let valid = true;

		if (field.isRequired) {
			if (!value.length) {
				valid = false;
			}
		}
		setInvalid(!valid);

		setChecked(e.target.checked);

		onChange({ name, value, valid });
	};

	if (!field.choices) return null;

	return (
		<div className={`form_field form_field_consent ${className}${adminClasses.length ? ` ${adminClasses}` : ''}${!visible ? ' hidden' : ''}${invalid && attempt ? ' invalid' : ''}`}>
			{field.labelPlacement !== 'hidden_label' && label ? (
				<label className='form_label'>
					{field.isRequired ? <span className='text-red-600'>*</span> : ''}
					<span>{label}</span>
				</label>
			) : null}
			<div className={`form_checkbox_wrap${checked ? ' selected' : ''}`}>
				<input type='checkbox' id={id} name={name} value='1' checked={checked} onChange={(e) => change(e)} />
				<label htmlFor={id} className='form_checkbox_label'>
					<span className='form_checkbox'>
						<Check size={18} />
					</span>
					{field.isRequired ? <span className='text-red-600'>*</span> : ''}
					<span className='form_checkbox_text' dangerouslySetInnerHTML={{ __html: field.checkboxLabel || '' }} />
				</label>
			</div>
			{invalid && attempt ? (
				<div className='form_invalid_msg'>
					<ExclamationCircle size={18} />
					{field.errorMessage ? field.errorMessage : `${label} is required`}
				</div>
			) : null}
			{field.description ? (
				<div className='form_field_description'>
					<span dangerouslySetInnerHTML={{ __html: field.description }} />
				</div>
			) : null}
		</div>
	);
};

export default Consent;
