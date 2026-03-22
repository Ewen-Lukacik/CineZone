import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../services/movieService";

export function useRandomMovie(){
    const { data: movies } = useQuery({
        queryKey: ['movies', {}],
        queryFn: () => getMovies(),
        staleTime: Infinity,
    });

    if(!movies || movies.length === 0){
        return null;
    }

    const random = movies[Math.floor(Math.random() * movies.length)];
    return random;
}