import React from 'react';
import PropTypes from 'prop-types';
import styles from './menu.module.css';

const NavigationItem = ({Icon, text, onClick}) => (
	<div className={styles.container} onClick={onClick}>
		<Icon/>
		<p className={styles.text}>{text}</p>
	</div>
);

NavigationItem.propTypes = {
	Icon: PropTypes.object.isRequired,
	text: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
};

export default NavigationItem;
