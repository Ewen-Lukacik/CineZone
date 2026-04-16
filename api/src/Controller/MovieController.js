import database from "../database.js";
import { logger } from "../Middlewares/logger.js";

const movieList = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;
  const min_rating = parseFloat(req.query.min_rating);
  const category = req.query.category;
  const search = req.query.search;

  const params = [];
  const conditions = [];

  if (min_rating < 0 || min_rating > 10) {
    res.status(400).json({ message: "Rating must be between 0 and 10" });
  }

  try {
    var sql = `SELECT m.id, m.title, m.director, m.release_year, m.rating, m.category_id, c.name
                    FROM movies m
                    INNER JOIN categories c
                    ON m.category_id = c.id`;

    if (min_rating) {
      conditions.push(" rating>=? ");
      params.push(min_rating);
    }

    if (category) {
      conditions.push("c.name=? ");
      params.push(category);
    }

    if (search) {
      conditions.push("m.title LIKE ?");
      params.push(`%${search}%`);
    }

    if (conditions.length != 0) {
      sql += " WHERE " + conditions.join(" AND ");
    }

    const countSql = `SELECT COUNT(*) as total FROM movies m 
                        INNER JOIN categories c on m.category_id = c.id
                        ${conditions.length ? " WHERE " + conditions.join(" AND ") : ""}`;
    const [countResult] = await database.query(countSql, params);
    const total = countResult[0].total;

    sql += " LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const [movies] = await database.query(sql, params);

    if (movies) {
      res.status(200).json({
        movies,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      });
    } else {
      res.status(404).send({ message: "No movies found" });
    }
  } catch (err) {
    logger.error("Failed to fetch movies", {
      error: err.message,
    });
    res.status(500).send({ message: "An error has occurred" });
  }
};

export const show = async (req, res) => {
  const movieId = parseInt(req.params.id);

  try {
    const [movies] = await database.query(
      `SELECT m.id, m.title, m.director, m.release_year, m.rating, m.category_id, c.name
             FROM movies m
             INNER JOIN categories c ON m.category_id = c.id
             WHERE m.id = ?`,
      [movieId],
    );

    if (movies[0] != null) {
      res.status(200).json(movies[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    logger.error("Failed to fetch movie", {
      error: err.message,
      movie_id: movieId,
    });
    res.status(500).send({ message: "An error has occurred" });
  }
};

export const create = async (req, res) => {
  const newMovie = req.body;

  const title = newMovie.title;
  const director = newMovie.director;
  const release_year = newMovie.release_year;
  const rating = newMovie.rating;
  const category_id = newMovie.category_id;

  // console.log([title, director, release_year, rating, category_id], Object.keys(newMovie).length)

  if (!newMovie || Object.keys(newMovie).length < 5) {
    res.status(400).json({ message: "Invalid request" });
  } else {
    try {
      const [newMovie] = await database.query(
        "INSERT INTO movies(title, director, release_year, rating, category_id) VALUES(?, ?, ?, ?, ?)",
        [title, director, release_year, rating, category_id],
      );

      if (newMovie) {
        logger.info("Movie created", {
          movie_id: newMovie.insertId,
          title,
        });
        res.status(201).json({
          message: "Movie added successfully",
          movieId: newMovie.insertId,
          name: title,
        });
      }
    } catch (err) {
      logger.error("Failed to create movie", {
        error: err.message,
        title,
      });
      res.status(500).send({ message: "An error has occured" });
    }
  }
};

export const update = async (req, res) => {
  const movieId = parseInt(req.params.id);
  const updatedMovie = req.body;

  const title = updatedMovie.title;
  const director = updatedMovie.director;
  const release_year = updatedMovie.release_year;
  const rating = updatedMovie.rating;
  const category_id = updatedMovie.category_id;

  // console.log([title, director, release_year, rating, category_id], Object.keys(updatedMovie).length)

  if (!updatedMovie || Object.keys(updatedMovie).length < 5) {
    res.status(400).json({ message: "Invalid request" });
  } else {
    try {
      const [updatedMovie] = await database.query(
        "UPDATE movies SET title=?, director=?, release_year=?, rating=?, category_id=? WHERE id=?",
        [title, director, release_year, rating, category_id, movieId],
      );

      if (updatedMovie) {
        logger.info("movie updated", {
          movie_id: movieId,
          title,
        });
        res.status(201).json({
          message: "Movie updated successfully",
          name: title,
          id: movieId,
        });
      }
    } catch (err) {
      logger.error("Failed to update movie", {
        error: err.message,
      });
      res.status(500).send({ message: "An error has occured" });
    }
  }
};

export const destroy = async (req, res) => {
  const movieId = parseInt(req.params.id);

  try {
    const [deletedMovie] = await database.query(
      "DELETE FROM movies WHERE id=?",
      [movieId],
    );

    if (deletedMovie.affectedRows != 0) {
      logger.info("movie deleted", {
        movie_id: movieId,
      });
      res.status(200).json({
        message: "Movie deleted successfully",
      });
    } else {
      res.status(404).json({ message: "No movies found to delete" });
    }
  } catch (err) {
    logger.error("Failed to delete movie", {
      error: err.message,
      movie_id: movieId,
    });
    res.status(500).send({ message: "An error has occurred" });
  }
};

export default movieList;
