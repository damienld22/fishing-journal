import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Dialog, DialogTitle, Button, TextField, FormControl, InputLabel, Select, CircularProgress} from '@material-ui/core';
import Snackbar from '../Snackbar';
import {createReference} from '../../requests';
import styles from '../components.module.css';

const CreateReferenceModal = ({isOpen, setState, availableCategories}) => {
	const [name, setName] = useState(null);
	const [link, setLink] = useState(null);
	const [category, setCategory] = useState('other');
	const [newCategory, setNewCategory] = useState(null);
	const [messageSnackbar, setMessageSnackbar] = useState('');
	const [displayProgress, setDisplayProgress] = useState(false);

	const onHandleCancel = () => {
		setName(null);
		setLink(null);
		setCategory('other');
		setNewCategory(null);
		setState(false);
	};

	const canValidate = () => {
		const hasNewCategory = category === 'other' && newCategory && newCategory.length > 0;
		const hasItemName = name && name.length > 0;
		const hasLink = link && link.length > 0;
		const hasExistingCategory = category !== 'other' && category && category.length > 0;
		return hasItemName && hasLink && (hasExistingCategory || hasNewCategory);
	};

	const onValidate = () => {
		setDisplayProgress(true);
		createReference({name, link, category: category === 'other' ? newCategory : category})
			.then(() => {
				setDisplayProgress(false);
				setName(null);
				setCategory('other');
				setNewCategory(null);
				setState(false);
			})
			.catch(() => {
				setMessageSnackbar('La sauvegarde de la référence a échouée.');
				setDisplayProgress(false);
			});
	};

	return (
		<Dialog fullWidth open={isOpen} maxWidth="xl" onClose={onHandleCancel}>
			<DialogTitle>Nouvelle référence</DialogTitle>

			<div className={styles.containerSelector}>
				<TextField
					className={styles.inputSelector}
					label="Nom"
					type="text"
					variant="outlined"
					value={name || ''}
					InputLabelProps={{
						shrink: true
					}}
					onChange={event => setName(event.target.value)}
				/>

				<TextField
					className={styles.inputSelector}
					label="Lien"
					type="text"
					variant="outlined"
					value={link || ''}
					InputLabelProps={{
						shrink: true
					}}
					onChange={event => setLink(event.target.value)}
				/>

				<FormControl className={styles.inputSelectorList}>
					<InputLabel htmlFor="category">Categorie</InputLabel>
					<Select
						native
						value={category || ''}
						inputProps={{name: 'category', id: 'category'}}
						onChange={evt => setCategory(evt.target.value)}
					>
						{
							availableCategories.map(category => (
								<option key={category} value={category}>{category}</option>
							))
						}
						<option aria-label="other" value="other">Autre</option>
					</Select>
				</FormControl>

				{ category === 'other' && <TextField
					className={styles.inputSelector}
					label="Nouvelle catégorie"
					type="text"
					variant="outlined"
					value={newCategory || ''}
					InputLabelProps={{
						shrink: true
					}}
					onChange={event => setNewCategory(event.target.value)}
				/>}
			</div>

			<br/>

			<div className={styles.buttons}>
				<Button className={styles.button} onClick={onHandleCancel}>Annuler</Button>
				<Button disabled={!canValidate()} className={styles.button} onClick={onValidate}>Ajouter</Button>
			</div>

			{ displayProgress && <CircularProgress className={styles.progress}/>}
			<Snackbar isOpen={Boolean(messageSnackbar)} setState={setMessageSnackbar} message={messageSnackbar}/>
		</Dialog>
	);
};

CreateReferenceModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	setState: PropTypes.func.isRequired,
	availableCategories: PropTypes.arrayOf(PropTypes.string)
};

export default CreateReferenceModal;
