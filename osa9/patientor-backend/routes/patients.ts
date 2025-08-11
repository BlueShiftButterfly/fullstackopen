import express, { NextFunction, Request } from "express";
import { Response } from "express";
import patientService from "../services/patientService";
import { NewPatient, NewPatientSchema, Patient } from "../types/patient";
import z from "zod";

const router = express.Router();

const errorMiddleWare = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
    } else {
        next(error);
    }
};

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => { 
    try {
        NewPatientSchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

router.get("/", (_req, res: Response<Patient[]>) => {
    const entries = patientService.getEntries();
    res.send(entries);
});

router.post("/", newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedEntry = patientService.addPatient(req.body);
    res.json(addedEntry);
});

router.use(errorMiddleWare);

export default router;