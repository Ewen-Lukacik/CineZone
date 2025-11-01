import express from "express";
import categoryList from "./Controller/CategoryController.js";
import movieList, { create, destroy, show, update } from "./Controller/MovieController.js";
import { logger } from "./Middlewares/logger.js";
import { movieValidator } from "./Middlewares/validateMovie.js";

const app = express();

const middlewares = [
  express.json(),
  logger
]
app.use(middlewares); //middleware

//Movie related routes
app.get('/movies', movieList);
app.get('/movies/:id', show);
app.post('/movies', movieValidator, create);
app.put('/movies/:id', movieValidator, update);
app.delete('/movies/:id', destroy);

//categorty relateed routes
app.get('/categories', categoryList)

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
