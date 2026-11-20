import { GravityFormsFieldType } from 'lib/types';

const Html = ({ field, className = '' }: { field: GravityFormsFieldType; className?: string }) => {
	const adminClasses = field.cssClass ? field.cssClass.split(' ') : [];
	const visible = field.visibility === 'visible' || !field.visibility;

	return <div className={`form_field form_field_html ${className}${adminClasses.length ? ` ${adminClasses}` : ''}${!visible ? ' hidden' : ''}`}>{field.content ? <div dangerouslySetInnerHTML={{ __html: field.content }} /> : null}</div>;
};

export default Html;
