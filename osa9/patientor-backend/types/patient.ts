import z from "zod";
import { Gender } from "./gender";

export interface Patient extends NewPatient {
    id: string
}

export type NewPatient = z.infer<typeof NewPatientSchema>;

export const NewPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.iso.date(),
    ssn: z.string(),
    occupation: z.string(),
    gender: z.enum(Gender)
});
