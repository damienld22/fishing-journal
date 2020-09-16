import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import PublishIcon from '@material-ui/icons/Publish';
import PropTypes from 'prop-types';

const SelectPicture = ({onSelectPicture, picture}) => {
	const handleCapture = ({target}) => {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(target.files[0]);
		fileReader.addEventListener('load', event => onSelectPicture(event.target.result));
	};

	return (
		<div style={styles.container}>
			<p style={styles.title}>Photo</p>

			<div style={styles.buttons}>
				<input accept="image/*" id="icon-button-photo" type="file" style={{display: 'none'}} onChange={handleCapture}/>
				<label htmlFor="icon-button-photo">
					<IconButton color="primary" component="span">
						<PublishIcon/>
					</IconButton>
				</label>
			</div>

			<img src={picture} height={100}/>
		</div>
	);
};

const styles = {
	title: {
		fontSize: '1.5em',
		fontWeight: 'bold',
		fontStyle: 'italic'
	},
	container: {
		paddingLeft: 20,
		paddingRight: 20,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start'
	},
	buttons: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		marginBottom: 20
	}
};

SelectPicture.propTypes = {
	onSelectPicture: PropTypes.func.isRequired,
	picture: PropTypes.string
};

export default SelectPicture;
