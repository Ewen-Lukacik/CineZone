import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { addHistory, getHistory } from "../services/historyService";

export function useHistory() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const { data: history = [] } = useQuery({
    queryKey: ["history", token],
    queryFn: () => getHistory(token),
    enabled: !!token,
  });

  const add = useMutation({
    mutationFn: (movie_id) => addHistory(token, movie_id),
    onSuccess: () => queryClient.invalidateQueries(["history"]),
  });

  return { history, add };
}
