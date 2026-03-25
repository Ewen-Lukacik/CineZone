import database from "../database";

export async function getFavorites(req, res){
    try{
        const [favorites] = await database.query(
            `SELECT m.id, m.title, m.director, m.release_year, m.rating, c.name
             FROM favorites f
             INNER JOIN movies m ON f.movie_id = m.id
             INNER JOIN categories c ON m.category_id = c.id
             WHERE f.user_id = ?`,
            [req.user.id]
        );
        res.status(200).json(favorites)
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "An error has occured"
        })
    }
}

export async function addFavorite(req, res){
    const { movie_id } = req.body;

    try{
        await database.query(
            "INSERT INTO favorites (user_id, movie_id) VALUES (?, ?)",
            [req.user.id, movie_id]
        );
        res.status(201).json({
            message: "added to favorites"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "An error has occured"
        })
    }
}

export async function removeFavorite(req, res){
    const { movie_id } = req.params;

    try {
        const [result] = await database.query(
            "DELETE FROM favorites WHERE user_id = ? AND movie_id = ?",
            [req.user.id, movie_id]
        );

        if (result.affectedRows === 0){
            return res.status(404).json({ message: "Not found" });
        } 
        res.status(200).json({ message: "Removed from favorites" });
    } catch (err) {
        res.status(500).json({ message: "An error has occurred" });
    }
}