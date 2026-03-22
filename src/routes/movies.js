import { Router } from "express";
import movieList, { create, destroy, show, update } from "../Controller/MovieController.js";
import { requireAdminQuery } from "../Middlewares/requireAdminQuery.js";
import { requireAuth } from "../Middlewares/requireAuth.js";
import { movieValidator } from "../Middlewares/validateMovie.js";


const moviesRouter = Router();

//Movie related routes
moviesRouter.get('/', movieList);
moviesRouter.get('/:id', show);
moviesRouter.post('/', requireAuth, movieValidator, create);
moviesRouter.put('/:id', requireAuth, movieValidator, update);
moviesRouter.delete('/:id', requireAuth, requireAdminQuery, destroy);

export default moviesRouter;