import { useState, useEffect } from 'react';
import { GravityFormsFieldPropsType } from 'lib/types';
import { Check, ExclamationCircle, InfoCircle } from 'flowbite-react-icons/outline';

const Checkbox = ({ field, className = '', onChange, attempt, submitted }: GravityFormsFieldPropsType) => {
	//__Variables
	const label = field.placeholder || field.label || null;
	const adminClasses = field.cssClass ? field.cssClass.split(' ') : [];
	const visible = field.visibility === 'visible' || !field.visibility;

	//__State
	const [checkboxes, setCheckboxes] = useState<Array<any>>([]);
	const [defaultChecked, setDefaultChecked] = useState<Array<any>>([]);
	const [invalid, setInvalid] = useState(field.isRequired);

	//__Use Effect
	//Create Checkbox array
	useEffect(() => {
		//Send back to form to initiate Valid Object
		if (field.isRequired) {
			onChange({ name: `input_${field.id}`, value: '', valid: false });
		}

		if (field.inputs) {
			const checkboxes_array: Array<any> = [];
			field.choices.map((choice, index) => {
				const obj = { ...choice, ...field.inputs[index] };
				if (choice.isSelected) {
					obj.isSelected = true;
				} else {
					obj.isSelected = false;
				}
				checkboxes_array.push(obj);
			});
			setCheckboxes(checkboxes_array);
			setDefaultChecked(checkboxes_array);
		} else {
			setCheckboxes(field.choices);
		}
	}, [field.choices, field.inputs]);

	//Reset Value when form is submitted
	useEffect(() => {
		if (submitted) {
			setCheckboxes(defaultChecked || field.choices);
		}
	}, [submitted]);

	//__Functions
	//Send data to Form when field is updated
	const change = (e: any, index: number) => {
		const value = e.target.checked ? e.target.value : '';
		let valid = true;

		const new_checkboxes = [...checkboxes];
		new_checkboxes[index].isSelected = !new_checkboxes[index].isSelected;
		const selected_checkboxes = new_checkboxes.filter((e) => e.isSelected) ? new_checkboxes.filter((e) => e.isSelected).map((e) => e.value) : [];
		setCheckboxes(new_checkboxes);

		if (field.isRequired) {
			if (!selected_checkboxes.length) {
				valid = false;
			}
		}
		setInvalid(!valid);

		onChange({ name: e.target.name, value, valid, type: 'checkbox' });
		onChange({ name: `input_${field.id}`, value: selected_checkboxes.toString(), valid });
	};

	if (!field.choices) return null;

	return (
		<div className={`form_field form_field_checkboxes ${className}${adminClasses.length ? ` ${adminClasses}` : ''}${!visible ? ' hidden' : ''}${invalid && attempt ? ' invalid' : ''}`}>
			{field.labelPlacement !== 'hidden_label' && label ? (
				<label className='form_label'>
					{field.isRequired ? <span className='text-red-600'>*</span> : ''}
					<span>{label}</span>
				</label>
			) : null}
			<div className={`form_checkboxes ${checkboxes.length === 1 ? 'form_checkboxes_single' : ''}`}>
				{checkboxes.map((checkbox, index) => {
					const id = checkbox.id.replace('.', '_');
					const name = `input_${id}`;
					const checkbox_id = `choice_${field.formId}_${id}`;
					return (
						<div key={checkbox.id} className={`form_checkbox_wrap${checkbox.isSelected ? ' selected' : ''}`}>
							<input type='checkbox' id={checkbox_id} name={name} value={checkbox.value} checked={checkbox.isSelected} onChange={(e) => change(e, index)} />
							<label htmlFor={checkbox_id} className='form_checkbox_label'>
								<span className='form_checkbox'>
									<Check size={18} />
								</span>
								{field.isRequired && !label && checkboxes.length <= 1 ? <span className='text-red-600'>*</span> : ''}
								<span className='form_checkbox_text' dangerouslySetInnerHTML={{ __html: checkbox.label }} />
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

export default Checkbox;
