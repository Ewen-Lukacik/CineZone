import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import NavBar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../hooks/useFavorites";
import { useMe } from "../hooks/useMe";
import { useSuggestions } from "../hooks/useSuggestions";
import { useWatchlist } from "../hooks/useWatchlist";
import styles from './Profile.module.css';

export default function Profile(){
    const { user } = useAuth();
    const { profile, isLoading } = useMe();
    const { favorites } = useFavorites();
    const { watchlist } = useWatchlist();
    const { suggestions } = useSuggestions();

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

                    {suggestions.length > 0 && (
                        <div className={styles.suggestions}>
                            <h3 className={styles.suggestionsTitle}>Best suggestions:</h3>
                            {suggestions.map(({ category, suggested_movie }) => (
                                <div key={category.id} className={styles.suggestionBlock}>
                                    <div className={styles.suggestionHeader}>
                                        <span className={styles.categoryTag}>{category.name}</span>
                                        <span className={styles.categoryAvg}>{category.avg_rating}/10</span>
                                    </div>
                                    {suggested_movie
                                        ? <MovieCard movie={suggested_movie} />
                                        : <p className={styles.empty}>You watched everything</p>
                                    }
                                </div>
                            ))}
                        </div>
                    )}
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
                            <Link to="/admin" className={styles.adminBtn}>
                                Admin Panel →
                            </Link>
                        </div>
                    )}

                    {/* Films likés */}
                    <section className={styles.section}>
                        <h3>Liked movies ({favorites.length})</h3>
                        {favorites.length === 0 ? (
                            <p className={styles.empty}>No liked movies yet</p>
                        ) : (
                            <div className={styles.movieGrid}>
                                {favorites.map(movie => (
                                    <MovieCard key={movie.id} movie={movie} />
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Watchlist */}
                    <section className={styles.section}>
                        <h3>🎬 Watchlist ({watchlist.length})</h3>
                        {watchlist.length === 0 ? (
                            <p className={styles.empty}>Your watchlist is empty</p>
                        ) : (
                            <div className={styles.movieGrid}>
                                {watchlist.map(movie => (
                                    <MovieCard key={movie.id} movie={movie} />
                                ))}
                            </div>
                        )}
                    </section>
                </main>
            </div>
        </>
    )
}