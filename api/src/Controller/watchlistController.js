import database from "../database.js";

export async function getWatchlist(req, res) {
    try {
        const [watchlist] = await database.query(
            `SELECT m.id, m.title, m.director, m.release_year, m.rating, c.name
             FROM watchlist w
             INNER JOIN movies m ON w.movie_id = m.id
             INNER JOIN categories c ON m.category_id = c.id
             WHERE w.user_id = ?`,
            [req.user.id]
        );
        res.status(200).json(watchlist);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "An error has occured"
        })
    }
}

export async function addToWatchlist(req, res) {
    const { movie_id } = req.body;

    try {
        await database.query(
            "INSERT INTO watchlist (user_id, movie_id) VALUES (?, ?)",
            [req.user.id, movie_id]
        );
        res.status(201).json({ message: "Added to watchlist" });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "An error has occured"
        })
    }
}

export async function removeFromWatchlist(req, res) {
    const { movie_id } = req.params;

    try {
        const [result] = await database.query(
            "DELETE FROM watchlist WHERE user_id = ? AND movie_id = ?",
            [req.user.id, movie_id]
        );

        if (result.affectedRows === 0){
            return res.status(404).json({ message: "Not found" });
        } 

        res.status(200).json({ message: "Removed from watchlist" });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "An error has occured"
        })
    }
}