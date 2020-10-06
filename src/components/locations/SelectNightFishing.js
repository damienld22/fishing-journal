import {TextField} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../components.module.css';

const SelectNightFishing = ({nightFishing, onSelectNightFishing}) => {
	return (
		<div className={styles.containerSelector}>
			<p className={styles.titleSelector}>Pêche de nuit</p>

			<TextField
				multiline
				className={styles.inputSelector}
				label="Pêche de nuit"
				type="text"
				variant="outlined"
				value={nightFishing || ''}
				InputLabelProps={{
					shrink: true
				}}
				onChange={event => onSelectNightFishing(event.target.value)}
			/>
		</div>
	);
};

SelectNightFishing.propTypes = {
	onSelectNightFishing: PropTypes.func.isRequired,
	nightFishing: PropTypes.string
};

export default SelectNightFishing;
