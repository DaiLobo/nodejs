import { Router } from "express";
import ShortnerController from "../controller/ShortnerController.js";

const shortnerController = new ShortnerController();
const router = Router();

router.get("/:hash", shortnerController.redirect);
router.get("/api/shortner", shortnerController.index);
router.get("/api/shortner/:id", shortnerController.getOne);
router.post("/api/shortner", shortnerController.store);
router.put("/api/shortner/:id", shortnerController.update);
router.delete("/api/shortner/:id", shortnerController.remove);

export default router;