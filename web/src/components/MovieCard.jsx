import { useMoviePoster } from "../hooks/useMoviePoster";
import styles from './MovieCard.module.css';
import { Link } from "react-router-dom";

export default function MovieCard({ movie }){
    const posterUrl = useMoviePoster(movie.title, movie.release_year);

    return(
        <Link to={`/movies/${movie.id}`} className={styles.link}>
            <article className={styles.card}>
                <div className={styles.poster}>
                    {posterUrl ?
                        (
                            <img src={posterUrl} alt={movie.title} />
                        ) : 
                        (
                            <div className={styles.noPoster}>No poster</div>
                        )
                    }
                </div>
                <div className={styles.info}>
                    <div className={styles.meta}>
                        <span className={styles.rating}> {movie.rating}/10 </span>
                        <span className={styles.year}> {movie.release_year} </span>
                    </div>
                    <h2 className={styles.title}> {movie.title} </h2>
                    <p className={styles.director}> {movie.director} </p>
                    <span className={styles.category}> {movie.name} </span>
                </div>
            </article>
        </Link>
       
    )
}