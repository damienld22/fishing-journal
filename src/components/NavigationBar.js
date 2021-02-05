import React, {useState} from 'react';
import {AppBar, Toolbar, IconButton, Drawer, Divider} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import FishingIcon from '@material-ui/icons/ThumbUp';
import LocationIcon from '@material-ui/icons/LocationOn';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import ListIcon from '@material-ui/icons/List';
import HelpIcon from '@material-ui/icons/Help';
import ReferencesIcon from '@material-ui/icons/AttachFile';
import SessionIcon from '@material-ui/icons/Event';
import NavigationItem from './NavigationItem';
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './menu.module.css';

const NavigationBar = ({isConnected, onLogout}) => {
	const [drawerIsOpen, setDrawerOpen] = useState(false);
	const history = useHistory();

	const logout = async () => {
		onLogout();
		await history.go('/login');
		await localStorage.removeItem('access_token');
	};

	return (
		<AppBar position="sticky">
			<Toolbar>
				{
					isConnected && (
						<IconButton className={styles.menuIcon} edge="start" onClick={() => setDrawerOpen(true)}>
							<MenuIcon/>
						</IconButton>
					)
				}
				<p style={{width: '100%', textAlign: 'center'}}>Carnet de pêche</p>

				{
					isConnected && (
						<IconButton className={styles.menuIcon} edge="start" onClick={logout}>
							<LogoutIcon/>
						</IconButton>
					)
				}
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
						Icon={ReferencesIcon} text="Mes références" onClick={() => {
							setDrawerOpen(false);
							history.push('/references');
						}}/>

					<Divider/>

					<NavigationItem
						Icon={ListIcon} text="Liste" onClick={() => {
							setDrawerOpen(false);
							history.push('/list');
						}}/>

					<NavigationItem
						Icon={HelpIcon} text="Aide à la décision" onClick={() => {
							setDrawerOpen(false);
							history.push('/decisionHelp');
						}}/>

				</div>
			</Drawer>
		</AppBar>
	);
};

NavigationBar.propTypes = {
	isConnected: PropTypes.bool,
	onLogout: PropTypes.func.isRequired
};

export default NavigationBar;
