import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import PublishIcon from '@material-ui/icons/Publish';
import PropTypes from 'prop-types';
import styles from '../components.module.css';

const SelectPicture = ({onSelectPicture, picture}) => {
	const handleCapture = ({target}) => {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(target.files[0]);
		fileReader.addEventListener('load', event => onSelectPicture(event.target.result));
	};

	return (
		<div className={styles.containerSelector}>
			<p className={styles.titleSelector}>Photo</p>

			<div className={styles.buttonsSelectPicture}>
				<input accept="image/*" id="icon-button-photo" type="file" style={{display: 'none'}} onChange={handleCapture}/>
				<label htmlFor="icon-button-photo">
					<IconButton color="primary" component="span">
						<PublishIcon/>
					</IconButton>
				</label>
			</div>

			{ picture && <img alt="Current catch" src={picture} height={100}/>}
		</div>
	);
};

SelectPicture.propTypes = {
	onSelectPicture: PropTypes.func.isRequired,
	picture: PropTypes.string
};

export default SelectPicture;
