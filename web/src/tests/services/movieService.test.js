import { beforeEach, describe, expect, it, vi } from "vitest";
import { getMovieById, getMovies } from "../../services/movieService";

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

function mockFetchSuccess(data) {
  mockFetch.mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(data),
  });
}

beforeEach(() => vi.clearAllMocks());

describe("getMovies", () => {
  it("appelle la bonne URL avec les paramètres par défaut", async () => {
    mockFetchSuccess({
      movies: [],
      pagination: {},
    });

    await getMovies();

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/movies"),
    );
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("limit=20"));
  });

  it("inclut min_rating dans l'URL quand fourni", async () => {
    mockFetchSuccess({
      movies: [],
      pagination: {},
    });

    await getMovies({ min_rating: 7 });

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("min_rating=7"),
    );
  });

  it("n'inclut pas les paramètres optionnels quand ils sont vides", async () => {
    mockFetchSuccess({ movies: [], pagination: {} });

    await getMovies({});

    const url = mockFetch.mock.calls[0][0];
    expect(url).not.toContain("category");
    expect(url).not.toContain("min_rating");
  });

  it("throw une erreur si la réponse n'est pas ok", async () => {
    mockFetch.mockResolvedValue({ ok: false });

    await expect(getMovies()).rejects.toThrow("Failed to fetch movies");
  });
});

describe("getMovieById", () => {
  it("appelle /api/movies/:id", async () => {
    mockFetchSuccess({
      id: 3,
      title: "Interstellar",
    });

    await getMovieById(3);

    expect(mockFetch).toHaveBeenCalledWith("/api/movies/3");
  });

  it("retourne les données du film", async () => {
    const movie = {
      id: 3,
      title: "Interstellar",
      rating: 8.6,
    };
    mockFetchSuccess(movie);

    const result = await getMovieById(3);

    expect(result).toEqual(movie);
  });

  it("throw une erreur si le film n'existe pas", async () => {
    mockFetch.mockResolvedValue({ ok: false });

    await expect(getMovieById(999)).rejects.toThrow("Movie not found");
  });
});
