import React, { FC } from "react";
import Navbar from "../components/Navbar/Navbar";
import styles from "../Pages/Home.module.css";



const Home: React.FC = () => {

  // helyiktöltő, később backend
  const apartments = Array.from({ length: 12 }, (_, i) => `Lakás ${i + 1}`);



  return <div className={styles.homeContainer}>
    <div className={styles.heroSection}>
      <h1>MAPUMA LAKÁSCENTRUM</h1>
      <p>Fedezd fel széles kínálatunkat és találd meg a tökéletes otthont.</p>
    </div>
    <div className={styles.apartmentGrid}>
        {apartments.map((apt) => (
          <div key={apt.title} className={styles.apartmentCard}>
            <img src={apt.image} alt={apt.title} className={styles.apartmentImage} />
            <h3>{apt.title}</h3>
            <p>{apt.desc}</p>
          </div>
        ))}
      </div>

  </div>;
};

export default Home;
