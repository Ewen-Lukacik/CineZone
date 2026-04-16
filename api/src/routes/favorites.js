import { Router } from "express";
import { addFavorite, getFavorites, removeFavorite } from "../Controller/favoriteController.js";
import { requireAuth } from "../Middlewares/requireAuth.js";

const favoritesRouter = Router();

favoritesRouter.get('/', requireAuth, getFavorites);
favoritesRouter.post('/', requireAuth, addFavorite);
favoritesRouter.delete('/:movie_id', requireAuth, removeFavorite);

export default favoritesRouter;