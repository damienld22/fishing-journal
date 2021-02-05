import React, {useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import PublishIcon from '@material-ui/icons/Publish';
import PropTypes from 'prop-types';
import styles from '../components.module.css';

const SelectPicture = ({onSelectPicture, picture, pictureContainer: PictureContainer}) => {
	const [toDisplayPicture, setToDisplayPicture] = useState(picture);

	const handleCapture = ({target}) => {
		onSelectPicture(target.files[0]);

		const fileReader = new FileReader();
		fileReader.addEventListener('load', event => {
			const image = new Image();
			image.src = event.target.result;

			image.addEventListener('load', function () {
				const canvas = document.createElement('canvas');
				let ctx = canvas.getContext('2d');
				ctx.drawImage(this, 0, 0);

				const MAX_WIDTH = 1000;
				const MAX_HEIGHT = 1000;
				let width = this.width;
				let height = this.height;

				if (width > height) {
					if (width > MAX_WIDTH) {
						height *= MAX_WIDTH / width;
						width = MAX_WIDTH;
					}
				} else if (height > MAX_HEIGHT) {
					width *= MAX_HEIGHT / height;
					height = MAX_HEIGHT;
				}

				canvas.width = width;
				canvas.height = height;

				ctx = canvas.getContext('2d');
				ctx.drawImage(this, 0, 0, width, height);

				const dataurl = canvas.toDataURL(target.files[0].type);
				setToDisplayPicture(dataurl);
			});
		});
		fileReader.readAsDataURL(target.files[0]);
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

			{ picture && <PictureContainer alt="current" src={toDisplayPicture} height={100}/>}
		</div>
	);
};

SelectPicture.propTypes = {
	onSelectPicture: PropTypes.func.isRequired,
	picture: PropTypes.object,
	pictureContainer: PropTypes.func
};

export default SelectPicture;
