import { Router } from "express";
import TicketController from "../controllers/TicketController.js";

const ticketController = new TicketController()

const router = Router()

router.get("/Ticket", ticketController.index.bind(ticketController))
router.get("/Ticket/:id", ticketController.getOne.bind(ticketController))
router.put("/Ticket/:id", ticketController.update.bind(ticketController))
router.delete("/Ticket/:id", ticketController.remove.bind(ticketController))
router.post("/Ticket", ticketController.store.bind(ticketController))

export default router;