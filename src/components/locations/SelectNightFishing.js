import {TextField} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

const SelectNightFishing = ({nightFishing, onSelectNightFishing}) => {
	return (
		<div style={styles.container}>
			<p style={styles.title}>Pêche de nuit</p>

			<TextField
				multiline
				style={styles.input}
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

SelectNightFishing.propTypes = {
	onSelectNightFishing: PropTypes.func.isRequired,
	nightFishing: PropTypes.string
};

export default SelectNightFishing;
