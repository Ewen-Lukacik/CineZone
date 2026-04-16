import database from "../database.js";

const categoryList = async (req, res) => {
  try {
    const [categories] = await database.query("select * from categories");

    if (categories[0] != null) {
      res.status(200).send(categories);
    } else {
      res.status(404).json({ message: "No categories found" });
    }
  } catch (err) {
    logger.error("failed to get categories", {
      error: err.message,
      user_id: req.user?.id,
    });
    res.status(500).json({ message: "failed to get categories" });
  }
};

export default categoryList;
