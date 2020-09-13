import React from 'react';
import PropTypes from 'prop-types';

const NavigationItem = ({Icon, text, onClick}) => (
	<div style={styles.container} onClick={onClick}>
		<Icon/>
		<p style={styles.text}>{text}</p>
	</div>
);

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 10
	},
	text: {
		marginLeft: 20
	}
};

NavigationItem.propTypes = {
	Icon: PropTypes.object.isRequired,
	text: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
};

export default NavigationItem;
