import cors from "cors";
import express from "express";
import categoryList from "./Controller/CategoryController.js";
import { logger } from "./Middlewares/logger.js";
import moviesRouter from "./routes/movies.js";
import userRouter from "./routes/users.js";


const app = express();
app.use(cors({
  origin: "http://localhost:5173"
}));

const middlewares = [
  express.json(),
  logger
]
app.use(middlewares); //middleware

app.use('/movies', moviesRouter);
app.use('/users', userRouter)

//categorty relateed routes
app.get('/categories', categoryList)

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
