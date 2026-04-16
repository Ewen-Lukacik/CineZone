import { validationResult } from "express-validator";
import { describe, expect, it } from "vitest";
import { movieValidator } from "../../Middlewares/validateMovie.js";

async function runValidators(body) {
  const req = { body };
  const validators = movieValidator.slice(0, -1);
  await Promise.all(validators.map((v) => v.run(req)));
  return validationResult(req);
}

const validMovie = {
  title: "Interstellar",
  director: "Christopher Nolan",
  release_year: 2014,
  rating: 8.6,
  category_id: 1,
};

describe("validateMovie", () => {
  it("passe avec des données valides", async () => {
    const result = await runValidators(validMovie);
    expect(result.isEmpty()).toBe(true);
  });

  it("échoue quand le titre est manquant", async () => {
    const result = await runValidators({ ...validMovie, title: "" });
    const errors = result.array();

    expect(result.isEmpty()).toBe(false);
    expect(errors.some((e) => e.path === "title")).toBe(true);
  });

  it("échoue quand release_year est avant 1895", async () => {
    const result = await runValidators({ ...validMovie, release_year: 1800 });

    expect(result.isEmpty()).toBe(false);
    expect(result.array().some((e) => e.path === "release_year")).toBe(true);
  });

  it("échoue quand rating dépasse 10", async () => {
    const result = await runValidators({ ...validMovie, rating: 11 });

    expect(result.isEmpty()).toBe(false);
    expect(result.array().some((e) => e.path === "rating")).toBe(true);
  });
});
