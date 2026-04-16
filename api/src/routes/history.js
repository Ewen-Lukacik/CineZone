import { Router } from "express";
import { addHistory, getHistory } from "../Controller/historyController.js";
import { requireAuth } from "../Middlewares/requireAuth.js";

const historyRouter = Router();

historyRouter.get("/", requireAuth, getHistory);
historyRouter.post("/", requireAuth, addHistory);

export default historyRouter;
