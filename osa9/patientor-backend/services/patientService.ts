import data from "../data/patients";
import { NewPatient, Patient } from "../types/patient";
import { v4 as uuid } from "uuid";

const db = data as Patient[];

const getEntries = (): Patient[] => {
    return db;
};

const addPatient = (patient: NewPatient): Patient => {
    const addedPatient: Patient = {
        id: uuid(),
        ...patient
    };
    db.push(addedPatient);
    return addedPatient;
};

export default {
    getEntries,
    addPatient
};