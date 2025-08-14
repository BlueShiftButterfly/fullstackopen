import type { NewDiaryEntry } from "../types/newDiaryEntry";
import { diaryParser, parseVisibility, parseWeather } from "../utils/diaryParser";
import { useField } from "../utils/useField";

interface NewDiaryFormProps {
    handleCreateNewDiary: (object: NewDiaryEntry) => void
    flashErrorMessage: (object: string) => void
}

// Wether the frontend tries to first handle errors before the server or not
const HANDLE_PARSE_ERRORS = false;

export const NewDiaryForm = (props: NewDiaryFormProps) => {
    const date = useField("text");
    const visibility = useField("text");
    const weather = useField("text");
    const comment = useField("text");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (HANDLE_PARSE_ERRORS) tryCreateDiary();
        else {
            const newDiary: NewDiaryEntry = {
                date: date.value,
                visibility: parseVisibility(visibility.value, false),
                weather: parseWeather(weather.value, false),
                comment: comment.value
            };
            props.handleCreateNewDiary(newDiary);
            date.reset();
            visibility.reset();
            weather.reset();
            comment.reset();
        }
    };

    const tryCreateDiary = () => {
        try {
            const newDiary = diaryParser({
                date: date.value,
                visibility: visibility.value,
                weather: weather.value,
                comment: comment.value
            });
            props.handleCreateNewDiary(newDiary);
            date.reset();
            visibility.reset();
            weather.reset();
            comment.reset();
        } catch(error: unknown) {
            const e = error as Error;
            console.log(error);
            if (e.message) props.flashErrorMessage(e.message);
        }
    }

    const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        date.reset();
        visibility.reset();
        weather.reset();
        comment.reset();
    };

    return (
        <div>
            <h2>Add a new entry</h2>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <div>Date: <input {...date.getAsInput()}></input></div>
                <div>Visiblity: <input {...visibility.getAsInput()}></input></div>
                <div>Weather: <input {...weather.getAsInput()}></input></div>
                <div>Comment: <input {...comment.getAsInput()}></input></div>
                <button type="submit">Add</button>
                <button type="reset">Reset</button>
            </form>
        </div>
    );
};