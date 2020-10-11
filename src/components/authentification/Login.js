import React, {useEffect, useState} from 'react';
import {Button, TextField} from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from '../components.module.css';
import Snackbar from '../Snackbar';
import {authenticate} from '../../requests';
import {useHistory} from 'react-router-dom';

const Login = ({onConnection, onLogout}) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [usernameError, setUsernameError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	const [messageSnackbar, setMessageSnackbar] = useState(null);
	const history = useHistory();

	useEffect(() => {
		localStorage.removeItem('access_token');
		onLogout();
	}, [onLogout]);

	const goToSignUpPage = () => {
		history.push('/sign-up');
	};

	const doConnection = () => {
		setUsernameError(null);
		setPasswordError(null);

		if (username.length === 0) {
			setUsernameError('Veuillez saisir un nom d\'utilisateur');
			return;
		}

		if (password.length === 0) {
			setPasswordError('Veuillez saisir un mot de passe');
			return;
		}

		authenticate(username, password)
			.then(({data}) => {
				localStorage.setItem('access_token', data.access_token);
				history.push('/sessions');
				onConnection();
			})
			.catch(() => {
				setMessageSnackbar('Mauvais nom d\'utilisateur ou mot de passe');
			});
	};

	return (
		<div className={styles.authContainer}>
			<h1>Connexion</h1>
			<TextField
				className={styles.inputSelector}
				label="Nom d'utilisateur"
				error={Boolean(usernameError)}
				type="text"
				variant="outlined"
				value={username}
				InputLabelProps={{
					shrink: true
				}}
				helperText={usernameError}
				onChange={event => setUsername(event.target.value)}
			/>
			<TextField
				className={styles.inputSelector}
				label="Mot de passe"
				error={Boolean(passwordError)}
				type="password"
				variant="outlined"
				value={password}
				InputLabelProps={{
					shrink: true
				}}
				helperText={passwordError}
				onChange={event => setPassword(event.target.value)}
			/>

			<br/>

			<Button color="primary" variant="contained" className={styles.button} onClick={doConnection}>Se connecter</Button>
			<Button className={styles.secondaryButton} onClick={goToSignUpPage}>S'inscrire</Button>

			<Snackbar isOpen={Boolean(messageSnackbar)} setState={setMessageSnackbar} message={messageSnackbar}/>
		</div>
	);
};

Login.propTypes = {
	onConnection: PropTypes.func.isRequired,
	onLogout: PropTypes.func.isRequired
};

export default Login;
