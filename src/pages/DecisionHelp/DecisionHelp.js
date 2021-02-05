import React, {useState} from 'react';
import {IconButton, Tab, Tabs} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import TabPanel from '../../components/shared/TabPanel';
import './DecisionHelp.scss';

const DecisionHelpPage = () => {
	const [currentTab, setCurrentTab] = useState(0);

	return (
		<div className="container">
			<h1>Aide à la décision</h1>

			<Tabs value={currentTab} indicatorColor="primary" textColor="primary" onChange={(_, value) => setCurrentTab(value)}>
				<Tab label="Paramètres"/>
				<Tab label="Éléments"/>
			</Tabs>

			<TabPanel value={currentTab} index={0}>
				Paramètres
			</TabPanel>

			<TabPanel value={currentTab} index={1}>
				Éléments
			</TabPanel>

			<IconButton className="addButton" onClick={() => {}}>
				<AddIcon/>
			</IconButton>
		</div>

	);
};

export default DecisionHelpPage;
