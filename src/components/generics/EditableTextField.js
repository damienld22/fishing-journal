import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, TextareaAutosize} from '@material-ui/core';
import styles from '../components.module.css';

const EditableTextField = ({text, onValidate}) => {
	const [currentText, setCurrentText] = useState(text || 'Aucun commentaire');
	const [readonly, setReadonly] = useState(true);

	useEffect(() => {
		if (text) {
			setCurrentText(text);
		}
	}, [text]);

	const handleValidateEdit = () => {
		setReadonly(true);
		onValidate(currentText);
	};

	const handleCancel = () => {
		setReadonly(true);
		setCurrentText(text || 'Aucun commentaire');
	};

	return (
		<div>
			<TextareaAutosize
				style={{width: '100%'}}
				label="Commentaires"
				readOnly={readonly}
				rowsMin={5}
				rowsMax={5}
				value={currentText}
				onChange={evt => setCurrentText(evt.target.value)}
			/>
			<div className={styles.buttons}>
				{ !readonly && <Button size="small" className={styles.button} onClick={handleCancel}>Annuler</Button>}
				{
					readonly ? (

						<Button size="small" className={styles.button} onClick={() => setReadonly(false)}>Editer</Button>
					) : (
						<Button size="small" className={styles.button} onClick={handleValidateEdit}>Valider</Button>
					)
				}
			</div>
		</div>
	);
};

EditableTextField.propTypes = {
	text: PropTypes.string,
	onValidate: PropTypes.func.isRequired
};

export default EditableTextField;
