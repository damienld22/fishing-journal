import React from "react";

const NavigationItem: React.FC<{Icon: any, text: string, onClick: any}> = ({ Icon, text, onClick }) => (
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
  } as React.CSSProperties,
  text: {
    marginLeft: 20
  } as React.CSSProperties
}

export default NavigationItem;