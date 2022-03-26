import { Router } from "express";
import MovieController from "../controllers/MovieController";

const movieController = new MovieController()

const router = Router()

router.get("/movie", movieController.index)
router.get("/movie/:id", movieController.getOne)
router.put("/movie/:id", movieController.update)
router.delete("/movie/:id", movieController.remove)
router.post("/movie", movieController.store)

export default router;