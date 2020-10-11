import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, TextField} from '@material-ui/core';
import styles from '../components.module.css';
import {useHistory} from 'react-router-dom';
import Snackbar from '../Snackbar';
import {signup} from '../../requests';

const SignUp = ({onAccountCreated}) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');
	const [usernameError, setUsernameError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	const [passwordConfirmationError, setPasswordConfirmationError] = useState(null);
	const [messageSnackbar, setMessageSnackbar] = useState(null);
	const history = useHistory();

	const doSignUp = () => {
		setUsernameError(null);
		setPasswordError(null);
		setPasswordConfirmationError(null);

		if (username.length === 0) {
			setUsernameError('Veuillez saisir un nom d\'utilisateur');
			return;
		}

		if (password.length < 6) {
			setPasswordError('Veuillez saisir un mot de passe avec au moins 6 caratères');
			return;
		}

		if (password !== passwordConfirmation) {
			setPasswordConfirmationError('Les mots de passe ne correspondent pas');
			return;
		}

		signup(username, password)
			.then(() => {
				history.push('/login');
				onAccountCreated();
			})
			.catch(error => {
				const statusCode = error.response.status;
				if (statusCode === 403) {
					setUsernameError('Ce nom d\'utilisateur est déjà utilisé');
				} else {
					setMessageSnackbar('L\'inscription a échouée. Veuillez réessayer');
				}
			});
	};

	const goToLoginPage = () => {
		setUsername('');
		setPassword('');
		setPasswordConfirmation('');
		history.push('/login');
	};

	return (
		<div className={styles.authContainer}>
			<h1>Inscription</h1>
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
				helperText={passwordError || '6 caractères minimum'}
				onChange={event => setPassword(event.target.value)}
			/>

			<TextField
				className={styles.inputSelector}
				label="Confirmation de mot de passe"
				error={Boolean(passwordConfirmationError)}
				type="password"
				variant="outlined"
				value={passwordConfirmation}
				InputLabelProps={{
					shrink: true
				}}
				helperText={passwordConfirmationError}
				onChange={event => setPasswordConfirmation(event.target.value)}
			/>

			<br/>

			<Button color="primary" variant="contained" className={styles.button} onClick={doSignUp}>Valider</Button>
			<Button className={styles.secondaryButton} onClick={goToLoginPage}>Retour</Button>

			<Snackbar isOpen={Boolean(messageSnackbar)} setState={setMessageSnackbar} message={messageSnackbar}/>
		</div>
	);
};

SignUp.propTypes = {
	onAccountCreated: PropTypes.func.isRequired
};

export default SignUp;
