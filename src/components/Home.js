import React from "react";

const Home = () => (
  <div style={styles.container}>
    <p>Ce carnet a pour but de recenser mes parties de pêche. Lister les captures, les plans d'eau, les points importants, etc...</p>
  </div>

);

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}

export default Home;