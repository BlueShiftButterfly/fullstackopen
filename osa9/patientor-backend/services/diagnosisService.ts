import data from "../data/diagnoses";
import { Diagnosis } from "../types/diagnosis";

const db = data as Diagnosis[];

const getEntries = (): Diagnosis[] => {
    return db;
};

const addDiagnosis = () => {
    return null;
};

export default {
    getEntries,
    addDiagnosis
};