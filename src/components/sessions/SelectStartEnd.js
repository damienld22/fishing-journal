import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from '@material-ui/core';
import moment from 'moment';

const SelectStartEnd = ({onSelectStart, start, onSelectEnd, end}) => {
	moment.locale('fr');

	const formatCurrent = timestamp => {
		return moment.unix(timestamp).format('YYYY-MM-DD') + 'T' + moment.unix(timestamp).format('HH:mm');
	};

	const onUpdateDate = (value, callback) => {
		callback(moment(value.target.value).unix());
	};

	return (
		<div style={styles.container}>
			<p style={styles.title}>Date de début / fin</p>

			<TextField
				style={styles.input}
				label="Début"
				type="datetime-local"
				value={formatCurrent(start || Date.now())}
				InputLabelProps={{
					shrink: true
				}}
				onChange={value => onUpdateDate(value, onSelectStart)}/>

			<TextField
				style={styles.input}
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

const styles = {
	title: {
		fontSize: '1.5em',
		fontWeight: 'bold',
		fontStyle: 'italic'
	},
	input: {
		marginTop: 20
	},
	container: {
		paddingLeft: 20,
		paddingRight: 20,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start'
	}
};

SelectStartEnd.propTypes = {
	onSelectStart: PropTypes.func.isRequired,
	start: PropTypes.number,
	onSelectEnd: PropTypes.func.isRequired,
	end: PropTypes.number
};

export default SelectStartEnd;
