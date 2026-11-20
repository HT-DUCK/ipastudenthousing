import { GravityFormsSubmitType } from 'lib/types';
import { LoadingSVG } from 'elements/assets';

const Submit = ({ children, text, disabled = false, submitting = false, className = '' }: GravityFormsSubmitType) => (
	<button type='submit' disabled={disabled} className={`form_submit ${className}`}>
		{children ? <span className='children'>{children}</span> : ''}
		{submitting ? <LoadingSVG className='form_submit_loading' /> : <span className='text' dangerouslySetInnerHTML={{ __html: text || 'Submit' }} />}
	</button>
);

export default Submit;
