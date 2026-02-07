import React from "react";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Services", link: "/services" },
    { name: "Contact", link: "/contact" },
  ];

  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      <ul>
        {navItems.map((item) => (
          <li key={item.name}>
            <button onClick={() => navigate(item.link)}>{item.name}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
