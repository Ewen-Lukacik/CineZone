import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useMovie } from "../../hooks/useMovie";

vi.mock("../../services/movieService", () => ({
  getMovieById: vi.fn(),
}));

import { getMovieById } from "../../services/movieService";

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

beforeEach(() => vi.clearAllMocks());

describe("useMovie", () => {
  it("est en état loading au départ puis retourne le film", async () => {
    const movie = {
      id: 1,
      title: "Interstellar",
      rating: 8.6,
    };
    getMovieById.mockResolvedValue(movie);

    const { result } = renderHook(() => useMovie(1), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.movie).toEqual(movie);
    expect(result.current.error).toBeNull();
  });

  it("ne fait pas de requête quand id est undefined", () => {
    const { result } = renderHook(() => useMovie(undefined), {
      wrapper: createWrapper(),
    });

    expect(getMovieById).not.toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
  });

  it("retourne une erreur quand le fetch échoue", async () => {
    getMovieById.mockRejectedValue(new Error("Movie not found"));

    const { result } = renderHook(() => useMovie(999), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBeTruthy();
    expect(result.current.movie).toBeUndefined();
  });
});
