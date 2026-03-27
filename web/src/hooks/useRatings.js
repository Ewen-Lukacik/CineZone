import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { deleteRating, getRating, insertRating } from "../services/ratingService";

export function useRating(movieId){
    const { token } = useAuth();
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: ['rating', movieId, token],
        queryFn: () => getRating(token, movieId),
        enabled: !!token && !!movieId,
    })

    const insert = useMutation({
        mutationFn: (rating) => insertRating(token, movieId, rating),
        onSuccess: () => {
            queryClient.invalidateQueries(['rating', movieId]);
            queryClient.invalidateQueries(['movie', movieId]);
        }
    })

    const remove = useMutation({
        mutationFn: (rating) => deleteRating(token, movieId, rating),
        onSuccess: () => {
            queryClient.invalidateQueries(['rating', movieId]);
            queryClient.invalidateQueries(['movie', movieId]);
        }
    })

    return{
        userRating: data?.user_rating ?? null,
        insert, 
        remove,
    };
}