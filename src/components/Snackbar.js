import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';

const SnackbarMessage = ({isOpen, setState, message}) => {
	return (
		<div>
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left'
				}}
				open={isOpen}
				autoHideDuration={6000}
				message={message}
				onClose={() => setState('')}
			/>
		</div>
	);
};

SnackbarMessage.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	setState: PropTypes.func.isRequired,
	message: PropTypes.string
};

export default SnackbarMessage;
