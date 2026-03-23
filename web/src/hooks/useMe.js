import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { getMe } from "../services/userService";

export function useMe(){
    const { token } = useAuth();

    const { data: profile, isLoading } = useQuery({
        queryKey: ['me', token],
        queryFn: () => getMe(token),
        enabled: !!token,
    });

    return { profile, isLoading };
}