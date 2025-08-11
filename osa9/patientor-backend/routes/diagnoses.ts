import express from "express";
import diagnosisService from "../services/diagnosisService";

const router = express.Router();

router.get("/", (_req, res) => {
    const entries = diagnosisService.getEntries();
    res.send(entries);
});

router.post("/", (_req, res) => {
    res.send("Saving a diagnosis!");
});

export default router;