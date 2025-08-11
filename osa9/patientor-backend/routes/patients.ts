import express from "express";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
    const entries = patientService.getEntries();
    res.send(entries);
});

router.post("/", (_req, res) => {
    res.send("Saving patient data");
});

export default router;