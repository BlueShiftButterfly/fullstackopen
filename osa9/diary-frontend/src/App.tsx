import { useEffect, useState } from "react";
import type { DiaryEntry } from "./types/diaryEntry";
import { createDiaryEntry, getAllDiaries } from "./services/diaryService";
import { DiaryListView } from "./components/DiaryListView";
import { NewDiaryForm } from "./components/NewDiaryForm";
import type { NewDiaryEntry } from "./types/newDiaryEntry";
import { Notification } from "./components/Notification";
import axios from "axios";

function App() {
    const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        getAllDiaries()
            .then(diaries => {
                if (!diaries) return;
                setDiaries(diaries);
            })
            .catch(error => {
                if (axios.isAxiosError(error)) {
                    let message = "An unknown error happened";
                    console.log(error)
                    if (error.message) {
                        if(error.code === "ERR_NETWORK") {
                            message = `${error.message}: Could not connect to server.`;
                        }
                        console.log(error.response)
                        if (error.response) {
                            if (error.response.data) {
                                message = error.response.data;
                            }
                        }
                    }
                    flashErrorMessage(message);
                } else {
                    console.log(error);
                }
            });
    }, []);

    const flashErrorMessage = (message: string, seconds: number = 3) => {
        setErrorMessage(message);
        setTimeout(() => {
            setErrorMessage("");
        }, seconds * 1000);
    };

    const handleCreateDiaryEntry = (object: NewDiaryEntry) => {
        createDiaryEntry(object)
            .then(diary => {
                if (!diary) return;
                setDiaries(diaries.concat(diary));
            })
            .catch(error => {
                if (axios.isAxiosError(error)) {
                    let message = "An unknown error happened";
                    console.log(error)
                    if (error.message) {
                        if(error.code === "ERR_NETWORK") {
                            message = `${error.message}: Could not connect to server.`;
                        }
                        console.log(error.response)
                        if (error.response) {
                            if (error.response.data) {
                                message = error.response.data;
                            }
                        }
                    }
                    flashErrorMessage(message);
                } else {
                    console.log(error);
                }
            });
    };

    return (
        <div>
            <h1>Flight Diary App</h1>
            <Notification message={errorMessage}></Notification>
            <NewDiaryForm
                handleCreateNewDiary={handleCreateDiaryEntry}
                flashErrorMessage={flashErrorMessage}
            ></NewDiaryForm>
            <DiaryListView diaries={diaries}></DiaryListView>
        </div>
    );
}

export default App;
