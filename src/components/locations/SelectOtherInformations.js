import {TextField} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

const SelectOtherInfos = ({otherInfos, onSelectOtherInfos}) => {
	return (
		<div style={styles.container}>
			<p style={styles.title}>Autre infos</p>

			<TextField
				multiline
				style={styles.input}
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

SelectOtherInfos.propTypes = {
	onSelectOtherInfos: PropTypes.func.isRequired,
	otherInfos: PropTypes.string
};

export default SelectOtherInfos;
