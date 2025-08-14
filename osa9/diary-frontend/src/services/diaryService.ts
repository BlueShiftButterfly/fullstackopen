import axios from "axios";
import type { DiaryEntry } from "../types/diaryEntry";

const URL = "http://localhost:3000/api/diaries";

export const getAllDiaries = () => {
    return axios
        .get<DiaryEntry[]>(URL)
        .then(r => {
            return r.data;
        });
};
