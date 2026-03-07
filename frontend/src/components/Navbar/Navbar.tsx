import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import UserIcon from "../../Icons/UserIcon";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const navItems = [
    { name: "Ingatlanok", link: "/apartments" },
    { name: "Rólunk", link: "/about" },
    { name: "Kapcsolat", link: "/contact" },
  ];


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node )) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav ref={navRef} className={styles.navbar}>
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
          <UserIcon
            className={styles.icon}
            onClick={() => navigate("/login")}
          />
        </div>

        {/* IDE KERÜLT: navbarContent-en belül, jobb szélen */}
        <button
          className={styles.hamburger}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.hamburgerLine} ${open ? styles.open : ""}`} />
          <span className={`${styles.hamburgerLine} ${open ? styles.open : ""}`} />
          <span className={`${styles.hamburgerLine} ${open ? styles.open : ""}`} />
        </button>
      </div>

      <div className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ""}`}>
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => { navigate(item.link); setOpen(false); }}
            className={styles.navButton}
          >
            {item.name}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;