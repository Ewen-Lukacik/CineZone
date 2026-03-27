import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { getSuggestions } from "../services/ratingService";

export function useSuggestions(){
    const { token } = useAuth();

    const { data: suggestions = [], isLoading } = useQuery({
        queryKey: ['suggestions', token],
        queryFn: () => getSuggestions(token),
        enabled: !!token,
    });

    return{ suggestions, isLoading }
}