import React from "react";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import UserIcon from "../../Icons/UserIcon";
import { useAuth } from "../../hooks/authProvider";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const navItems = [
    { name: "Ingatlanok", link: "/apartments" },
    { name: "Rólunk", link: "/about" },
    { name: "Kapcsolat", link: "/contact" },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContent}>
        <div className={styles.logo} onClick={() => navigate("/")}>
          LOGO
        </div>

        <div className={styles.centerMenu}>
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

        <div className={styles.rightMenu}>
          <input
            type="text"
            placeholder="Keresés..."
            className={styles.searchInput}
          />
          {user?.name}
          <UserIcon
            className={styles.icon}
            onClick={() => navigate("/login")}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
