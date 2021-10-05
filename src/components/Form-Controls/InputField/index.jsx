import {Button, InputLabel, MenuItem, TextField} from '@mui/material';
import {Box} from '@mui/system';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import './style.scss';
InputField.propTypes = {
	onsubmit: PropTypes.func,
	onchange: PropTypes.func,
	onerror: PropTypes.func,
};

const genders = [
	{
		value: 'Male',
		label: 'Male',
	},
	{
		value: 'Female',
		label: 'Female',
	},
	{
		value: 'Others',
		label: 'Others',
	},
	{
		value: 'I wish not to say',
		label: 'I wish not to say',
	},
];

function InputField(props) {
	const {onchange, onerror} = props;
	const valueOfInput = {};

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [contact, setContact] = useState('');
	const [gender, setGender] = useState('');
	const [notes, setNotes] = useState('');

	name ? (valueOfInput['fullname'] = name) : (valueOfInput['fullname'] = '');
	email ? (valueOfInput['email'] = email) : (valueOfInput['email'] = '');
	contact ? (valueOfInput['contact'] = contact) : (valueOfInput['contact'] = '');
	gender ? (valueOfInput['gender'] = gender) : (valueOfInput['gender'] = '');
	notes ? (valueOfInput['notes'] = notes) : (valueOfInput['notes'] = '');

	const handleChange = (event) => {
		setGender(event.target.value);
	};

	const handleSubmit = (evt) => {
		const {onsubmit} = props;
		evt.preventDefault();

		if (onsubmit) {
			onsubmit(valueOfInput);
		}

		// reset form when finish submit
		// if (onerror.validValue === true) {
		// 	setName('');
		// 	setEmail('');
		// 	setContact('');
		// 	setGender('');
		// 	setNotes('');
		// }
	};

	if (onchange) {
		onchange(valueOfInput);
	}

	return (
		<form className='form-control' onSubmit={handleSubmit}>
			<Box
				sx={{
					'& .MuiTextField-root': {width: '37ch'},
				}}
			>
				<div className='format-form'>
					{/* Name Field */}
					<div className='field'>
						<InputLabel>Name*</InputLabel>
						<TextField
							margin='dense'
							error={onerror.message.name}
							helperText={onerror.message.name}
							value={name || ''}
							onChange={(e) => setName(e.target.value)}
							type='text'
						/>
					</div>

					{/* Email Field*/}
					<div className='field'>
						<InputLabel>Email-Address*</InputLabel>
						<TextField
							margin='dense'
							error={onerror.message.email}
							helperText={onerror.message.email}
							value={email || ''}
							onChange={(e) => setEmail(e.target.value)}
							type='text'
						/>
					</div>
				</div>

				<div className='format-form'>
					{/* Contact Field */}
					<div className='field'>
						<InputLabel>Contact*</InputLabel>
						<TextField
							margin='dense'
							error={onerror.message.contact}
							helperText={onerror.message.contact}
							value={contact || ''}
							onChange={(e) => setContact(e.target.value)}
							type='text'
						/>
					</div>

					<div className='field'>
						{/* Select Field */}
						<InputLabel>Gender*</InputLabel>
						<TextField
							margin='dense'
							error={onerror.message.gender}
							helperText={onerror.message.gender}
							select
							value={gender || ''}
							onChange={handleChange}
						>
							{genders.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
					</div>
				</div>
			</Box>
			<div className='field '>
				{/* Notes Field */}
				<InputLabel>Notes*</InputLabel>
				<TextField
					fullWidth
					margin='dense'
					error={onerror.message.notes}
					helperText={onerror.message.notes}
					multiline
					rows={5}
					value={notes}
					onChange={(e) => setNotes(e.target.value)}
				/>
			</div>
			<Button fullWidth type='submit'>
				save
			</Button>
		</form>
	);
}

export default InputField;
