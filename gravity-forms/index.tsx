'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { setCookie, hasCookie, getCookie } from 'cookies-next';
import { usePathname, useSearchParams } from 'next/navigation';
import parse from 'html-react-parser';
import { FieldValueType, FileUploadType, GravityFormsConditionalFieldType, GravityFormsFieldType, GravityFormsType, PageType } from 'lib/types';
import { DynamicWrapper } from 'wrappers';
import InputField from './fields/input-field';
import Name from './fields/name';
import Textarea from './fields/textarea';
import Section from './fields/section';
import Html from './fields/html';
import Select from './fields/select';
import Checkbox from './fields/checkbox';
import Consent from './fields/consent';
import RadioGroup from './fields/radio-group';
import DateField from './fields/date-field';
import Survey from './fields/survey';
import Signature from './fields/signature';
import FileUpload from './fields/file-upload';
//import FileUploadMultiple from './fields/file-upload-multiple';
import Submit from './fields/submit';

interface GravityForm {
	className?: string;
	field_className?: string;
	file_upload?: FileUploadType;
	form: GravityFormsType;
	form_description?: string;
	form_title?: string;
	form_title_tag?: string;
	page?: PageType;
	section_heading_tag?: string;
	show_form_description?: boolean;
	show_form_title?: boolean;
	show_invalid_message?: boolean;
	submit_children?: React.ReactNode;
}

interface FormData {
	[key: string]: any;
}

interface FormValid {
	[key: string]: boolean;
}

declare global {
	interface Window {
		dataLayer: Record<string, any>[];
	}
}

