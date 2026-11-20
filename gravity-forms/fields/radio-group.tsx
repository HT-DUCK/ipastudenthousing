import { useState, useEffect } from 'react';
import { GravityFormsFieldPropsType } from 'lib/types';
import { ExclamationCircle, InfoCircle } from 'flowbite-react-icons/outline';

const RadioGroup = ({ field, className = '', onChange, attempt, submitted }: GravityFormsFieldPropsType) => {
	//__Variables
	const name = `input_${field.id}`;
	const label = field.placeholder || field.label || null;
	const adminClasses = field.cssClass ? field.cssClass.split(' ') : [];
	const visible = field.visibility === 'visible' || !field.visibility;

	//__State
	const [radios, setRadios] = useState(field.choices);
	const [value, setValue] = useState('');
	const [invalid, setInvalid] = useState(!field.isRequired);

	//__Use Effect
	//Create Radio array
	useEffect(() => {
		if (field.choices) {
			setRadios(field.choices);
			setValue(field.choices.find((e) => e.isSelected === true)?.value || '');
		}
	}, [field.choices]);

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
			if (value === '' || !value.length) {
				valid = false;
			}
		}
		setInvalid(!valid);

		onChange({ name, value, valid });
	}, [value]);

	//__Functions
	const change = (e: any) => {
		setValue(e.target.value);
	};

	if (!field.choices) return null;
	return (
		<div className={`form_field form_field_radios ${className}${adminClasses.length ? ` ${adminClasses}` : ''}${!visible ? ' hidden' : ''}${invalid && attempt ? ' invalid' : ''}`}>
			{field.labelPlacement !== 'hidden_label' ? (
				<label className='form_label'>
					{field.isRequired ? <span className='text-red-600'>*</span> : ''}
					<span>{label}</span>
				</label>
			) : null}
			<div className={`form_radios ${radios.length === 1 ? 'form_radios_single' : ''}`}>
				{radios.map((radio) => {
					const id = field.id;
					const radio_id = `choice_${field.formId}_${id}`;
					const radio_value = radio.value.replace('.', '_').replace(' ', '_');
					return (
						<div key={`radio_${field.id}_${radio_value}`} className={`form_radio_wrap${value === radio.value ? ' selected' : ''}`}>
							<input type='radio' id={`${radio_value}_${radio_id}`} name={name} value={radio.value} checked={value === radio.value} onChange={(e) => change(e)} />
							<label htmlFor={`${radio_value}_${radio_id}`} className='form_radio_label'>
								<span className='form_radio' />
								<span className='form_radio_text' dangerouslySetInnerHTML={{ __html: radio.value }} />
							</label>
						</div>
					);
				})}
			</div>
			{invalid && attempt ? (
				<div className='form_invalid_msg'>
					<ExclamationCircle size={18} />
					{field.errorMessage ? field.errorMessage : `${label} is required`}
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

export default RadioGroup;
