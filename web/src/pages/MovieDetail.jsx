import { Link, useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import NavBar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../hooks/useFavorites";
import { useMovie } from "../hooks/useMovie";
import { useMoviePoster } from "../hooks/useMoviePoster";
import { useMovies } from "../hooks/useMovies";
import { useWatchlist } from "../hooks/useWatchlist";
import styles from './MovieDetail.module.css';

export default function MovieDetail(){
    const { id } = useParams();
    const { movie, isLoading } = useMovie(id);
    const posterUrl = useMoviePoster(movie?.title, movie?.release_year);

    const { isFavorite, add: addFav, remove: removeFav} = useFavorites();
    const { isWatchlist, add: addWatch, remove: removeWatch} = useWatchlist();


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

    const movieId = parseInt(id);
    const favorited = isFavorite(movieId);
    const watched = isWatchlist(movieId);

    async function handleFavorite(){
        try{
            if (favorited) {
                await removeFav.mutateAsync(movieId);
                addToast('removed from favorites', 'success');
            } else {
                await addFav.mutateAsync(movieId);
                addToast('added to favorites', 'success');
            }
        } catch {
            addToast('An error occurred', 'error');
        }
    }

    async function handleWatchlist() {
        try {
            if (watched) {
                await removeWatch.mutateAsync(movieId);
                addToast('removed from watchlist', 'success');
            } else {
                await addWatch.mutateAsync(movieId);
                addToast('added to watchlist', 'success');
            }
        } catch {
            addToast('An error occurred', 'error');
        }
    }

    // console.log(movie)
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
                                <button
                                    className={`${styles.likeBtn} ${favorited ? styles.active : ''}`}
                                    onClick={handleFavorite}
                                >
                                    {favorited ? 'Liked' : 'Like'}
                                </button>
                                <button
                                    className={`${styles.watchBtn} ${watched ? styles.active : ''}`}
                                    onClick={handleWatchlist}
                                >
                                    {watched ? 'In watchlist' : 'Watchlist'}
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