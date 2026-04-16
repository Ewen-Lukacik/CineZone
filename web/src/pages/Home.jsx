import { useState } from "react";
import FilterBar from "../components/FilterBar";
import MovieCard from "../components/MovieCard";
import NavBar from "../components/Navbar";
import Pagination from "../components/Pagination";
import { useMovies } from "../hooks/useMovies";
import styles from './Home.module.css';

export default function Home(){
    const [filters, setFilters] = useState({ page:1, limit: 10 });
    const { movies, pagination, isLoading, error } = useMovies(filters);

    function handlePageChange(newPage){
        setFilters(prev => ({ ...prev, page: newPage }));
        window.scrollTo({ top: 0, behavior: 'smooth'});
    }

    return(
        <>
            <NavBar />
            <FilterBar filters={filters} onChange={setFilters}/>
            <main>
                { isLoading && <p>Loading...</p> }
                { error && <p>An error has occurred</p>}
                <div className={styles.grid}>
                    { movies && movies.map(movie => (
                        <MovieCard key={movie.id} movie={movie}/>
                    ))}
                </div>
                <Pagination pagination={pagination} onPageChange={handlePageChange}/>
            </main>  
        </>
    );
}