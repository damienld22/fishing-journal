import React from "react";

const Fishes: React.FC = () => (
  <div style={styles.container}>
    <h1>Liste des prises</h1>
  </div>
);

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  } as React.CSSProperties
}

export default Fishes;