import { useState, useEffect } from 'react';
import { GravityFormsFieldPropsType } from 'lib/types';
import { ExclamationCircle, Eye, InfoCircle } from 'flowbite-react-icons/outline';

const InputField = ({ field, className = '', validation, bypass_validation = false, extra_valid = true, onChange, attempt, submitted }: GravityFormsFieldPropsType) => {
	//__Variables
	const id = field.id && field.formId ? `input_${field.formId}_${field.id}` : `input_${field.id}`;
	const type = field.id && field.id?.toString().indexOf('.') >= 0 ? 'text' : field.type === 'phone' ? 'tel' : field.type;
	const name = field.id && field.id?.toString().indexOf('.') >= 0 ? `${field.label.toLowerCase().replace(' ', '')}_${field.id}` : `input_${field.id}`;
	const label = field.placeholder || field.label || null;
	const adminClasses = field.cssClass ? field.cssClass.split(' ') : [];
	const visible = field.visibility === 'visible' || !field.visibility;

	//__State
	const [value, setValue] = useState(field.defaultValue || '');
	const [dirty, setDirty] = useState(false);
	const [invalid, setInvalid] = useState<boolean>(extra_valid || true);
	const [showPassword, setShowPassword] = useState(false);

	//__Use Effect
	//Reset Value if defaultValue is updated
	useEffect(() => {
		if (field.defaultValue && field.maxLength && field.defaultValue?.length > field.maxLength) {
			setValue('');
		} else {
			setValue(field.defaultValue || '');
		}
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
			if (!bypass_validation) {
				if (validation === 'email' || type === 'email') {
					if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
						valid = false;
					}
				}
				if (validation === 'password' || type === 'password') {
					if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value)) {
						valid = false;
					}
				}
			}
			if (field.maxLength && field.maxLength < value.length) {
				valid = false;
			}
			if (value === '') {
				valid = false;
			}
		}

		//Check if value is a valid phone number
		if (value !== '' && (validation === 'tel' || type === 'tel')) {
			if (field.phoneFormat === 'standard' && !/^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/.test(value)) {
				valid = false;
			} else if (!/^[0-9-() +]+$/.test(value)) {
				valid = false;
			}
		}

		//Check external valid value for this field (i.e.: password validation)
		if (!extra_valid) {
			valid = false;
		}

		setInvalid(!valid);

		if (value !== '') {
			setDirty(true);
		}

		onChange({ name, value, valid });
	}, [value, extra_valid]);

	//__Functions
	const change = (e: any) => {
		if (field.maxLength) {
			if (field.maxLength >= e.target.value.length) {
				setValue(e.target.value);
			}
		} else if (type === 'tel') {
			if (field.phoneFormat === 'standard') {
				const phone_val = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
				e.target.value = !phone_val[2] ? phone_val[1] : `(${phone_val[1]}) ${phone_val[2]}${`${phone_val[3] ? `-${phone_val[3]}` : ''}`}`;
				setValue(e.target.value);
			} else {
				const phone_val = e.target.value.replace(/[^0-9\-() +]/g, '');
				setValue(phone_val);
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
		} else {
			if (field.type === 'url') {
				if (!value.startsWith('http://') && !value.startsWith('https://')) {
					setValue(`http://${value}`);
				}
			}
		}
	};

	if (!field) return null;
	return (
		<div className={`form_field form_field_input ${className}${adminClasses.length ? ` ${adminClasses}` : ''}${!visible ? ' hidden' : ''}${dirty ? ' dirty' : ''}${invalid && attempt ? ' invalid' : ''}`}>
			{field.labelPlacement !== 'hidden_label' ? (
				<label htmlFor={id} className='form_label'>
					{field.isRequired ? <span className='form_required_indicator'>*</span> : ''}
					<span>{label}</span>
				</label>
			) : null}
			<div className='form_input_outer'>
				<div className='form_input_wrap'>
					<input type={field.type === 'password' && showPassword ? 'text' : type} id={id} name={name} placeholder={field.placeholder} value={value} onChange={change} onFocus={focus} onBlur={blur} className='form_input' />
					{field.type === 'password' ? (
						<div className={`form_password_icon${showPassword ? ' show' : ''}`} onClick={() => setShowPassword(!showPassword)}>
							<Eye size={22} />
						</div>
					) : null}
				</div>
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

export default InputField;
