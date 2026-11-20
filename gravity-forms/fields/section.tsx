import { GravityFormsFieldType } from 'lib/types';
import { DynamicWrapper } from 'wrappers';
import { InfoCircle } from 'flowbite-react-icons/outline';

const Section = ({ field, className = '', heading_tag = 'h4' }: { field: GravityFormsFieldType; className?: string; heading_tag?: string }) => {
	const adminClasses = field.cssClass ? field.cssClass.split(' ') : [];
	const visible = field.visibility === 'visible' || !field.visibility;

	return (
		<div className={`form_field form_field_section ${className}${adminClasses.length ? ` ${adminClasses}` : ''}${!visible ? ' hidden' : ''}`}>
			<DynamicWrapper wrapper={heading_tag} className='form_section_label' dangerouslySetInnerHTML={{ __html: field.label }} />
			{field.description ? (
				<div className='form_field_description'>
					<InfoCircle size={18} />
					<div dangerouslySetInnerHTML={{ __html: field.description }} />
				</div>
			) : null}
		</div>
	);
};

export default Section;
