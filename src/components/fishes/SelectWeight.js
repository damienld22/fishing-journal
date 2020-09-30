import React from 'react';
import PropTypes from 'prop-types';
import {TextField} from '@material-ui/core';

const SelectWeight = ({weight, onSelectWeight}) => {
	return (
		<div style={styles.container}>
			<p style={styles.title}>Poids</p>

			<TextField defaultValue={weight || ''} style={styles.input} label="Poids en Kg" variant="outlined" type="number" onChange={event => onSelectWeight(event.target.value)}/>
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

SelectWeight.propTypes = {
	weight: PropTypes.string,
	onSelectWeight: PropTypes.func.isRequired
};

export default SelectWeight;
