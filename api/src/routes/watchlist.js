import { Router } from "express";
import { addToWatchlist, getWatchlist, removeFromWatchlist } from "../Controller/watchlistController.js";
import { requireAuth } from "../Middlewares/requireAuth.js";

const watchlistRouter = Router();

watchlistRouter.get('/', requireAuth, getWatchlist);
watchlistRouter.post('/', requireAuth, addToWatchlist);
watchlistRouter.delete('/:movie_id', requireAuth, removeFromWatchlist);

export default watchlistRouter;