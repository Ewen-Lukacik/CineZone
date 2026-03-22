import { Router } from "express";
import movieList, { create, destroy, show, update } from "../Controller/MovieController.js";
import { requireAdminQuery } from "../Middlewares/requireAdminQuery.js";
import { movieValidator } from "../Middlewares/validateMovie.js";


const moviesRouter = Router();

//Movie related routes
moviesRouter.get('/', movieList);
moviesRouter.get('/:id', show);
moviesRouter.post('/', movieValidator, create);
moviesRouter.put('/:id', movieValidator, update);
moviesRouter.delete('/:id', requireAdminQuery, destroy);

export default moviesRouter;