import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({ token: "fake-token" }),
}));

vi.mock("../../context/ToastContext", () => ({
  useToast: () => ({ addToast: vi.fn() }),
}));

vi.mock("../../hooks/useCategory", () => ({
  useCategories: () => ({
    categories: [
      { id: 1, name: "Action" },
      { id: 2, name: "Drama" },
    ],
  }),
}));

vi.mock("@tanstack/react-query", () => ({
  useQueryClient: () => ({ invalidateQueries: vi.fn() }),
}));

vi.mock("../../services/movieService", () => ({
  createMovie: vi.fn(),
  updateMovie: vi.fn(),
}));

import MovieForm from "../../components/MovieForm";
import { createMovie, updateMovie } from "../../services/movieService";

const onClose = vi.fn();

beforeEach(() => vi.clearAllMocks());

async function fillForm(user) {
  await user.type(document.querySelector('input[name="title"]'), "Dune");
  await user.type(
    document.querySelector('input[name="director"]'),
    "Denis Villeneuve",
  );
  await user.type(document.querySelector('input[name="release_year"]'), "2021");
  await user.type(document.querySelector('input[name="rating"]'), "8.0");
  await user.selectOptions(
    document.querySelector('select[name="category_id"]'),
    "1",
  );
}

describe("MovieForm", () => {
  it('affiche "Add movie" en mode création', () => {
    render(<MovieForm onClose={onClose} />);

    expect(screen.getByText("Add movie")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create" })).toBeInTheDocument();
  });

  it('affiche "Edit movie" et pré-remplit les champs en mode édition', () => {
    const movie = {
      id: 1,
      title: "Dune",
      director: "Villeneuve",
      release_year: 2021,
      rating: 8.0,
      category_id: 1,
    };
    render(<MovieForm movie={movie} onClose={onClose} />);

    expect(screen.getByText("Edit movie")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Dune")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Update" })).toBeInTheDocument();
  });

  it("affiche les erreurs si on soumet un formulaire vide", async () => {
    const user = userEvent.setup();
    render(<MovieForm onClose={onClose} />);

    await user.click(screen.getByRole("button", { name: "Create" }));

    expect(await screen.findByText("Title required")).toBeInTheDocument();
    expect(screen.getByText("Director required")).toBeInTheDocument();
  });

  it("appelle createMovie avec les bonnes données sur submit valide", async () => {
    createMovie.mockResolvedValue({ id: 99 });
    const user = userEvent.setup();
    render(<MovieForm onClose={onClose} />);

    await fillForm(user);
    await user.click(screen.getByRole("button", { name: "Create" }));

    await waitFor(() => {
      expect(createMovie).toHaveBeenCalledWith(
        "fake-token",
        expect.objectContaining({
          title: "Dune",
          director: "Denis Villeneuve",
        }),
      );
    });
  });

  it("appelle updateMovie (pas createMovie) en mode édition", async () => {
    updateMovie.mockResolvedValue({ id: 1 });
    const user = userEvent.setup();
    const movie = {
      id: 1,
      title: "Dune",
      director: "Villeneuve",
      release_year: 2021,
      rating: 8.0,
      category_id: 1,
    };
    render(<MovieForm movie={movie} onClose={onClose} />);

    await user.click(screen.getByRole("button", { name: "Update" }));

    await waitFor(() => {
      expect(updateMovie).toHaveBeenCalled();
      expect(createMovie).not.toHaveBeenCalled();
    });
  });

  it("appelle onClose quand on clique sur Cancel", async () => {
    const user = userEvent.setup();
    render(<MovieForm onClose={onClose} />);

    await user.click(screen.getByRole("button", { name: "Cancel" }));

    expect(onClose).toHaveBeenCalledOnce();
  });
});
