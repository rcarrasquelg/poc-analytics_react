import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SignUp } from './components/Signup';
import { Dashboard } from './components/Dashboard';
import { Login } from './components/Login';
import { PrivateRoute } from './components/PrivateRoute';
import { ForgotPassword } from './components/ForgotPassword';
import { UpdateProfile } from './components/UpdateProfile';

import TagManager from 'react-gtm-module';

const tagManagerArgs = {
	gtmId: 'GTM-P9F7SQ8',
};

TagManager.initialize(tagManagerArgs);
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

function App() {
	return (
		<Container
			className='d-flex align-items-center justify-content-center'
			style={{ minHeight: '100vh' }}
		>
			<div className='w-100' style={{ maxWidth: '400px' }}>
				<Router>
					<AuthProvider>
						<Switch>
							<PrivateRoute exact path='/' component={Dashboard} />
							<PrivateRoute path='/update-profile' component={UpdateProfile} />
							<Route path='/signup' component={SignUp} />
							<Route path='/login' component={Login} />
							<Route path='/forgot-password' component={ForgotPassword} />
						</Switch>
					</AuthProvider>
				</Router>
			</div>
		</Container>
	);
}

export default App;
