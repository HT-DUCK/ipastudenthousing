import { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import { GravityFormsFieldPropsType } from 'lib/types';
import { ExclamationCircle } from 'flowbite-react-icons/outline';

const Select = ({ field, className = '', onChange, attempt, submitted }: GravityFormsFieldPropsType) => {
	//__Variables
	const id = field.id && field.formId ? `input_${field.formId}_${field.id}` : `input_${field.id}`;
	const name = `input_${field.id}`;
	const label = field.placeholder || field.label || null;
	const adminClasses = field.cssClass ? field.cssClass.split(' ') : [];
	const visible = field.visibility === 'visible' || !field.visibility;

	//__State
	const [value, setValue] = useState('');
	const [defaultValue, setDefaultValue] = useState('');
	const [dirty, setDirty] = useState(false);
	const [invalid, setInvalid] = useState(true);
	const [required, setRequired] = useState(field.isRequired);

	//__Use Effect
	//Set default value
	useEffect(() => {
		if (field.defaultValue) {
			setValue(field.defaultValue);
			setDefaultValue(field.defaultValue);
		} else {
			setValue(field.choices.find((e) => e.isSelected === true)?.value || '');
			setDefaultValue(field.choices.find((e) => e.isSelected === true)?.value || '');
		}
	}, [field.choices]);

	useEffect(() => {
		setRequired(field.isRequired);
	}, [field.isRequired]);

	//Reset Value when form is submitted
	useEffect(() => {
		if (submitted) {
			setValue(defaultValue);
		}
	}, [submitted]);

	//Send data to Form when field is updated
	useEffect(() => {
		let valid = true;
		if (required) {
			if (value === '' || !value) {
				valid = false;
			}
		}
		setInvalid(!valid);

		if (value !== '') {
			setDirty(true);
		} else {
			setDirty(false);
		}

		onChange({ name, value, valid });
	}, [value, required]);

	//__Functions
	const change = (e: any) => {
		setValue(e.target.value);
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
		<div className={`form_field form_field_select ${className}${adminClasses.length ? ` ${adminClasses}` : ''}${!visible ? ' hidden' : ''}${dirty ? ' dirty' : ''}${invalid && attempt ? ' invalid' : ''}`}>
			{field.labelPlacement !== 'hidden_label' ? (
				<label htmlFor={id} className='form_label'>
					{required ? <span className='text-red-600'>*</span> : ''}
					<span>{label}</span>
				</label>
			) : null}
			<div className='form_select_wrap'>
				<select id={id} name={name} value={value} onChange={change} onFocus={focus} onBlur={blur}>
					{field.choices.map((choice, index) => (
						<option key={`gf-choice-${index}`} value={choice.value}>
							{parse(choice.text)}
						</option>
					))}
				</select>
			</div>
			{field.description ? <div className='form_field_description' dangerouslySetInnerHTML={{ __html: field.description }} /> : ''}
			{invalid && attempt ? (
				<div className='form_invalid_msg'>
					<ExclamationCircle size={18} />
					{field.errorMessage ? field.errorMessage : `${label} is required`}
				</div>
			) : null}
		</div>
	);
};

export default Select;
