import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuth } from "../../hooks/authProvider";
import { LogOut, ShieldCheck } from "lucide-react";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const navItems = [
    { name: "Ingatlanok", link: "/" },
    { name: "Rólunk", link: "/about" },
    { name: "Kapcsolat", link: "/contact" },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

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
          {isAuthenticated && user?.role === 1 && (
            <button
              className={`${styles.navButton} ${styles.adminButton}`}
              onClick={() => navigate("/admin")}
            >
              <ShieldCheck size={15} />
              Admin
            </button>
          )}
        </div>

        <div className={styles.rightMenu}>
          {isAuthenticated && user ? (
            <div className={styles.userArea}>
              <button
                className={styles.avatar}
                onClick={() => navigate("/profile")}
              >
                {user.name.charAt(0).toUpperCase()}
              </button>
              <button
                className={styles.userName}
                onClick={() => navigate("/profile")}
              >
                {user.name}
              </button>
              <button
                className={styles.logoutButton}
                onClick={handleLogout}
                title="Kijelentkezés"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              className={styles.loginButton}
              onClick={() => navigate("/login")}
            >
              Bejelentkezés
            </button>
          )}
        </div>

        <button
          className={styles.hamburger}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span
            className={`${styles.hamburgerLine} ${open ? styles.open : ""}`}
          />
          <span
            className={`${styles.hamburgerLine} ${open ? styles.open : ""}`}
          />
          <span
            className={`${styles.hamburgerLine} ${open ? styles.open : ""}`}
          />
        </button>
      </div>

      <div
        className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ""}`}
      >
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => {
              navigate(item.link);
              setOpen(false);
            }}
            className={styles.navButton}
          >
            {item.name}
          </button>
        ))}
        {isAuthenticated && user?.role === 1 && (
          <button
            className={`${styles.navButton} ${styles.adminButton}`}
            onClick={() => {
              navigate("/admin");
              setOpen(false);
            }}
          >
            <ShieldCheck size={15} />
            Admin
          </button>
        )}
        {isAuthenticated ? (
          <button className={styles.navButton} onClick={handleLogout}>
            Kijelentkezés
          </button>
        ) : (
          <button
            className={styles.navButton}
            onClick={() => {
              navigate("/login");
              setOpen(false);
            }}
          >
            Bejelentkezés
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
