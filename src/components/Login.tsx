import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import TagManager from 'react-gtm-module';

export const Login: React.FC = () => {
	const emailRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);
	const { login } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			setError('');
			setLoading(true);
			if (emailRef.current?.value && passwordRef.current?.value) {
				await login?.(emailRef.current?.value, passwordRef.current?.value);
			}
			history.push('/');
		} catch {
			setError('Failed to log in');
		}

		setLoading(false);
	};

	TagManager.dataLayer({
		dataLayer: {
			event: 'pageview',
			path: {
				page: {
					path: '/Login',
					title: 'Login',
				},
			},
		},
	});

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-4'>Log In</h2>
					{error && <Alert variant='danger'>{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id='email'>
							<Form.Label>Email</Form.Label>
							<Form.Control type='email' ref={emailRef} required />
						</Form.Group>
						<Form.Group id='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control type='password' ref={passwordRef} required />
						</Form.Group>
						<Button disabled={loading} className='w-100' type='submit'>
							Log In
						</Button>
					</Form>
					<div className='w-100 text-center mt-3'>
						<Link to='/forgot-password'>Forgot Password?</Link>
					</div>
				</Card.Body>
			</Card>
			<div className='w-100 text-center mt-2'>
				Need an account? <Link to='/signup'>Sign Up</Link>
			</div>
		</>
	);
};
