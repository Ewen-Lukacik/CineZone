import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { getFavorites, addFavorites, removeFavorites } from "../services/favoriteService";

export function useFavorites(){
    const { token } = useAuth();
    const queryClient = useQueryClient();

    const { data: favorites = [] } = useQuery({
        queryKey: ['favorites', token],
        queryFn: () => getFavorites(token),
        enabled: !!token
    });

    const add = useMutation({
        mutationFn: (movie_id) => addFavorites(token, movie_id),
        onSuccess: () => queryClient.invalidateQueries(['favorites'])
    });
    const remove = useMutation({
        mutationFn: (movie_id) => removeFavorites(token, movie_id),
        onSuccess: () => queryClient.invalidateQueries(['favorites'])
    });

    function isFavorite(movie_id){
        return favorites.some(f => f.id === movie_id);
    }

    return { favorites, isFavorite, add, remove }

}