import { Router } from "express";
import { deleteRating, getRating, getSuggestions, insertRating } from "../Controller/ratingController";
import { requireAuth } from "../Middlewares/requireAuth";

const ratingsRouter = Router();

ratingsRouter.get("/suggestions", requireAuth, getSuggestions);
ratingsRouter.get("/movie/:movieId", requireAuth, getRating);
ratingsRouter.post("/", requireAuth, insertRating);
ratingsRouter.delete("/:movieId", requireAuth, deleteRating);

export default ratingsRouter;


