import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import styles from '../components.module.css';

const SelectOrientation = ({value, onSelectValue}) => {
	useEffect(() => {
		function handleOrientation(evt) {
			onSelectValue(Math.floor(evt.alpha));
		}

		window.addEventListener('deviceorientationabsolute', handleOrientation, true);

		return () => window.removeEventListener('deviceorientationabsolute', handleOrientation);
	}, [onSelectValue]);

	return (
		<div className={styles.containerSelector}>
			<p className={styles.titleSelector}>Orientation</p>

			<p>{value ? `${value}°` : '0°'}</p>
		</div>
	);
};

SelectOrientation.propTypes = {
	onSelectValue: PropTypes.func.isRequired,
	value: PropTypes.number
};

export default SelectOrientation;
