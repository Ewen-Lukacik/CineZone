import MovieCard from "../components/MovieCard";
import NavBar from "../components/Navbar";
import { useMovies } from "../hooks/useMovies";
import styles from './Home.module.css';

export default function Home(){
    const { movies, isLoading, error } = useMovies();

    return(
        <>
            <NavBar />
            <main>
                { isLoading && <p>Loading...</p> }
                { error && <p>An error has occurred</p>}
                <div className={styles.grid}>
                    { movies && movies.map(movie => (
                        <MovieCard key={movie.id} movie={movie}/>
                    ))}
                </div>
            </main>  
        </>
    );
}