import { Router } from "express";
import movieList, { create, destroy, show, update } from "../Controller/MovieController.js";
import { requireAuth } from "../Middlewares/requireAuth.js";
import { requireRole } from "../Middlewares/requireRole.js";
import { movieValidator } from "../Middlewares/validateMovie.js";


const moviesRouter = Router();

//Movie related routes
moviesRouter.get('/', movieList);
moviesRouter.get('/:id', show);
moviesRouter.post('/', requireAuth, requireRole("admin") ,movieValidator, create);
moviesRouter.put('/:id', requireAuth, requireRole("admin"), movieValidator, update);
moviesRouter.delete('/:id', requireAuth, requireRole("admin"), destroy);

export default moviesRouter;