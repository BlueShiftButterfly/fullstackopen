import type { DiaryEntry } from "./diaryEntry";

export type NewDiaryEntry = Omit<DiaryEntry, "id">;