const GravityForm = ({ form, className = '', field_className = '', file_upload, form_title, form_description, show_form_description = true, show_form_title = true, form_title_tag = 'h1', show_invalid_message = true, submit_children, section_heading_tag, page }: GravityForm) => {
	//__Hooks
	const pathname = usePathname();
	const searchParams = useSearchParams();

	//__Ref
	const formRef = useRef<any>(null);

	//__State
	const [formData, setFormData] = useState<FormData>({});
	const [validObj, setValidObj] = useState<FormValid>({});
	const [conditionalFields, setConditionalFields] = useState<GravityFormsConditionalFieldType[]>([]);
	const [attempt, setAttempt] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [formValid, setFormValid] = useState(false);
	const [error, setError] = useState(false);
	const [confirmation, setConfirmation] = useState<string | null>(null);
	const [submitted, setSubmitted] = useState(false);
	const [honeypot, setHoneypot] = useState({
		inputField: '',
		textField: 'hello'
	});
	const [newParams, setNewParams] = useState<URLSearchParams>(new URLSearchParams());
	//const [multipleUploadFiles, setMultipleUploadFiles] = useState<{ label: string; files: Array<any> } | null>(null);
	const [fullUrl, setFullUrl] = useState('');

	//__Variables
	//Organize fields into rows based on GF Form designer
	const rows: Array<any> = [];
	form?.fields?.map((field: GravityFormsFieldType) => {
		const rowId = rows.find((x) => x.id === field.layoutGroupId);
		if (!rowId) {
			const filteredFields = form.fields.filter((e: GravityFormsFieldType) => e.layoutGroupId === field.layoutGroupId);
			rows.push({
				id: field.layoutGroupId,
				fields: filteredFields,
				hidden: filteredFields.find((e: GravityFormsFieldType) => e.type === 'hidden' || e.visibility === 'hidden')
			});
		}
	});
	const visible_rows = rows.filter((e) => !e.hidden);
	const hidden_rows = rows.filter((e) => e.hidden);

	//__Use Effects
	useEffect(() => {
		setFullUrl(window?.location?.toString());

		//Build array of conditional fields
		const cond_array: GravityFormsConditionalFieldType[] = [];
		form?.fields?.map((field) => {
			const { conditionalLogic, id, type } = field || {};
			const name = type === 'consent' ? `input_${field.id}_1` : type === 'signature' ? `input_${form.id}_${field.id}_data` : `input_${id}`;

			if (conditionalLogic?.enabled) {
				const visible = conditionalLogic?.actionType === 'show' ? false : true;
				cond_array.push({
					conditionalLogic,
					id,
					name,
					type,
					visible
				});

				//Set field to valid if conditionally hidden
				if (!visible) {
					setValidObj((validObj) => ({ ...validObj, [name]: true }));
				}
			}
		});
		setConditionalFields(cond_array);
	}, []);

	useEffect(() => {
		//Convert all param keys to lowercase to match with inputName
		const new_params = new URLSearchParams();
		searchParams.forEach((value, key) => {
			new_params.append(key.toLowerCase(), value);
		});
		setNewParams(new_params);
	}, [searchParams]);

	//Setup form input data
	useEffect(() => {
		const form_obj: any = {};
		form?.fields?.map((field: GravityFormsFieldType) => {
			if (field.type === 'checkbox') {
				field.choices.map((choice: any, choiceIndex: number) => {
					const choiceName = `input_${field.id}_${choiceIndex + 1}`;
					if (choice.isSelected) {
						form_obj[choiceName] = choice.value;
					} else {
						form_obj[choiceName] = '';
					}
				});
			} else if (field.type === 'consent') {
				form_obj[`input_${field.id}_1`] = field.defaultValue;
			} else if (field.type === 'signature') {
				form_obj[`input_${form.id}_${field.id}_data`] = field.defaultValue;
			} else {
				form_obj[`input_${field.id}`] = field.defaultValue;
			}
		});
		setFormData(form_obj);
	}, [form?.fields]);

	//Check if form valid
	useEffect(() => {
		setFormValid(!Object.keys(validObj).some((k) => !validObj[k]));
	}, [validObj]);

	//__Callbacks
	const fieldChange = useCallback(
		(field: FieldValueType) => {
			//formData used to submit form
			setFormData((formData) => ({ ...formData, [field.name]: field.value }));

			//validData used for validation
			if (field.type !== 'checkbox') {
				setValidObj((validObj) => ({ ...validObj, [field.name]: field.valid }));
			}

			//Check if conditional fields are dependent on this field
			if (conditionalFields.length) {
				const dependent_fields = conditionalFields.filter((e) => e.conditionalLogic?.rules?.find((r) => r.fieldId === field.name.split('_')[1]));
				if (dependent_fields?.length) {
					dependent_fields.map((item) => {
						const { conditionalLogic, id, type, name } = item || {};
						const { actionType, logicType, rules } = conditionalLogic || {};
						let pass = false;

						if (logicType === 'all') {
							pass = rules.every((rule) => {
								const { fieldId, operator, value } = rule || {};

								if (fieldId === field.name.split('_')[1]) {
									return (operator === 'is' && value === field.value) || (operator === 'isnot' && value !== field.value) || (operator === 'contains' && field.value.toString().includes(value));
								}
								// For other fields in the form
								const otherFieldValue = formData[`input_${fieldId}`];
								return (operator === 'is' && value === otherFieldValue) || (operator === 'isnot' && value !== otherFieldValue) || (operator === 'contains' && otherFieldValue?.toString().includes(value));
							});
						} else {
							rules.map((rule) => {
								const { fieldId, operator, value } = rule || {};

								if (fieldId === field.name.split('_')[1]) {
									if ((operator === 'is' && value === field.value) || (operator === 'isnot' && value !== field.value) || (operator === 'contains' && field.value.toString().includes(value))) {
										pass = true;
									}
								}
							});
						}

						item.visible = actionType === 'show' ? (pass ? true : false) : pass ? false : true;
						if (!item.visible) {
							setValidObj((validObj) => ({ ...validObj, [name]: true }));
						} else if (item.visible && form?.fields.find((e) => e.id === id)?.isRequired && !formData[name]) {
							setValidObj((validObj) => ({ ...validObj, [name]: false }));
						}
					});
				}
			}

			setError(false);
			setSubmitted(false);
		},
		[setFormData, formData]
	);

	/*const handleFileUploadMultiple = useCallback((field: { name: string; value: Array<any>; valid: boolean; label: string }) => {
		setMultipleUploadFiles({
			label: field.label,
			files: field.value
		});
	}, []);*/

	//__Functions
	const changeHoneypot = (e: any, type: string) => {
		setHoneypot((honeypot) => ({ ...honeypot, [type]: e.target.value }));
	};

	const formSubmit = async (e: any) => {
		e.preventDefault();
		setAttempt(true);

		//Check if form is valid and honeypot fields were not updated
		if (formValid && (!form.enableHoneypot || (honeypot.inputField === '' && honeypot.textField === 'hello'))) {
			setError(false);
			setSubmitting(true);

			//Setup form data to prepare to send
			const form_data = new FormData();
			for (const key in formData) {
				form_data.append(key, formData[key]);
			}

			//Send to server action
			const submission = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/gf/v2/forms/${form.id}/submissions`, {
				method: 'post',
				//headers: { 'Content-Type': 'multipart/form-data' },
				body: form_data
			}).then((res) => {
				//Check if form submitted successfully
				if (!res.ok) {
					setError(true);
				} else {
					return res.json();
				}
			});

			//Check if form submitted successfully
			if (!submission.is_valid) {
				setError(true);
			} else {
				if (submission) {
					if (submission.confirmation_redirect && submission.confirmation_type === 'redirect') {
						setConfirmation('Thank you for submiting. You are being redirected...');
						window.location = submission.confirmation_redirect;
					} else {
						setConfirmation(submission.confirmation_message);
					}
				}
				setSubmitting(false);
				setAttempt(false);
				setFormData({});
				setValidObj({});
				setSubmitted(true);
				if (formRef?.current?.getBoundingClientRect()?.top) {
					window.scrollTo({
						top: formRef.current.getBoundingClientRect().top + window.scrollY - 150,
						behavior: 'smooth'
					});
				}

				//Send custom event to GTM
				window.dataLayer = window?.dataLayer || [];
				window?.dataLayer.push({
					event: 'gravityFormSubmission',
					gravityFormID: form.id
				});
			}
		}
	};

	const renderField = (field: GravityFormsFieldType) => {
		//Set values for full URL fields
		if (field.inputName === 'full_url') {
			field.defaultValue = fullUrl;
		}
		//Set values for options to select choice with current page slug as value
		if (field.inputName === 'pathname_options') {
			field.defaultValue = pathname;
		}
		//Custom for property routing on EL
		if (field.inputName === 'property_slug' && page) {
			if (page.type === 'property') {
				field.defaultValue = page.slug;
			} else {
				field.defaultValue = 'default';
			}
		}
		//If inputName is in params, set is as default value for field and save it in a cookie, else check cookie and set it as defaultValue
		if (field.inputName && field.inputName !== '') {
			const input_name = field.inputName.toLowerCase();
			if (newParams.has(input_name)) {
				field.defaultValue = newParams.get(input_name);
				setCookie(input_name, newParams.get(input_name), { path: '/' });
			} else if (hasCookie(input_name)) {
				field.defaultValue = getCookie(input_name)?.toString();
			}
		}

		switch (field.type) {
			case 'text':
			case 'email':
			case 'number':
			case 'phone':
			case 'hidden':
				return <InputField key={`field-${field.id}`} field={field} onChange={fieldChange} className={field_className} attempt={attempt} submitted={submitted} />;
			case 'name':
				return <Name key={`field-${field.id}`} field={field} onChange={fieldChange} className={field_className} attempt={attempt} submitted={submitted} />;
			case 'textarea':
				return <Textarea key={`field-${field.id}`} field={field} onChange={fieldChange} className={field_className} attempt={attempt} submitted={submitted} />;
			case 'section':
				return <Section key={`field-${field.id}`} field={field} className={field_className} heading_tag={section_heading_tag} />;
			case 'html':
				return <Html key={`field-${field.id}`} field={field} className={field_className} />;
			case 'address':
				return field.inputs.map((input) => {
					const input_id = `${input.label.toLowerCase().replace(' ', '')}_${input.id}`;
					return <InputField key={`field-${input_id}`} field={input} onChange={fieldChange} className={field_className} attempt={attempt} submitted={submitted} />;
				});
			case 'select':
				return <Select key={`field-${field.id}`} field={field} onChange={fieldChange} className={field_className} attempt={attempt} submitted={submitted} />;
			case 'checkbox':
				return <Checkbox key={`field-${field.id}`} field={field} onChange={fieldChange} className={field_className} attempt={attempt} submitted={submitted} />;
			case 'consent':
				return <Consent key={`field-${field.id}`} field={field} onChange={fieldChange} className={field_className} attempt={attempt} submitted={submitted} />;
			case 'radio':
				return <RadioGroup key={`field-${field.id}`} field={field} onChange={fieldChange} className={field_className} attempt={attempt} submitted={submitted} />;
			case 'date':
				return <DateField key={`field-${field.id}`} field={field} onChange={fieldChange} className={field_className} attempt={attempt} submitted={submitted} />;
			case 'signature':
				return <Signature key={`field-${field.id}`} field={field} onChange={fieldChange} className={field_className} attempt={attempt} submitted={submitted} />;
			case 'survey':
				return <Survey key={`field-${field.id}`} field={field} onChange={fieldChange} className={field_className} attempt={attempt} submitted={submitted} />;
			case 'fileupload':
				switch (field.multipleFiles) {
					case true:
						return false;
					/*return <FileUploadMultiple key={`field-${field.id}`} field={field} onChange={handleFileUploadMultiple} className={classNameField} attempt={attempt} submitted={submitted} />;*/
					default:
						return <FileUpload key={`field-${field.id}`} field={field} onChange={fieldChange} className={field_className} attempt={attempt} submitted={submitted} file_upload={file_upload} /*multipleUploadFiles={multipleUploadFiles}*/ />;
				}
			default:
				return false;
		}
	};

	if (!form) return null;
	return (
		<form onSubmit={formSubmit} className={`form ${className} ${form.cssClass}`} id={`form_${form.id}`} ref={formRef}>
			{(form_title || form.title) && show_form_title ? (
				<DynamicWrapper wrapper={form_title_tag} className='form_title'>
					{form_title || form.title}
				</DynamicWrapper>
			) : null}
			{(form_description || form.description) && show_form_description && !confirmation ? <div className='form_description'>{parse(form_description || form.description)}</div> : null}
			{confirmation ? (
				<div className='form_confirmation' dangerouslySetInnerHTML={{ __html: confirmation }} />
			) : (
				<div className='form_wrapper'>
					<div className='form_fields'>
						{form.enableHoneypot ? (
							<div className='hidden'>
								<div className='hidden'>
									<label htmlFor='input-field'>Input Field</label>
									<input type='text' id='input-field' name='input-field' value={honeypot.inputField} onChange={(e) => changeHoneypot(e, 'inputField')} />
								</div>
								<div className='hidden'>
									<label htmlFor='text-field'>Text Field</label>
									<input type='text' id='text-field' name='text-field' value={honeypot.textField} onChange={(e) => changeHoneypot(e, 'textField')} />
								</div>
							</div>
						) : null}
						{visible_rows.map((row, index) => (
							<div key={row.id} className='form_row' style={{ display: row.fields.find((f: GravityFormsFieldType) => conditionalFields.find((e) => e.id === f.id && !e.visible)) ? 'none' : '' }}>
								{row.fields.map((field: GravityFormsFieldType) => renderField(field))}
								{form.button?.location === 'inline' && index + 1 === visible_rows.length ? (
									<Submit text={form.button?.text} className={`${form.button?.width} location_${form.button?.location} ${field_className}`} disabled={submitting} submitting={submitting}>
										{submit_children}
									</Submit>
								) : null}
							</div>
						))}
						{hidden_rows.map((row) => (
							<div key={row.id} className='hidden'>
								{row.fields.map((field: GravityFormsFieldType) => renderField(field))}
							</div>
						))}
					</div>
					{attempt && !formValid && show_invalid_message ? (
						<div className='form_error_msg'>
							There are missing or invalid fields in this form.
							<br />
							Please update the indicated fields above and resubmit.
						</div>
					) : null}
					{form.button?.location !== 'inline' ? (
						<Submit text={form.button?.text} className={`${form.button?.width} location_${form.button?.location} ${field_className}`} disabled={submitting} submitting={submitting}>
							{submit_children}
						</Submit>
					) : null}
				</div>
			)}
			{error ? <div className='form_error_msg'>There was a problem submitting this form. Please check your information and try again.</div> : null}
		</form>
	);
};

export default GravityForm;
