import data from "../data/patients";
import { NewPatient, Patient } from "../types/patient";
import { v4 as uuid } from "uuid";
import toNewPatient from "../types/toNewPatient";

const db: Patient[] = data.map(obj => {
    const o = toNewPatient(obj) as Patient;
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