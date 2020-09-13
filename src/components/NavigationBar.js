import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, Divider } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import FishingIcon from '@material-ui/icons/ThumbUp';
import HomeIcon from '@material-ui/icons/Home';
import NavigationItem from './NavigationItem';
import { useHistory } from 'react-router-dom';


const NavigationBar = () => {
  const [drawerIsOpen, setDrawerOpen] = useState(false);
  const history = useHistory();
  
  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton style={styles.menuIcon} edge="start">
          <MenuIcon onClick={() => setDrawerOpen(true)} />
        </IconButton>
        <p>Carnet de pêche</p>
      </Toolbar>

      <Drawer style={styles.drawer} open={drawerIsOpen}>
        <div style={styles.drawerPaper}>
          <div style={styles.closeButton}>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <ChevronLeftIcon />
            </IconButton>
          </div>

          <NavigationItem Icon={HomeIcon} text="Accueil" onClick={() => {
            setDrawerOpen(false);
            history.push('/')
          }} />
          <Divider />
          <NavigationItem Icon={FishingIcon} text="Prises" onClick={() => {
            setDrawerOpen(false);
            history.push('/fishes');
          }} />

        </div>
      </Drawer>
    </AppBar>
  )
}

const styles = {
  menuIcon: {
    color: 'white'
  },
  drawer: {
    width: 240,
    flexShrink: 0
  },
  drawerPaper: {
    width: 240,
  },
  closeButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}

export default NavigationBar;