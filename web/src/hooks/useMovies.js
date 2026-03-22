import { useQuery } from '@tanstack/react-query';
import { getMovies } from "../services/movieService";

export function useMovies(filters = {}){
    const { data: movies, isLoading, error } = useQuery({
        queryKey: ['movies', filters],
        queryFn: () => getMovies(filters),
    });

    return { movies, isLoading, error};
}