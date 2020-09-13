import React from "react";

const NavigationItem = ({ Icon, text, onClick }) => (
  <div style={styles.container} onClick={onClick}>
    <Icon />
    <p style={styles.text}>{text}</p>
  </div>
);

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10
  },
  text: {
    marginLeft: 20
  }
}

export default NavigationItem;