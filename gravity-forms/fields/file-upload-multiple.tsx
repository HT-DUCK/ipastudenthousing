import { useState, useEffect } from 'react';
import { GravityFormsFieldPropsType } from 'lib/types';
import { CloseCircle, ExclamationCircle, Upload } from 'flowbite-react-icons/outline';

const FileUploadMultiple = ({ field, className = '', onChange, attempt, submitted }: GravityFormsFieldPropsType) => {
	//__Variables
	const id = field.id && field.formId ? `input_${field.formId}_${field.id}` : `input_${field.id}`;
	const name = field.id.toString().indexOf('.') >= 0 ? `${field.label.toLowerCase().replace(' ', '')}_${field.id}` : `input_${field.id}`;
	const label = field.placeholder || field.label || null;
	const adminClasses = field.cssClass ? field.cssClass.split(' ') : [];
	const visible = field.visibility === 'visible' || !field.visibility;

	//__State
	const [value, setValue] = useState('');
	const [dirty, setDirty] = useState(false);
	const [invalid, setInvalid] = useState(true);
	const [files, setFiles] = useState<Array<File>>([]);
	const [sizeInvalid, setSizeInvalid] = useState(false);
	const [typeInvalid, setTypeInvalid] = useState(false);
	const [maxExceeded, setMaxExceeded] = useState(false);

	//__Use Effect
	//Reset Value when form is submitted
	useEffect(() => {
		if (submitted) {
			setValue('');
		}
	}, [submitted]);

	//Send data to Form when files is updated
	useEffect(() => {
		let valid = true;
		if (field.isRequired) {
			if (!files?.length) {
				valid = false;
			}
		}
		setInvalid(!valid);

		if (files?.length) {
			setDirty(true);
		} else {
			setDirty(false);
		}

		setMaxExceeded(field.maxFiles && files.length >= parseInt(field.maxFiles, 10) ? true : false);

		onChange({ name, value: files?.length ? files : [], valid, label: field.adminLabel });
	}, [files, files?.length]);

	//__Functions
	const change = (e: any) => {
		//file checking
		setSizeInvalid(false);
		setTypeInvalid(false);
		const file_element: any = document.getElementById(id) as HTMLInputElement;
		const accept_types = (field.allowedExtensions && field.allowedExtensions?.split(',')) || [];

		if (file_element?.files?.length && !maxExceeded) {
			const files_copy = [...file_element.files];
			const invalid_files: Array<string> = [];

			//Check if max files has been reached
			if (field.maxFiles && files.length + file_element.files.length > parseInt(field.maxFiles, 10)) {
				const excess_amount = files.length + file_element.files.length - parseInt(field.maxFiles, 10);
				files_copy.length = file_element.files.length - excess_amount;
				setMaxExceeded(true);
			} else {
				setMaxExceeded(false);
			}

			files_copy.map((file) => {
				const file_type = file.type || null;
				if (field.allowedExtensions && file_type && !accept_types.includes(file_type.split('/')[1])) {
					invalid_files.push(file.name);
					setTypeInvalid(true);
				} else if (field.maxFileSize && file.size > field.maxFileSize * 1048576) {
					invalid_files.push(file.name);
					setSizeInvalid(true);
				}
			});

			//Remove invalid items from fileList
			const filtered_files = files_copy.filter((e) => !invalid_files.includes(e.name));

			if (files?.length) {
				const current_files: Array<File> = files;
				current_files.push(...filtered_files);
				setFiles(current_files);
			} else {
				setFiles(filtered_files);
			}
		}
		setValue(e.target.value);
	};
	const focus = () => {
		setDirty(true);
	};
	const blur = () => {
		if (!files?.length) {
			setDirty(false);
		}
	};
	const remove = (e: any, name: string) => {
		e.preventDefault();
		const files_copy = files;
		const filtered_files = files_copy?.filter((e) => e.name !== name);
		setFiles(filtered_files);
		setValue('');
	};

	return (
		<div className={`form_field form_field_file_multiple ${className}${adminClasses.length ? ` ${adminClasses}` : ''}${!visible ? ' hidden' : ''}${dirty ? ' dirty' : ''}${invalid && attempt ? ' invalid' : ''}`}>
			<label htmlFor={id} className='form_label'>
				{field.labelPlacement !== 'hidden_label' ? (
					<span>
						{field.isRequired ? <span className='text-red-600'>*</span> : ''}
						<span>{label}</span>
					</span>
				) : null}
				{!maxExceeded ? (
					<span className='form_upload_button'>
						<Upload size={35} />
						<span>Select File</span>
					</span>
				) : null}
				{files?.length
					? files.map((file, index) => (
							<span key={`file-${index}`} className='form_upload_file_multiple'>
								<span className='form_upload_info'>{`${file.name} (${Math.round(file.size / 1024)} KB)`}</span>
								<span className='form_upload_remove' onClick={(e) => remove(e, file.name)}>
									<CloseCircle size={20} />
									<span>Remove</span>
								</span>
							</span>
						))
					: null}
			</label>
			<input
				type='file'
				id={id}
				name={name}
				value={value}
				multiple
				accept={
					field.allowedExtensions
						? field.allowedExtensions
								.split(',')
								.map((x) => `.${x}`)
								.join(',')
						: ''
				}
				onChange={change}
				onFocus={focus}
				onBlur={blur}
			/>
			{field.description ? <div className='form_field_description' dangerouslySetInnerHTML={{ __html: field.description }} /> : ''}
			{invalid && attempt ? (
				<div className='form_invalid_msg'>
					<ExclamationCircle size={18} />
					<span>{field.errorMessage || `A valid ${label} is required`}</span>
				</div>
			) : null}
			{sizeInvalid ? (
				<div className='form_invalid_msg'>
					<ExclamationCircle size={18} />
					<span>{`A file size greater than ${field.maxFileSize}MB was prevented from being added.`}</span>
				</div>
			) : null}
			{typeInvalid ? (
				<div className='form_invalid_msg'>
					<ExclamationCircle size={18} />
					<span>A file with an invalid type was prevented from being added.</span>
				</div>
			) : null}
			{maxExceeded ? (
				<div className='form_invalid_msg'>
					<ExclamationCircle size={18} />
					The maximum file amount has been reached.
				</div>
			) : null}
		</div>
	);
};

export default FileUploadMultiple;
