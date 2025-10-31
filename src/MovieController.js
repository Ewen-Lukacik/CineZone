import database from "./database.js";
const movieList = async (req, res) => {

    const [movies] = await database.query(
        'select * from movies'
    );

    if(movies){
        res.status(200).json(movies)
    } else {
        res.status(404).json({ "message": "No movies found" })
    }

};

export const show = async (req, res) => {
    const movieId = parseInt(req.params.id);

    try {
        const [movies] = await database.query(
            'select * from movies where id=?', 
            [movieId]
        )

        if(movies[0] != null){
            res.status(200).json(movies[0]);
        } else {
            res.sendStatus(404)
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({"message": "An error has occurred"})
    }
};

export const create = async (req, res) => {
    const newMovie = req.body

    const title = newMovie.title;
    const director = newMovie.director;
    const release_year = newMovie.release_year;
    const rating = newMovie.rating;
    const category_id = newMovie.category_id;

    // console.log([title, director, release_year, rating, category_id], Object.keys(newMovie).length)

    if(!newMovie || Object.keys(newMovie).length < 5){
        res.status(400).json({ "message": "Invalid request" });
    } else {
        try {
            const [newMovie] = await database.query(
                "INSERT INTO movies(title, director, release_year, rating, category_id) VALUES(?, ?, ?, ?, ?)",
                [title, director, release_year, rating, category_id]
            )

            if(newMovie){
                res.status(201).json({
                    "message": "Movie added successfully",
                    "movieId": newMovie.insertId,
                    "name": title
                })
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({ "message": "An error has occured" })
        }
    }
};

export const update = async (req, res) => {
    const movieId = parseInt(req.params.id);
    const updatedMovie = req.body

    const title = updatedMovie.title;
    const director = updatedMovie.director;
    const release_year = updatedMovie.release_year;
    const rating = updatedMovie.rating;
    const category_id = updatedMovie.category_id;

    // console.log([title, director, release_year, rating, category_id], Object.keys(updatedMovie).length)

    if(!updatedMovie || Object.keys(updatedMovie).length < 5){
        res.status(400).json({ "message": "Invalid request" });
    } else {
        try {
            const [updatedMovie] = await database.query(
                "UPDATE movies SET title=?, director=?, release_year=?, rating=?, category_id=? WHERE id=?",
                [title, director, release_year, rating, category_id, movieId]
            )

            if(updatedMovie){
                res.status(201).json({
                    "message": "Movie updated successfully",
                    "name": title,
                    "id": movieId
                })
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({ "message": "An error has occured" })
        }
    }
};
export const destroy = async (req, res) => {
    const movieId = parseInt(req.params.id);

    try {
        const [deletedMovie] = await database.query(
            'DELETE FROM movies WHERE id=?', [movieId]
        );

        if(deletedMovie.affectedRows != 0){
            res.status(200).json({
                "message": "Movie deleted successfully"     
            });
        } else {
            res.status(404).json({ "message": "No movies found to delete" })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({"message": "An error has occurred"})
    }
};


export default movieList;