import { Gender } from "./gender";
import { NewPatient } from "./patient";

const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error("Incorrect type or missing variable name");
    }
    return name;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date)) {
        throw new Error("Incorrect type or missing variable date");
    }
    return date;
};

const parseSSN = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error("Incorrect type or missing variable ssn");
    }
    return ssn;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error("Incorrect type or missing variable occupation");
    }
    return occupation;
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error("Incorrect type or missing variable gender");
    }
    return gender;
};

const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }
    if (
        "name" in object == false ||
        "dateOfBirth" in object == false ||
        "ssn" in object == false ||
        "gender" in object == false ||
        "occupation" in object == false
    ) {
        throw new Error("Incorrect or missing fields");
    }
    const newPatient: NewPatient = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSSN(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation)
    };
    return newPatient;
};

export default toNewPatient;