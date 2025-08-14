import { Visibility } from "./visibility";
import { Weather } from "./weather";


export interface DiaryEntry {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment: string;
}