import {TextField} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../components.module.css';

const SelectOtherInfos = ({otherInfos, onSelectOtherInfos}) => {
	return (
		<div className={styles.containerSelector}>
			<p className={styles.titleSelector}>Autre infos</p>

			<TextField
				multiline
				className={styles.inputSelector}
				label="Autre infos"
				type="text"
				variant="outlined"
				value={otherInfos || ''}
				InputLabelProps={{
					shrink: true
				}}
				onChange={event => onSelectOtherInfos(event.target.value)}
			/>
		</div>
	);
};

SelectOtherInfos.propTypes = {
	onSelectOtherInfos: PropTypes.func.isRequired,
	otherInfos: PropTypes.string
};

export default SelectOtherInfos;
