import express, { Response } from "express";
import diagnosisService from "../services/diagnosisService";
import { Diagnosis } from "../types/diagnosis";

const router = express.Router();

router.get("/", (_req, res: Response<Diagnosis[]>) => {
    const entries = diagnosisService.getEntries();
    res.send(entries);
});

export default router;