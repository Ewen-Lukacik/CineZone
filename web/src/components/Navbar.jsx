import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Navbar.module.css";

export default function NavBar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.navbar}>
      {/* ptet remplacer par un logo si j'en fais un */}
      <Link to="/" className={styles.logo}>
        CineZone
      </Link>

      <button
        className={styles.burger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="toggle menu"
      >
        {menuOpen ? "X" : "Burger"}
      </button>

      <div className={`${styles.right} ${menuOpen ? styles.open : ""}`}>
        {user ? (
          <>
            <Link to="/profile" className={styles.username}>
              Bonjour, {user.name}
            </Link>
            <button className={styles.logoutBtn} onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className={styles.loginLink}>
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
