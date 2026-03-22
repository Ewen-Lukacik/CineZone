import express from "express";
import categoryList from "./Controller/CategoryController.js";
import { logger } from "./Middlewares/logger.js";
import moviesRouter from "./routes/movies.js";


const app = express();

const middlewares = [
  express.json(),
  logger
]
app.use(middlewares); //middleware

app.use('/movies', moviesRouter);

//categorty relateed routes
app.get('/categories', categoryList)

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
