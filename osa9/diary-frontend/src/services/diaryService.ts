import axios from "axios";
import type { DiaryEntry } from "../types/diaryEntry";
import type { NewDiaryEntry } from "../types/newDiaryEntry";

const URL = "http://localhost:3000/api/diaries";

export const getAllDiaries = () => {
    return axios
        .get<DiaryEntry[]>(URL)
        .then(r => {
            return r.data;
        })
};

export const createDiaryEntry = (object: NewDiaryEntry) => {
    return axios
        .post<DiaryEntry>(URL, object)
        .then(r => {
            return r.data;
        })
};
