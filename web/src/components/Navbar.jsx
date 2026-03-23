import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from './Navbar.module.css';

export default function NavBar(){
    const { user, logout } = useAuth();

    return (
        <header className={styles.navbar}>
            {/* ptet remplacer par un logo si j'en fais un */}
            <Link to="/" className={styles.logo}>CineZone</Link>
            <div className={styles.right}>
                {user ? (
                    <>
                        <Link to="/profile" className={styles.username}>
                            Bonjour, {user.name}
                        </Link>
                        <button className={styles.logoutBtn} onClick={logout}>Logout</button>
                    </>
                ) : (
                    <Link to="/login" className={styles.loginLink}>Login</Link>
                )}
            </div>
        </header>
    );
}