import {TextField} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../components.module.css';

const SelectDescription = ({description, onSelectDescription}) => {
	return (
		<div className={styles.containerSelector}>
			<p className={styles.titleSelector}>Description</p>

			<TextField
				multiline
				className={styles.inputSelector}
				label="Description"
				type="text"
				variant="outlined"
				value={description || ''}
				InputLabelProps={{
					shrink: true
				}}
				onChange={event => onSelectDescription(event.target.value)}
			/>
		</div>
	);
};

SelectDescription.propTypes = {
	onSelectDescription: PropTypes.func.isRequired,
	description: PropTypes.string
};

export default SelectDescription;
