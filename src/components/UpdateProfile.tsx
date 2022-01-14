import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import TagManager from 'react-gtm-module';

export const UpdateProfile: React.FC = () => {
	const emailRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);
	const passwordConfirmRef = useRef<HTMLInputElement | null>(null);

	const { currentUser, updateUserPassword, updateUserEmail } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
			return setError('Passwords do not match');
		}

		const promise: Array<Promise<void>> = [];
		setLoading(true);
		setError('');

		if (emailRef.current?.value !== currentUser.email) {
			const emailChanged = updateUserEmail?.(emailRef.current?.value!);
			promise.push(emailChanged!);
		}

		if (passwordRef.current?.value) {
			const passwordChanged = updateUserPassword?.(passwordRef.current?.value!);
			promise.push(passwordChanged!);
		}

		Promise.all(promise)
			.then(() => {
				history.push('/');
			})
			.catch(() => {
				setError('Failed to update account');
			})
			.finally(() => {
				setLoading(false);
			});
	};

	TagManager.dataLayer({
		dataLayer: {
			event: 'pageview',
			path: {
				page: {
					path: '/update-profile',
					title: 'Update Profile',
				},
			},
		},
	});

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-4'>Update Profile</h2>
					{error && <Alert variant='danger'>{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id='email'>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type='email'
								ref={emailRef}
								required
								defaultValue={currentUser.email}
							/>
						</Form.Group>
						<Form.Group id='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								ref={passwordRef}
								placeholder='Leave blank to keep the same'
							/>
						</Form.Group>
						<Form.Group id='password-confirm'>
							<Form.Label>Password Confirmation</Form.Label>
							<Form.Control
								type='password'
								ref={passwordConfirmRef}
								placeholder='Leave blank to keep the same'
							/>
						</Form.Group>
						<Button disabled={loading} className='w-100' type='submit'>
							Update
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className='w-100 text-center mt-2'>
				<Link to='/'>Cancel</Link>
			</div>
		</>
	);
};
