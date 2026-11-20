import { useState, useEffect } from 'react';
import { resizedImage } from 'lib/functions';
import Image from 'next/image';
import { GravityFormsFieldPropsType } from 'lib/types';
import { CloseCircle, ExclamationCircle, FileLines, Upload } from 'flowbite-react-icons/outline';

const FileUpload = ({ field, file_upload, className = '', onChange, attempt, submitted, multipleUploadFiles }: GravityFormsFieldPropsType) => {
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
	const [file, setFile] = useState<File | null>(null);
	const [image, setImage] = useState<HTMLImageElement | null>(null);
	const [sizeInvalid, setSizeInvalid] = useState(false);
	const [typeInvalid, setTypeInvalid] = useState(false);

	//__Use Effect
	//Reset Value when form is submitted
	useEffect(() => {
		if (submitted) {
			setValue('');
		}
	}, [submitted]);

	//Update File
	useEffect(() => {
		let valid = true;
		if (field.isRequired) {
			if (value === '') {
				valid = false;
			}
		}
		setInvalid(!valid);

		if (value !== '') {
			setDirty(true);
		} else {
			setDirty(false);
		}

		//Image file checking
		setSizeInvalid(false);
		setTypeInvalid(false);
		const file_element = document.getElementById(id) as HTMLInputElement;
		if (file_element?.files) {
			const current_file = file_element?.files[0] || null;
			const file_type = current_file?.type || null;
			const accept_types = (field.allowedExtensions && field.allowedExtensions?.replace(/\s/g, '').split(',')) || [];

			if (current_file) {
				if (field.allowedExtensions && file_type && !accept_types.includes(file_type.split('/')[1])) {
					setTypeInvalid(true);
				} else if (field.maxFileSize && current_file?.size > field.maxFileSize * 1048576) {
					setSizeInvalid(true);
				} else {
					if (file_type?.split('/')[0] === 'image' && current_file) {
						resizedImage(current_file, 1600).then((res: any) => {
							const new_file = new File([res.blob], current_file.name, { type: current_file.type, lastModified: Number(new Date()) });
							setImage(res.image);
							setFile(new_file);
						});
					} else {
						setFile(current_file);
					}
				}
			}
		}
	}, [value]);

	//Send data to Form when files is updated
	useEffect(() => {
		let valid = true;
		if (field.isRequired) {
			if (!file) {
				valid = false;
			}
		}
		setInvalid(!valid);

		onChange({ name, value: file, valid });
	}, [file]);

	//Check Multiple File Upload fields
	useEffect(() => {
		//Check if admin label of multiple upload field matches this field
		if (field?.adminLabel && multipleUploadFiles?.label && field.adminLabel.split('_')[0] === multipleUploadFiles.label.split('_')[0]) {
			const multiple_field_number = field.adminLabel.split('_')[1] ? parseFloat(field.adminLabel.split('_')[1]) : 0;
			const multiple_field_match = multipleUploadFiles.files[multiple_field_number];
			if (multiple_field_match) {
				setFile(multiple_field_match);
			} else {
				setFile(null);
			}
		}
	}, [multipleUploadFiles]);

	//__Functions
	const change = (e: any) => {
		setValue(e.target.value);
	};
	const focus = () => {
		setDirty(true);
	};
	const blur = () => {
		if (value === '') {
			setDirty(false);
		}
	};
	const remove = (e: any) => {
		e.preventDefault();
		setValue('');
		setFile(null);
		setImage(null);
	};

	return (
		<div className={`form_field form_field_file ${className}${adminClasses.length ? ` ${adminClasses}` : ''}${!visible ? ' hidden' : ''}${dirty ? ' dirty' : ''}${invalid && attempt ? ' invalid' : ''}`}>
			<label htmlFor={id} className='form_label'>
				{field.labelPlacement !== 'hidden_label' ? (
					<span className='form_file_label'>
						{field.isRequired ? <span className='text-red-600'>*</span> : ''}
						<span>{label}</span>
					</span>
				) : null}
				{file ? (
					<span className='form_upload_file'>
						{image?.src ? (
							<span className='form_upload_image'>
								<Image src={image.src} height={150} width={150} alt='Image File' unoptimized />
							</span>
						) : (
							<>{file_upload?.file_icon || <FileLines size={25} />}</>
						)}
						<span className='form_upload_info'>{`${file.name} ${!file_upload?.show_file_size ? '' : `(${Math.round(file.size / 1024)} KB)`}`}</span>
					</span>
				) : (
					<span className='form_upload_button'>
						{file_upload?.upload_icon || <Upload size={35} />}
						<span>Select File</span>
					</span>
				)}
			</label>
			{file || field.defaultValue ? (
				<div className='form_upload_remove' onClick={(e) => remove(e)}>
					{file_upload?.remove_icon || <CloseCircle size={20} />}
					<span>Remove</span>
				</div>
			) : null}
			<input
				type='file'
				id={id}
				name={name}
				value={value}
				accept={
					field.allowedExtensions
						? field.allowedExtensions
								.replace(/\s/g, '')
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
					<span>{`File size must not exceed ${field.maxFileSize}MB.`}</span>
				</div>
			) : null}
			{typeInvalid ? (
				<div className='form_invalid_msg'>
					<ExclamationCircle size={18} />
					<span>The file type is invalid</span>
				</div>
			) : null}
		</div>
	);
};

export default FileUpload;
