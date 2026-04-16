import { useQuery } from "@tanstack/react-query";
import { getMovieById } from "../services/movieService";

export function useMovie(id){
    const { data: movie, isLoading, error } = useQuery({
        queryKey: ['movie', id],
        queryFn: () => getMovieById(id),
        enabled: !!id
    });

    return { movie, isLoading, error }
}