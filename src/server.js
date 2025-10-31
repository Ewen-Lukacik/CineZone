import express from "express";

import categoryList from "./CategoryController.js";
import movieList, { create, destroy, show, update } from "./MovieController.js";

const app = express();
app.use(express.json()); //middleware

//Movie related routes
app.get('/movies', movieList);
app.get('/movies/:id', show);
app.post('/movies', create);
app.put('/movies', update);
app.delete('/movies', destroy);

//categorty relateed routes
app.get('/categories', categoryList)

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
