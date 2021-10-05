import {Button, InputLabel, Typography} from '@mui/material';
import React, {useState} from 'react';
import ValidationForm from '../components/ValidationForm';
import './style.scss';

function ChallengeForm(props) {
	const [showResults, setShowResults] = useState(false);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [contact, setContact] = useState('');
	const [gender, setGender] = useState('');
	const [notes, setNotes] = useState('');

	const handeFormSubmit = (values) => {
		if (values) {
			setShowResults(true);
		}

		setName(values.fullname);
		setEmail(values.email);
		setContact(values.contact);
		setGender(values.gender);
		setNotes(values.notes);
	};

	return (
		<div>
			<div style={showResults === false ? {} : {display: 'none'}}>
				<ValidationForm onsubmit={handeFormSubmit} />
			</div>

			<div style={showResults === true ? {} : {display: 'none'}}>
				<div className='edit-page'>
					<div className='info-list'>
						<div>
							<InputLabel>Name*</InputLabel>
							<div className='info'>
								<Typography>{name}</Typography>
							</div>
						</div>

						<div>
							<InputLabel>Email-Address*</InputLabel>
							<div className='info'>
								<Typography>{email}</Typography>
							</div>
						</div>
					</div>

					<div className='info-list'>
						<div>
							<InputLabel>Contact*</InputLabel>
							<div className='info'>
								<Typography>{contact}</Typography>
							</div>
						</div>

						<div>
							<InputLabel>Gender*</InputLabel>
							<div className='info'>
								<Typography>{gender}</Typography>
							</div>
						</div>
					</div>
					<div>
						<InputLabel>Notes*</InputLabel>
						<div className='notes'>
							<Typography>{notes}</Typography>
						</div>
					</div>
					<Button fullWidth onClick={() => setShowResults(false)}>
						Edit
					</Button>
				</div>
			</div>
		</div>
	);
}

export default ChallengeForm;
