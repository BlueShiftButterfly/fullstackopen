import express from "express";
import { Response } from "express";
import patientService from "../services/patientService";
import { Patient } from "../types/patient";

const router = express.Router();

router.get("/", (_req, res: Response<Patient[]>) => {
    const entries = patientService.getEntries();
    res.send(entries);
});

router.post("/", (req, res: Response<Patient>) => {
    const { name, dateOfBirth, ssn, occupation, gender } = req.body;
    const addedPatient: Patient = patientService.addPatient({
        name,
        dateOfBirth,
        ssn,
        occupation,
        gender
    });
    res.json(addedPatient);
});

export default router;