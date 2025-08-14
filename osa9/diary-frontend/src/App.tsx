import { useEffect, useState } from "react";
import type { DiaryEntry } from "./types/diaryEntry";
import { getAllDiaries } from "./services/diaryService";
import { DiaryListView } from "./components/DiaryListView";

function App() {
    const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

    useEffect(() => {
        getAllDiaries()
            .then(d => {
                if (!d) return;
                setDiaries(d);
            })
            .catch(e => console.log(e));
    }, []);

    return (
        <div>
            <h1>Flight Diary App</h1>
            <DiaryListView diaries={diaries}></DiaryListView>
        </div>
    );
}

export default App;
