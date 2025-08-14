import type { DiaryEntry } from "../types/diaryEntry";

interface DiaryProps {
    diary: DiaryEntry
}

export const DiaryEntryView = (props: DiaryProps) => {
    return (
        <div>
            <b>{props.diary.date}</b>
            <p>Visibility: {props.diary.visibility}</p>
            <p>Weather: {props.diary.weather}</p>
            <p>Comment: {props.diary.comment}</p>
        </div>
    );
};