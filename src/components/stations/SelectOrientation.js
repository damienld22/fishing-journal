import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import GyroNorm from 'gyronorm';
import styles from '../components.module.css';
import {Button} from '@material-ui/core';

const gn = new GyroNorm();

const SelectOrientation = ({value, onSelectValue}) => {
	const [current, setCurrent] = useState(value);

	useEffect(() => {
		gn.init({orientationBase: GyroNorm.WORLD, decimalCount: 1, gravityNormalized: true, frequency: 50}).then(() => {
			gn.start(data => {
				setCurrent(`${data.do.alpha} : ${data.do.beta} : ${data.do.gamma} : ${data.do.absolute}`);
			});
		}).catch(error => {
			console.log('Device orientation not supported', error);
		});
	});

	return (
		<div className={styles.containerSelector}>
			<p className={styles.titleSelector}>Orientation</p>

			<p>{current || '/'}</p>

			<Button onClick={() => onSelectValue(current)}>OK</Button>
		</div>
	);
};

SelectOrientation.propTypes = {
	onSelectValue: PropTypes.func.isRequired,
	value: PropTypes.number
};

export default SelectOrientation;
