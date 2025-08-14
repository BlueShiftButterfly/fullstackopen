import type { NewDiaryEntry } from "../types/newDiaryEntry";
import { Visibility } from "../types/visibility";
import { Weather } from "../types/weather";
import { useField } from "../utils/useField";

interface NewDiaryFormProps {
    handleCreateNewDiary: (object: NewDiaryEntry) => void
}

export const NewDiaryForm = (props: NewDiaryFormProps) => {
    const date = useField("text");
    const visibility = useField("text");
    const weather = useField("text");
    const comment = useField("text");

    const parseWeather = (object: string) => {
        switch (object.toLowerCase()) {
            case "sunny":
                return Weather.Sunny;
            case "rainy":
                return Weather.Rainy;
            case "cloudy":
                return Weather.Cloudy;
            case "stormy":
                return Weather.Stormy;
            case "windy":
                return Weather.Windy;
            default:
                return Weather.Sunny;
        }
    };

    const parseVisibility = (object: string) => {
        switch (object.toLowerCase()) {
            case "good":
                return Visibility.Good;
            case "great":
                return Visibility.Great;
            case "ok":
                return Visibility.Ok;
            case "poor":
                return Visibility.Poor;
            default:
                return Visibility.Great;
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newDiary = 
        {
            date: date.value,
            comment: comment.value,
            weather: parseWeather(weather.value),
            visibility: parseVisibility(visibility.value)
        };
        props.handleCreateNewDiary(newDiary);
        date.reset();
        visibility.reset();
        weather.reset();
        comment.reset();
    };

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