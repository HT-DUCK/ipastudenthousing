import { GravityFormsFieldPropsType } from 'lib/types';
import InputField from './input-field';
import Select from './select';

const Name = ({ attempt, className = '', field, onChange, submitted }: GravityFormsFieldPropsType) => {
	//__Variables

	//__State

	//__Use Effect

	//Reset Value when form is submitted

	//Send data to Form when field is updated

	//__Functions

	if (!field?.inputs) return null;

	return field.inputs
		?.filter((input) => !input.isHidden)
		.map((input) => {
			const id = input.id.toString().replace('.', '_');

			const name_field = {
				...input,
				id,
				formId: field.formId,
				isRequired: field.isRequired,
				label: input.customLabel || input.label,
				type: input.inputType || 'text',
				cssClass: input.cssClass || '',
				visibility: input.visibility
			};

			switch (input.inputType) {
				case 'radio':
					return <Select key={`field-${id}`} field={name_field} onChange={onChange} className={className} attempt={attempt} submitted={submitted} />;
				default:
					return <InputField key={`field-${id}`} field={name_field} onChange={onChange} className={className} attempt={attempt} submitted={submitted} />;
			}
		});
};

export default Name;
