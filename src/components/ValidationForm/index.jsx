import PropTypes from 'prop-types';
import React, {useState} from 'react';
import InputField from '../Form-Controls/InputField';

ValidationForm.propTypes = {
	onsubmit: PropTypes.func,
};

function ValidationForm(props) {
	const [checkName, setCheckName] = useState(true);
	const [checkEmail, setCheckEmail] = useState(true);
	const [checkValue, setCheckValue] = useState(true);
	const [checkContact, setCheckContact] = useState(true);
	const [messageName, setMessageName] = useState('');
	const [messageEmail, setMessageEmail] = useState('');
	const [messageContact, setMessageContact] = useState('');
	const [messageGender, setMessageGender] = useState('');
	const [messageNotes, setMessageNotes] = useState('');

	const errorsMessage = {
		message: {name: '', email: '', contact: '', gender: '', notes: ''},
		validValue: false,
	};

	const handleSubmit = (values) => {
		const {onsubmit} = props;
		const isBelowThreshold = (currentValue) => currentValue !== '';

		while (Object.values(values).indexOf('') > -1) {
			setCheckValue(false);

			if (values.fullname === '') setMessageName('Name is Requied');
			if (values.email === '') setMessageEmail('Email is Requied');
			if (values.contact === '') setMessageContact('Contact is Requied');
			if (values.gender === '') setMessageGender('Gender is Requied');
			if (values.notes === '') setMessageNotes('Notes is Requied');

			return;
		}

		if (
			onsubmit &&
			checkContact !== false &&
			checkName !== false &&
			checkEmail !== false &&
			Object.values(values).every(isBelowThreshold) === true
		) {
			onsubmit(values);
			setCheckValue(true);
			errorsMessage['validValue'] = true;
		} else {
			errorsMessage['validValue'] = false;
		}
	};

	const handleErrors = (values) => {
		// check name
		const regexName = /\d+/g;
		const validateName = values.fullname.match(regexName);
		if (validateName !== null && values.name !== '') {
			setCheckName(false);
			setMessageName('Name is notValid');
			errorsMessage.message['name'] = messageName;
		} else {
			setCheckName(true);
			errorsMessage.message['name'] = '';
		}

		if (checkValue === false && values.fullname === '')
			errorsMessage.message['name'] = messageName;

		// check Email
		// /.+@.+\.[A-Za-z]+$/
		const regexEmail = /.+@.+\.[A-Za-z]+$/;
		const validateEmail = values.email.match(regexEmail);

		if (validateEmail === null && values.email !== '') {
			setCheckEmail(false);
			setMessageEmail('Email is notValid');
			errorsMessage.message['email'] = messageEmail;
		} else {
			setCheckEmail(true);
			errorsMessage.message['email'] = '';
		}

		if (checkValue === false && values.email === '')
			errorsMessage.message['email'] = messageEmail;

		// check contact
		const regexContact = /\D+/g;
		const regexContactNumber = /\d/g;
		const regexLength = /\d{6,12}/;
		const validateContact = values.contact.match(regexContact);
		const validateContactLength = values.contact.match(regexLength);
		const validateContactNumber = values.contact.match(regexContactNumber);

		if (validateContact !== null && values.contact !== '') {
			setCheckContact(false);
			setMessageContact('Contact is notValid');
			errorsMessage.message['contact'] = messageContact;
		} else {
			setCheckContact(true);

			if (
				(values.contact !== '' && validateContactLength === null) ||
				validateContactNumber?.length > 12
			) {
				setCheckContact(false);
				setMessageContact('Contact is between 6 - 12digit');
				errorsMessage.message['contact'] = messageContact;
			}
		}
		if (values.contact === '' && checkValue === false)
			errorsMessage.message['contact'] = messageContact;

		// check gender
		if (values.gender === '' && checkValue === false) {
			errorsMessage.message['gender'] = messageGender;
		} else {
			errorsMessage.message['gender'] = '';
		}

		// check notes
		if (values.notes === '' && checkValue === false) {
			errorsMessage.message['notes'] = messageNotes;
		} else {
			errorsMessage.message['notes'] = '';
		}
	};

	return (
		<div>
			<InputField
				onsubmit={handleSubmit}
				onerror={errorsMessage}
				onchange={handleErrors}
			/>
		</div>
	);
}

export default ValidationForm;
