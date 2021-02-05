import React from 'react';
import PropTypes from 'prop-types';
import {Box} from '@material-ui/core';

const TabPanel = props => {
	const {children, value, index, ...other} = props;

	return (
		<div role="tabpanel" hidden={value !== index} {...other}>
			{value === index && (
				<Box p={3}>
					{children}
				</Box>
			)}
		</div>
	);
};

TabPanel.propTypes = {
	children: PropTypes.object,
	value: PropTypes.number.isRequired,
	index: PropTypes.number.isRequired
};

export default TabPanel;
