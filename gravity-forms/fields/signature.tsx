import { useState, useEffect, useRef } from 'react';
const { SignatureCanvas } = require('react-signature-canvas');
import { GravityFormsFieldPropsType } from 'lib/types';
import { ExclamationCircle, InfoCircle, Refresh } from 'flowbite-react-icons/outline';

const Signature = ({ field, className = '', onChange, attempt, submitted }: GravityFormsFieldPropsType) => {
	//__Variables
	const id = field.id && field.formId ? `input_${field.formId}_${field.id}` : `input_${field.id}`;
	const name = field.id && field.formId ? `input_${field.formId}_${field.id}_data` : `input_${field.id}_data`;
	const label = field.placeholder || field.label || null;
	const adminClasses = field.cssClass ? field.cssClass.split(' ') : [];
	const visible = field.visibility === 'visible' || !field.visibility;

	//__State
	const [value, setValue] = useState(field.defaultValue || '');
	const [invalid, setInvalid] = useState<boolean>(true);

	//__Refs
	const sigRef = useRef<any>(null);

	//__Functions
	function clear() {
		if (sigRef?.current) {
			sigRef.current.clear();
			setValue('');
		}
	}

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

	//Send data to Form when value is updated
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

	if (!field) return null;
	return (
		<div className={`form_field form_field_signature ${className}${adminClasses.length ? ` ${adminClasses}` : ''}${!visible ? ' hidden' : ''}${invalid && attempt ? ' invalid' : ''}`}>
			{field.labelPlacement !== 'hidden_label' ? (
				<label htmlFor={id} className='form_label'>
					{field.isRequired ? <span className='text-red-600'>*</span> : ''}
					<span>{label}</span>
				</label>
			) : null}
			<div className='form_signature_wrap'>
				<SignatureCanvas
					penColor='black'
					backgroundColor='#fff'
					canvasProps={{ width: 500, height: 200, className: 'form_signature_canvas' }}
					ref={sigRef}
					onEnd={() => {
						if (sigRef?.current) {
							setValue(sigRef.current.getTrimmedCanvas().toDataURL());
						}
					}}
				/>
				<div className='form_signature_clear' onClick={clear}>
					<Refresh size={18} />
					Clear
				</div>
			</div>
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

export default Signature;
