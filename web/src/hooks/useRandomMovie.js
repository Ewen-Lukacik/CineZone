import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getMovies } from "../services/movieService";

export function useRandomMovie() {
  const { data: movies } = useQuery({
    queryKey: ["movies", {}],
    queryFn: () => getMovies(),
    staleTime: Infinity,
  });

  const randomMovie = useMemo(() => {
    if (!movies || movies.length === 0) return null;
    // eslint-disable-next-line react-hooks/purity
    return movies[Math.floor(Math.random() * movies.length)];
  }, [movies]); // recalculé uniquement quand movies change

  return randomMovie;
}
