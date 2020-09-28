import React from 'react';
import {Card, CardContent} from '@material-ui/core';
import moment from 'moment';
import PropTypes from 'prop-types';
import localization from 'moment/locale/fr';

const FishItem = ({fish, onClick}) => {
	moment().locale('fr', localization);

	return (
		<Card style={styles.card} onClick={onClick}>
			<CardContent style={styles.cardContent}>
				{fish.picture ? <img alt="catch" height={50} src={fish.picture}/> : <p>/</p>}
				<p>{fish.weight ? `${fish.weight} kg` : '/'}</p>
				<p>{fish.catchDate ? moment(fish.catchDate * 1000).format('lll') : '/'}</p>
			</CardContent>
		</Card>
	);
};

const styles = {
	card: {
		width: '90%',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: 10,
		marginBottom: 10
	},
	cardContent: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	}
};

FishItem.propTypes = {
	fish: PropTypes.object,
	onClick: PropTypes.func.isRequired
};

export default FishItem;
