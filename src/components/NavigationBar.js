import React, {useState} from 'react';
import {AppBar, Toolbar, IconButton, Drawer, Divider} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import FishingIcon from '@material-ui/icons/ThumbUp';
import LocationIcon from '@material-ui/icons/LocationOn';
import ListIcon from '@material-ui/icons/List';
import SessionIcon from '@material-ui/icons/Event';
import NavigationItem from './NavigationItem';
import {useHistory} from 'react-router-dom';
import styles from './menu.module.css';

const NavigationBar = () => {
	const [drawerIsOpen, setDrawerOpen] = useState(false);
	const history = useHistory();

	return (
		<AppBar position="sticky">
			<Toolbar>
				<IconButton className={styles.menuIcon} edge="start" onClick={() => setDrawerOpen(true)}>
					<MenuIcon/>
				</IconButton>
				<p>Carnet de pêche</p>
			</Toolbar>

			<Drawer
				variant="temporary"
				className={styles.drawer}
				open={drawerIsOpen}
				onBackdropClick={() => setDrawerOpen(false)} onEscapeKeyDown={() => setDrawerOpen(false)}
			>
				<div className={styles.drawerPaper}>
					<div className={styles.closeButton}>
						<IconButton onClick={() => setDrawerOpen(false)}>
							<ChevronLeftIcon/>
						</IconButton>
					</div>

					<NavigationItem
						Icon={SessionIcon} text="Mes sessions" onClick={() => {
							setDrawerOpen(false);
							history.push('/sessions');
						}}/>

					<Divider/>

					<NavigationItem
						Icon={FishingIcon} text="Prises" onClick={() => {
							setDrawerOpen(false);
							history.push('/fishes');
						}}/>

					<Divider/>

					<NavigationItem
						Icon={LocationIcon} text="Plans / cours d'eau" onClick={() => {
							setDrawerOpen(false);
							history.push('/locations');
						}}/>

					<Divider/>

					<NavigationItem
						Icon={ListIcon} text="Liste" onClick={() => {
							setDrawerOpen(false);
							history.push('/list');
						}}/>

				</div>
			</Drawer>
		</AppBar>
	);
};

export default NavigationBar;
