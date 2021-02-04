import {TextField} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../components.module.css';

const SelectNumber = ({title, value, onSelectValue}) => {
	return (
		<div className={styles.containerSelector}>
			<p className={styles.titleSelector}>{title}</p>

			<TextField
				className={styles.inputSelector}
				label={title}
				type="number"
				variant="outlined"
				value={value || ''}
				InputLabelProps={{
					shrink: true
				}}
				onChange={event => onSelectValue(event.target.value)}
			/>
		</div>
	);
};

SelectNumber.propTypes = {
	title: PropTypes.string.isRequired,
	onSelectValue: PropTypes.func.isRequired,
	value: PropTypes.number
};

export default SelectNumber;
