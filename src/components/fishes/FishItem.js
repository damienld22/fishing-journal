import React from 'react';
import {Card, CardContent} from '@material-ui/core';
import moment from 'moment';
import PropTypes from 'prop-types';
import localization from 'moment/locale/fr';
import styles from '../components.module.css';

const FishItem = ({fish, onClick}) => {
	moment().locale('fr', localization);

	return (
		<Card className={styles.card} onClick={onClick}>
			<CardContent className={styles.cardContent}>
				{fish.picture ? <img alt="catch" height={50} src={fish.picture}/> : <p>/</p>}
				<p>{fish.weight ? `${fish.weight} kg` : '/'}</p>
				<p>{fish.catchDate ? moment.unix(fish.catchDate).format('lll') : '/'}</p>
			</CardContent>
		</Card>
	);
};

FishItem.propTypes = {
	fish: PropTypes.object,
	onClick: PropTypes.func.isRequired
};

export default FishItem;
