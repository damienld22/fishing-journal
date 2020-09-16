import React, {useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import CreateFishModal from './createFish/createFishModal';

const Fishes = () => {
	const [createFishModalIsOpen, setCreateFishModalIsOpen] = useState(false);

	return (
		<div style={styles.container}>
			<h1>Liste des prises</h1>

			<IconButton style={styles.addButton} onClick={() => setCreateFishModalIsOpen(true)}>
				<AddIcon/>
			</IconButton>

			<CreateFishModal isOpen={createFishModalIsOpen} setState={setCreateFishModalIsOpen}/>
		</div>
	);
};

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	addButton: {
		position: 'absolute',
		bottom: '10%',
		right: '10%',
		backgroundColor: 'blue',
		color: 'white'
	}
};

export default Fishes;
