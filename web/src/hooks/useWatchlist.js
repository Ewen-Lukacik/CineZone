import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { addWatchlist, getWatchlist, removeWatchlist } from "../services/watchlistService";

export function useWatchlist(){
    const { token } = useAuth();
    const queryClient = useQueryClient();

    const { data: watchlist = [] } = useQuery({
        queryKey: ['watchlist', token],
        queryFn: () => getWatchlist(token),
        enabled: !!token
    });

    const add = useMutation({
        mutationFn: (movie_id) => addWatchlist(token, movie_id),
        onSuccess: () => queryClient.invalidateQueries(['watchlist'])
    });
    const remove = useMutation({
        mutationFn: (movie_id) => removeWatchlist(token, movie_id),
        onSuccess: () => queryClient.invalidateQueries(['watchlist'])
    });

    function isWatchlist(movie_id){
        return watchlist.some(f => f.id === movie_id);
    }

    return { watchlist, isWatchlist, add, remove }

}