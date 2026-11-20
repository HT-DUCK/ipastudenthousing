import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { GravityFormsFieldPropsType } from 'lib/types';
import { CalendarMonth, ExclamationCircle } from 'flowbite-react-icons/outline';
import 'react-datepicker/dist/react-datepicker.css';

const DateField = ({ field, className = '', onChange, attempt, submitted }: GravityFormsFieldPropsType) => {
	//__Variables
	const id = field.id && field.formId ? `input_${field.formId}_${field.id}` : `input_${field.id}`;
	const name = field.id && field.id?.toString().indexOf('.') >= 0 ? `${field.label.toLowerCase().replace(' ', '')}_${field.id}` : `input_${field.id}`;
	const label = field.placeholder || field.label || null;
	const adminClasses = field.cssClass ? field.cssClass.split(' ') : [];
	const visible = field.visibility === 'visible' || !field.visibility;

	//__State
	const [value, setValue] = useState<Date | null>(null);
	const [defaultValue, setDefaultValue] = useState(field.defaultValue ? new Date(field.defaultValue) : null);
	const [dirty, setDirty] = useState(false);
	const [invalid, setInvalid] = useState(true);

	//__Use Effects
	//Reset DefaultValue if defaultValue is updated
	useEffect(() => {
		setDefaultValue(field.defaultValue ? new Date(field.defaultValue) : null);
	}, [field.defaultValue]);

	//Reset Value if defaultValue is updated
	useEffect(() => {
		setValue(defaultValue || null);
	}, [defaultValue]);

	//Reset Value when form is submitted
	useEffect(() => {
		if (submitted) {
			setValue(null);
		}
	}, [submitted]);

	//Send data to Form when field is updated
	useEffect(() => {
		const dateFormatted = value
			? value.toLocaleDateString('en-US', {
					month: '2-digit',
					day: '2-digit',
					year: 'numeric'
				})
			: '';

		let valid = true;
		if (field.isRequired) {
			if (value === null) {
				valid = false;
			}
		}
		setInvalid(!valid);

		if (value === null) {
			setDirty(false);
		} else {
			setDirty(true);
		}

		onChange({ name, value: dateFormatted, valid });
	}, [value]);

	//__Functions
	const focus = () => {
		setDirty(true);
	};
	const blur = () => {
		if (value === null) {
			setDirty(false);
		}
	};

	return (
		<div className={`form_field form_field_date ${className}${adminClasses.length ? ` ${adminClasses}` : ''}${!visible ? ' hidden' : ''}${dirty ? ' dirty' : ''}${invalid && attempt ? ' invalid' : ''}`}>
			{field.cssClass.indexOf('has_icon') >= 0 ? (
				<div className='form_calendar_icon'>
					<CalendarMonth size={18} color='#707070' />
				</div>
			) : null}
			{field.labelPlacement !== 'hidden_label' ? (
				<label htmlFor={id} className='form_label'>
					{field.isRequired ? <span className='text-red-600'>*</span> : ''}
					<span>{label}</span>
				</label>
			) : null}
			<div className='form_date_wrap'>
				<DatePicker id={id} name={name} selected={value} onChange={(date: any) => setValue(date)} onFocus={focus} onBlur={blur} className='form_date' />
				{invalid && attempt ? (
					<div className='form_invalid_msg'>
						<ExclamationCircle size={18} />
						{field.errorMessage || `A valid ${label} is required`}
					</div>
				) : null}
			</div>
		</div>
	);
};

export default DateField;
