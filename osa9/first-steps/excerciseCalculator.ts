import { parseArguments } from "./parser";

interface ExcerciseResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const ratingRangesPercent: Array<[number, number]> = [
    [0, 0.6],
    [0.6, 1.0],
    [1.0, 10000]
];

const ratingDescriptions: { [id: number] : string} = {
    1: "Not good. Try to do better next time.",
    2: "Ok. Not too bad but could be better.",
    3: "Great! Keep it up!"
};

const getRating = (ratings: Array<[number, number]>, goal: number, average: number): number => {
    for (let i: number = 0; i < ratings.length; i++) {
        const range = ratings[i];
        if (range[0] * goal <= average && average < range[1] * goal) {
            return i+1;
        }
    }
    return 1;
}

const calculateExcercises = (excerciseHours: number[], targetAmount: number): ExcerciseResult => {
    const totalExcercise: number = excerciseHours.reduce(
        (a, c): number => a + c
    )
    const trainingDays: number = excerciseHours.reduce(
        (a, c): number => { if (c > 0) return a + 1; return a; }
    )
    const average: number = totalExcercise / excerciseHours.length;
    const success: boolean = average >= targetAmount;
    const rating: number = getRating(ratingRangesPercent, targetAmount, average);
    const ratingDescription: string = ratingDescriptions[rating];
    
    const result: ExcerciseResult = {
        periodLength: excerciseHours.length,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target: targetAmount,
        average
    }
    return result;
}

try {
    const nArgs: number[] = parseArguments(process.argv, 2, 10000000);
    console.log(calculateExcercises(nArgs.slice(1), nArgs[0]));
} catch(error: unknown) {
    if (error instanceof Error) {
        console.log("Error: " + error.message);
    } else {
        console.log("An unknown error occured");
    }
}