import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../database.js", () => ({
  default: { query: vi.fn() },
}));

vi.mock("../../Middlewares/logger.js", () => ({
  logger: { info: vi.fn(), error: vi.fn(), warn: vi.fn() },
}));

import movieList, {
  create,
  destroy,
  show,
} from "../../Controller/MovieController.js";
import database from "../../database.js";

function mockReq(overrides = {}) {
  return {
    body: {},
    params: {},
    query: {},
    user: { id: 1 },
    ...overrides,
  };
}

function mockRes() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  res.send = vi.fn().mockReturnValue(res);
  res.sendStatus = vi.fn().mockReturnValue(res);
  return res;
}

const fakeMovies = [
  {
    id: 1,
    title: "Interstellar",
    director: "Nolan",
    release_year: 2014,
    rating: 8.6,
    name: "Sci-Fi",
  },
];

beforeEach(() => vi.clearAllMocks());

describe("movieList", () => {
  it("retourne les films avec la pagination", async () => {
    database.query
      .mockResolvedValueOnce([[{ total: 1 }]])
      .mockResolvedValueOnce([fakeMovies]);

    const req = mockReq({
      query: {
        limit: "10",
        page: "1",
      },
    });
    const res = mockRes();

    await movieList(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        movies: fakeMovies,
        pagination: expect.objectContaining({
          total: 1,
          page: 1,
        }),
      }),
    );
  });

  it("retourne 500 en cas d'erreur DB", async () => {
    database.query.mockRejectedValue(new Error("DB error"));

    const req = mockReq({ query: {} });
    const res = mockRes();

    await movieList(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe("show", () => {
  it("retourne le film quand il existe", async () => {
    database.query.mockResolvedValue([fakeMovies]);

    const req = mockReq({ params: { id: "1" } });
    const res = mockRes();

    await show(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeMovies[0]);
  });

  it("retourne 404 quand le film n'existe pas", async () => {
    database.query.mockResolvedValue([[]]);

    const req = mockReq({
      params: {
        id: "999",
      },
    });
    const res = mockRes();

    await show(req, res);

    expect(res.sendStatus).toHaveBeenCalledWith(404);
  });

  it("retourne 500 en cas d'erreur DB", async () => {
    database.query.mockRejectedValue(new Error("DB error"));

    const req = mockReq({
      params: {
        id: "1",
      },
    });
    const res = mockRes();

    await show(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe("create", () => {
  const validBody = {
    title: "Dune",
    director: "Villeneuve",
    release_year: 2021,
    rating: 8.0,
    category_id: 1,
  };

  it("crée un film et retourne 201", async () => {
    database.query.mockResolvedValue([{ insertId: 42 }]);

    const req = mockReq({ body: validBody });
    const res = mockRes();

    await create(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ movieId: 42, name: "Dune" }),
    );
  });

  it("retourne 400 quand le body est incomplet", async () => {
    const req = mockReq({
      body: {
        title: "Incomplet",
      },
    });
    const res = mockRes();

    await create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(database.query).not.toHaveBeenCalled();
  });
});

describe("destroy", () => {
  it("supprime le film et retourne 200", async () => {
    database.query.mockResolvedValue([{ affectedRows: 1 }]);

    const req = mockReq({
      params: {
        id: "1",
      },
    });
    const res = mockRes();

    await destroy(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("retourne 404 quand le film n'existe pas", async () => {
    database.query.mockResolvedValue([{ affectedRows: 0 }]);

    const req = mockReq({
      params: {
        id: "999",
      },
    });
    const res = mockRes();

    await destroy(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});
