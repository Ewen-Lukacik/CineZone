import database from "../database.js";

export async function getHistory(req, res) {
  try {
    const [history] = await database.query(
      `
            SELECT m.id, m.title, m.director, m.release_year, m.rating, c.name, h.viewed_at
            FROM history h
            INNER JOIN movies m ON h.movie_id = m.id
            INNER JOIN categories c ON m.category_id = c.id
            WHERE h.user_id = ?
            ORDER BY h.viewed_at DESC
            LIMIT 5`,
      [req.user.id],
    );
    res.status(200).json(history);
  } catch (err) {
    logger.error("failed to get history", {
      error: err.message,
      user_id: req.user?.id,
    });
    res.status(500).json({
      message: "An error has ocurred",
    });
  }
}

export async function addHistory(req, res) {
  const { movie_id } = req.body;

  try {
    await database.query(
      `
            INSERT INTO history (user_id, movie_id, viewed_at)
            VALUES (?, ?, NOW())
            ON DUPLICATE KEY UPDATE viewed_at = NOW()`,
      [req.user.id, movie_id],
    );
    res.status(201).json({
      message: "history updated",
    });
  } catch (err) {
    logger.error("failed to remove from history", {
      error: err.message,
      user_id: req.user?.id,
    });
    res.status(500).json({
      message: "An error has ocurred",
    });
  }
}
