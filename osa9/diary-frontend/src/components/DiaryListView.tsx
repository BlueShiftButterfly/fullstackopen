import type { DiaryEntry } from "../types/diaryEntry";
import { DiaryEntryView } from "./DiaryEntryView";

interface DiaryListViewProps {
    diaries: DiaryEntry[]
};

export const DiaryListView = (props: DiaryListViewProps) => {
    return (
        <div>
            {props.diaries.map(d => <DiaryEntryView diary={d} key={d.id}></DiaryEntryView>)}
        </div>
    );
};