import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    const footerItems = [
      <a href="/privacy">Adatvédelmi nyilatkozat</a>,
      <a href="/terms">Felhasználási feltételek</a>,
      <a href="/contact">Kapcsolat</a>
    ];
      return (
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <p>© 2026 Minden jog fenntartva.</p>
            <p>Készítette: Urbanics Pál , Márki András Martonfalvai Antal</p>
            <ul>
              {footerItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </footer>  
      );
  }
  
  export default Footer;