import type { DiaryInput } from "../types/diaryInput";
import type { NewDiaryEntry } from "../types/newDiaryEntry";
import { Visibility } from "../types/visibility";
import { Weather } from "../types/weather";
import { dateLocale, dateOptions } from "./dateOptions";

export const parseWeather = (object: string, shouldThrow: boolean = true) => {
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
            if (shouldThrow) throw new Error(`Input Error: "${object}" is not a valid value for Weather`);
            else return Weather.Stormy;
    }
};

export const parseVisibility = (object: string, shouldThrow: boolean = true) => {
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
            if (shouldThrow) throw new Error(`Input Error: "${object}" is not a valid value Visibility`);
            else return Visibility.Good;
    }
};

export const diaryParser = (diaryInput: DiaryInput): NewDiaryEntry => {
    const date = Date.parse(diaryInput.date);
    const weather = parseWeather(diaryInput.weather);
    const visibility = parseVisibility(diaryInput.weather);
    return {
        date: new Date(date).toLocaleDateString(dateLocale, dateOptions),
        weather: weather,
        visibility: visibility,
        comment: diaryInput.comment
    };
};