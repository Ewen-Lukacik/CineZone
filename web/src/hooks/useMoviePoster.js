import { useQuery } from "@tanstack/react-query";
import { getMoviePoster } from "../services/tmdbService";

export function useMoviePoster(title, year){
    const { data: posterUrl} = useQuery({
        queryKey: ['poster', title, year],
        queryFn: () => getMoviePoster(title, year),
        staleTime: Infinity,
    });

    return posterUrl;
}