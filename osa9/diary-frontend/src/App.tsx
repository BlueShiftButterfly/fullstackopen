import { useEffect, useState } from "react";
import type { DiaryEntry } from "./types/diaryEntry";
import { createDiaryEntry, getAllDiaries } from "./services/diaryService";
import { DiaryListView } from "./components/DiaryListView";
import { NewDiaryForm } from "./components/NewDiaryForm";
import type { NewDiaryEntry } from "./types/newDiaryEntry";

function App() {
    const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

    useEffect(() => {
        getAllDiaries()
            .then(diaries => {
                if (!diaries) return;
                setDiaries(diaries);
            })
            .catch(e => console.log(e));
    }, []);

    const handleCreateDiaryEntry = (object: NewDiaryEntry) => {
        createDiaryEntry(object)
            .then(diary => {
                if (!diary) return;
                setDiaries(diaries.concat(diary));
            })
            .catch(e => console.log(e));
    };

    return (
        <div>
            <h1>Flight Diary App</h1>
            <NewDiaryForm handleCreateNewDiary={handleCreateDiaryEntry}></NewDiaryForm>
            <DiaryListView diaries={diaries}></DiaryListView>
        </div>
    );
}

export default App;
