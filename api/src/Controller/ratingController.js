import database from "../database.js";

const recalculateMovieRating = async (movieId) => {
    const [rows] = await database.query(
        `SELECT AVG(rating) as avg_rating FROM ratings WHERE movie_id = ?`,
        [movieId]
    );

    const avg = rows[0].avg_rating ? parseFloat(rows[0].avg_rating).toFixed(1) : null;

    if(avg != null){
        await database.query(
            `UPDATE movies SET rating = ? WHERE id = ?`,
            [avg, movieId]
        );
    }

    return avg;
}

const recalculateMovieRating = async (movieId) => {
    const [rows] = await database.query(
        `SELECT AVG(rating) as avg_rating FROM ratings WHERE movie_id = ?`,
        [movieId]
    );

    const avg = rows[0].avg_rating ? parseFloat(rows[0].avg_rating).toFixed(1) : null;

    if(avg != null){
        await database.query(
            `UPDATE movies SET rating = ? WHERE id = ?`,
            [avg, movieId]
        );
    }

    return avg;
}

export const insertRating = async (req, res) => {
    const userId = req.user.id;
    const { movie_id, rating } = req.body;

    if(!movie_id || rating == null){
        return res.status(400).json({
            message: "movie and rating required"
        })
    }

    if(!rating < 1 || rating > 10){
        return res.status(400).json({
            message: "rating must be between 1 and 10"
        })
    }

    try{
        await database.query(
            `INSERT INTO ratings (movie_id, user_id, rating)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE rating = VALUES(rating)`,
            [movie_id, userId, rating]
        );

        //upd le movie rating
        const newAvg = await recalculateMovieRating(movie_id);

        res.status(200).json({
            message: "rating added",
            new_avg: newAvg,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({"message": "An error has occurred"})
    }
}

export const deleteRating = async (req, res) => {
    const userId = req.user.id;
    const movieId = parseInt(req.params.movieId);

    try{
        const [result] = await database.query(
            `DELETE FROM ratings WHERE movie_id = ? AND user_id = ?`,
            [movieId, userId]
        );

        if(result.affectedRows === 0){
            return res.status(400).json({
                message: "no rating found for deletation"
            });
        }

        //upd le movie rating
        const newAvg = await recalculateMovieRating(movie_id);

        res.status(200).json({
            message: "rating deleted",
            new_avg: newAvg,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({"message": "An error has occurred"})
    }
}

export const getRating = async (req, res) => {
    const userId = req.user?.id ?? null;
    const movieId = parseInt(req.params.movieId);

    try{
        let userRating = null;
        if(userId){
            const [rows] = await database.query(
                `SELECT rating FROM ratings WHERE movie_id = ? AND user_id = ?`,
                [movieId, userId]
            );

            userRating = rows[0]?.rating ?? null;
        }

        res.status(200).json({
            user_rating: userRating
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({"message": "An error has occurred"})
    }
}