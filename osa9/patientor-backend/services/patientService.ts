import data from "../data/patients";
import { Patient } from "../types/patient";

const db = data as Patient[];

const getEntries = (): Patient[] => {
    return db;
};

const addPatient = () => {
    return null;
};

export default {
    getEntries,
    addPatient
};