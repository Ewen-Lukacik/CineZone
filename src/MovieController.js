import database from "./database.js";
const movieList = (req, res) => {
    database.query(
        "select * from movies"
    ).then(([movies]) => {
        res.json(movies);
    }).catch((err) => { 
        res.sendStatus(500);
    });
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

export const create = (req, res) => {
    //
};
export const update = (req, res) => {
    //
};
export const destroy = (req, res) => {
    //
};


export default movieList;