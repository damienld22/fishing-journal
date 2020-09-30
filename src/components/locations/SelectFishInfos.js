import {TextField} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

const SelectFishInfos = ({fishInfos, onSelectFishInfos}) => {
	return (
		<div style={styles.container}>
			<p style={styles.title}>Population</p>

			<TextField
				multiline
				style={styles.input}
				label="Population"
				type="text"
				variant="outlined"
				value={fishInfos || ''}
				InputLabelProps={{
					shrink: true
				}}
				onChange={event => onSelectFishInfos(event.target.value)}
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

SelectFishInfos.propTypes = {
	onSelectFishInfos: PropTypes.func.isRequired,
	fishInfos: PropTypes.string
};

export default SelectFishInfos;
