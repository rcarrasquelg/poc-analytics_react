import React, { useState, useEffect, useContext } from 'react';
import { auth } from '../firebaseConfig';
import {
	signInWithEmailAndPassword,
	signOut,
	sendPasswordResetEmail,
	updateEmail,
	updatePassword,
	onAuthStateChanged,
	User,
	UserCredential,
} from 'firebase/auth';

interface IAuthContext {
	login?: (email: string, password: string) => Promise<UserCredential>;
	logout?: () => Promise<void>;
	resetPassword?: (email: string) => Promise<void>;
	updateUserEmail?: (email: string) => Promise<void>;
	updateUserPassword?: (password: string) => Promise<void>;
	currentUser?: any;
}

export const AuthContext = React.createContext<IAuthContext>({});

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	const login = (email: string, password: string) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const logout = () => {
		return signOut(auth);
	};

	const resetPassword = (email: string) => {
		return sendPasswordResetEmail(auth, email);
	};

	const updateUserEmail = (email: string) => {
		return updateEmail(currentUser!, email);
	};

	const updateUserPassword = (password: string) => {
		return updatePassword(currentUser!, password);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user: any) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		login,
		// signup,
		logout,
		resetPassword,
		updateUserEmail,
		updateUserPassword,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};
