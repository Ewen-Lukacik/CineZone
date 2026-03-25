import { Link, useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import NavBar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useMovie } from "../hooks/useMovie";
import { useMoviePoster } from "../hooks/useMoviePoster";
import { useMovies } from "../hooks/useMovies";
import styles from './MovieDetail.module.css';

export default function MovieDetail(){
    const { id } = useParams();
    const { movie, isLoading } = useMovie(id);
    const posterUrl = useMoviePoster(movie?.title, movie?.release_year);

    const { movies: similarMovies } = useMovies({
        category: movie?.name,
        limit: 5
    });

    const user = useAuth();

    if(isLoading){
        return(
            <>
                <NavBar />
                <p>Loading...</p>
            </>
        )
    }

    if(!movie){
        return(
            <>
                <NavBar />
                <p>Movie not found</p>
            </>
        )
    }

    console.log(movie)
    return (
        <>
            <NavBar />
            <div className={styles.page}>
                <Link to="/" className={styles.backBtn}>Back to catalog</Link>
                <div className={styles.hero}>
                    <div className={styles.poster}>
                        {posterUrl ? (
                            <img src={posterUrl} alt={movie.title} />
                        ) : (
                            <div className={styles.noPoster}>No poster</div>
                        )}
                    </div>

                    <div className={styles.info}>
                        <h1 className={styles.title}>{movie.title}</h1>

                        <div className={styles.meta}>
                            <span>{movie.director}</span>
                            <span>•</span>
                            <span>{movie.release_year}</span>
                            <span>•</span>
                            <span className={styles.category}>{movie.name}</span>
                        </div>

                        <div className={styles.rating}>
                            <strong>{movie.rating}</strong> / 10
                        </div>

                        {user && (
                            <div className={styles.actions}>
                                <button className={styles.likeBtn}>
                                    Like
                                </button>
                                <button className={styles.watchBtn}>
                                    Watchlist
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {similarMovies && similarMovies.length > 0 && (
                    <div className={styles.similar}>
                        <h2>Similar movies</h2>
                        <div className={styles.similarGrid}>
                            {similarMovies
                                .filter(m => m.id !== parseInt(id))
                                .slice(0, 4)
                                .map(m => (
                                    <MovieCard key={m.id} movie={m} />
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}