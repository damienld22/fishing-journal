import {TextField} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../components.module.css';

const SelectNameLocation = ({nameLocation, onSelectNameLocation}) => {
	return (
		<div className={styles.containerSelector}>
			<p className={styles.titleSelector}>Nom</p>

			<TextField
				className={styles.inputSelector}
				label="Nom"
				type="text"
				variant="outlined"
				value={nameLocation || ''}
				InputLabelProps={{
					shrink: true
				}}
				onChange={event => onSelectNameLocation(event.target.value)}
			/>
		</div>
	);
};

SelectNameLocation.propTypes = {
	onSelectNameLocation: PropTypes.func.isRequired,
	nameLocation: PropTypes.string
};

export default SelectNameLocation;
