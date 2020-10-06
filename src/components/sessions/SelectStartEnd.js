import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from '@material-ui/core';
import moment from 'moment';
import styles from '../components.module.css';

const SelectStartEnd = ({onSelectStart, start, onSelectEnd, end}) => {
	const formatCurrent = timestamp => {
		return moment.unix(timestamp).format('YYYY-MM-DD') + 'T' + moment.unix(timestamp).format('HH:mm');
	};

	const onUpdateDate = (value, callback) => {
		callback(moment(value.target.value).unix());
	};

	return (
		<div className={styles.containerSelector}>
			<p className={styles.titleSelector}>Date de début / fin</p>

			<TextField
				className={styles.inputSelector}
				label="Début"
				type="datetime-local"
				value={formatCurrent(start || Date.now())}
				InputLabelProps={{
					shrink: true
				}}
				onChange={value => onUpdateDate(value, onSelectStart)}/>

			<TextField
				className={styles.inputSelector}
				label="Fin"
				type="datetime-local"
				value={formatCurrent(end || Date.now())}
				InputLabelProps={{
					shrink: true
				}}
				onChange={value => onUpdateDate(value, onSelectEnd)}/>
		</div>
	);
};

SelectStartEnd.propTypes = {
	onSelectStart: PropTypes.func.isRequired,
	start: PropTypes.number,
	onSelectEnd: PropTypes.func.isRequired,
	end: PropTypes.number
};

export default SelectStartEnd;
