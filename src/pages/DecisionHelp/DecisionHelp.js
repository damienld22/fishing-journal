import React, {useEffect, useState} from 'react';
import {IconButton, Tab, Tabs} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import TabPanel from '../../components/shared/TabPanel';
import {getDecisionHelp, updateDecisionHelp} from '../../requests';
import SnackbarMessage from '../../components/Snackbar';
import ParameterItem from '../../components/decisionHelp/ParameterItem';
import ElementsByCategoryItem from '../../components/decisionHelp/ElementsByCategoryItem';
import './DecisionHelp.scss';
import CreateParameterModal from '../../components/decisionHelp/CreateParameterModal';
import CreateElementModal from '../../components/decisionHelp/CreateElementModal';

const DecisionHelpPage = () => {
	const [currentTab, setCurrentTab] = useState(0);
	const [decisionHelpId, setDecisionHelpId] = useState(null);
	const [parameters, setParameters] = useState([]);
	const [elements, setElements] = useState([]);
	const [snackbarMessage, setSnackbarMessage] = useState(null);
	const [createParameterIsOpen, setCreateParameterIsOpen] = useState(false);
	const [createElementIsOpen, setCreateElementIsOpen] = useState(false);

	useEffect(() => {
		getDecisionHelp()
			.then(({data}) => {
				if (data) {
					setDecisionHelpId(data._id);
					setParameters(data.parameters || []);
					setElements(data.elements || []);
				}
			})
			.catch(() => setSnackbarMessage('Erreur lors de la récupération des éléments.'));
	}, []);

	const saveDecisionHelp = () => {
		updateDecisionHelp({elements, parameters, _id: decisionHelpId})
			.then(() => setSnackbarMessage('Les éléments ont été sauvegardés.'))
			.catch(() => setSnackbarMessage('Erreur lors de la sauvegarde des éléments.'));
	};

	const handleSaveElement = newElement => {
		setElements(previous => {
			const categoryInListIndex = previous.findIndex(elt => elt.category === newElement.category);
			const categoryInList = categoryInListIndex > -1 ? previous[categoryInListIndex] : {category: newElement.category, elts: []};
			const newElements = [...categoryInList.elts, {name: newElement.name, description: newElement.description}];
			categoryInList.elts = newElements;
			const newList = [...previous];

			if (categoryInListIndex > -1) {
				newList[categoryInListIndex] = categoryInList;
			} else {
				newList.push(categoryInList);
			}

			return newList;
		});
	};

	const handleDeleteElement = (elementIndex, category) => {
		setElements(previous => {
			const newElements = [...previous];
			const categoryOfDeletedElementIndex = newElements.findIndex(elt => elt.category === category);
			const newElementsOfCategory = newElements[categoryOfDeletedElementIndex].elts;
			newElementsOfCategory.splice(elementIndex, 1);

			if (newElementsOfCategory.length === 0) {
				newElements.splice(categoryOfDeletedElementIndex, 1);
			} else {
				newElements[categoryOfDeletedElementIndex].elts = newElementsOfCategory;
			}

			return newElements;
		});
	};

	return (
		<div className="container">
			<h1>Aide à la décision</h1>

			<IconButton onClick={saveDecisionHelp}>
				<SaveIcon/>
			</IconButton>

			<Tabs value={currentTab} indicatorColor="primary" textColor="primary" onChange={(_, value) => setCurrentTab(value)}>
				<Tab label="Paramètres"/>
				<Tab label="Éléments"/>
			</Tabs>

			<TabPanel value={currentTab} index={0} style={{width: '100%'}}>
				{ parameters.map((parameter, index) => (
					<ParameterItem key={index} parameter={parameter} onDelete={() => setParameters(previous => previous.filter((elt, i) => i !== index))}/>
				))}
			</TabPanel>

			<TabPanel value={currentTab} index={1} style={{width: '100%'}}>
				{
					elements.map((element, index) => (
						<ElementsByCategoryItem key={index} element={element} onDelete={handleDeleteElement}/>
					))
				}
			</TabPanel>

			<IconButton
				className="addButton" onClick={() => {
					if (currentTab === 0) {
						setCreateParameterIsOpen(true);
					} else if (currentTab === 1) {
						setCreateElementIsOpen(true);
					}
				}}
			>
				<AddIcon/>
			</IconButton>

			<CreateParameterModal
				isOpen={createParameterIsOpen} onClose={() => setCreateParameterIsOpen(false)} onValidate={parameter => {
					setCreateParameterIsOpen(false);
					setParameters([...parameters, parameter]);
				}}/>

			<CreateElementModal
				isOpen={createElementIsOpen} categories={elements.map(elt => elt.category)} onClose={() => setCreateElementIsOpen(false)}
				onValidate={newElement => {
					setCreateElementIsOpen(false);
					handleSaveElement(newElement);
				}}/>
			<SnackbarMessage isOpen={Boolean(snackbarMessage)} message={snackbarMessage} setState={setSnackbarMessage}/>
		</div>

	);
};

export default DecisionHelpPage;
