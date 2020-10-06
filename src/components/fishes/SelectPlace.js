import {TextField} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../components.module.css';

const SelectPlace = ({place, onSelectPlace}) => {
	return (
		<div className={styles.containerSelector}>
			<p className={styles.titleSelector}>Zone de capture</p>

			<TextField
				className={styles.inputSelector}
				label="Zone de capture"
				type="text"
				variant="outlined"
				value={place || ''}
				InputLabelProps={{
					shrink: true
				}}
				onChange={event => onSelectPlace(event.target.value)}
			/>
		</div>
	);
};

SelectPlace.propTypes = {
	onSelectPlace: PropTypes.func.isRequired,
	place: PropTypes.string
};

export default SelectPlace;
