import React, { FC, useState } from 'react';
import { Button, Card, Form, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const SignUp: FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		if (password !== passwordConfirm) {
			setError('Passwords dont match');
		}

		createUserWithEmailAndPassword(auth, email, password)
			.then(() => {
				setLoading(true);
				history.push('/');
			})
			.catch(error => {
				console.log(error);
			});

		setLoading(false);
	};

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-4'>Sign Up</h2>
					{error && <Alert variant='danger'>{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id='email'>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type='email'
								value={email}
								onChange={e => setEmail(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group id='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								value={password}
								onChange={e => setPassword(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group id='password-confirm'>
							<Form.Label>Password Confirmation</Form.Label>
							<Form.Control
								type='password'
								value={passwordConfirm}
								onChange={e => setPasswordConfirm(e.target.value)}
								required
							/>
						</Form.Group>
						<Button disabled={loading} className='w-100' type='submit'>
							Sign Up
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className='w-100 text-center mt-2'>
				Already have an account? <Link to='/login'>Log In</Link>
			</div>
		</>
	);
};
