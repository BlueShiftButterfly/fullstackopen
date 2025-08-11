import data from "../data/patients";
import { NewPatient, NewPatientSchema, Patient } from "../types/patient";
import { v4 as uuid } from "uuid";

const db: Patient[] = data.map(obj => {
    const o = NewPatientSchema.parse(obj) as Patient;
    o.id = obj.id;
    return o;
});

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