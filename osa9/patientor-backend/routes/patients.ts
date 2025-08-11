import express from "express";
import { Response } from "express";
import patientService from "../services/patientService";
import { NewPatient, Patient } from "../types/patient";
import toNewPatient from "../types/toNewPatient";

const router = express.Router();

router.get("/", (_req, res: Response<Patient[]>) => {
    const entries = patientService.getEntries();
    res.send(entries);
});

router.post("/", (req, res) => {
    try {
        const newPatient: NewPatient = toNewPatient(req.body);
        const addedPatient: Patient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch(error: unknown) {
        let msg = "Error";
        if (error instanceof Error) {
            msg = error.message;
        }
        res.status(400).send(msg);
    }
});

export default router;