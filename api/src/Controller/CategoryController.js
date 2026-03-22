import database from "../database.js";

const categoryList = async (req, res) => {
    try {
        const [categories] = await database.query(
            'select * from categories'
        )

        if(categories[0] != null) {
            res.status(200).send(categories);
        } else {
            res.status(404).json({ "message": "No categories found" });
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ "message": "An error has occurred" })
    }
}

export default categoryList;