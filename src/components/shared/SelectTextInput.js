import {TextField} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../components.module.css';

const SelectTextInput = ({value, onSelectValue, title}) => {
	return (
		<div className={styles.containerSelector}>
			<p className={styles.titleSelector}>{title}</p>

			<TextField
				multiline
				className={styles.inputSelector}
				label={title}
				type="text"
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

SelectTextInput.propTypes = {
	onSelectValue: PropTypes.func.isRequired,
	value: PropTypes.string,
	title: PropTypes.string.isRequired
};

export default SelectTextInput;
