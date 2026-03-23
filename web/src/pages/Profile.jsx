import { Link } from "react-router-dom";
import NavBar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useMe } from "../hooks/useMe";
import styles from './Profile.module.css';

export default function Profile(){
    const { user } = useAuth();
    const { profile, isLoading } = useMe();

    if(isLoading){
        return(
            <>
                <NavBar />
                <div className={styles.page}>
                    <p style={{ color: 'var(--color-text-muted)' }}>Loading...</p>
                </div>
            </>
        )
    }

    return(
        <>
            <NavBar />
            <div className={styles.page}>
                
                {/* SIDEBAR PROFIL GAUCHE */}
                <aside className={styles.sidebar}>
                    <div className={styles.avatar}>
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <h2 className={styles.name}>{profile?.name}</h2>
                    <p className={styles.email}>{profile?.email}</p>
                    <span className={styles.role}>{profile?.role}</span>
                    <p className={styles.since}>
                        Member since {new Date(profile?.created_at).toLocaleDateString()}
                    </p>
                </aside>

                {/* SIDEBAR MENUS  */}
                <main className={styles.content}>
                    {/* POUR LES ADMIN UNIQUEMENT */}
                    {user.role === 'admin' && (
                        <div className={styles.adminBanner}>
                            <div className={styles.adminText}>
                                <span>Admin Side</span>
                                <p>You can manage the entire catalog</p>
                            </div>
                            <Link    to="/admin" className={styles.adminBtn}>
                                Admin Panel →
                            </Link>
                        </div>
                    )}

                    {/* Films likés */}
                    <section className={styles.section}>
                        <h3>Liked movies</h3>
                        <p className={styles.empty}>No liked movies yet</p>
                    </section>

                    {/* Watchlist */}
                    <section className={styles.section}>
                        <h3>Watchlist</h3>
                        <p className={styles.empty}>Your watchlist is empty</p>
                    </section>

                </main>
            </div>
        </>
    )
}