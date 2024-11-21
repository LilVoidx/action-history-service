import express from "express";
import HistoryController from "../controllers/history.controller";

const router = express.Router();

router.post("/history", HistoryController.logAction);
router.get("/history", HistoryController.getHistory);

export default router;
