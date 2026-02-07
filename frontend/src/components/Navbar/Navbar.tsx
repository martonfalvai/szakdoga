import React from "react";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
    { name: "Profile", link: "/profile" },
  ];

  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContent}>
        <div className={styles.logo}></div>

        <div className={styles.desktopMenu}>
          {navItems.map((item) => (
            <button
              key={item.name}
              className={styles.navButton}
              onClick={() => navigate(item.link)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
