import { parseArguments } from "./parser";

// From https://en.wikipedia.org/wiki/Body_mass_index#Categories
const ranges: Array<[number, number, string]> = [
    [-Infinity, 16, "Underweight (Severe thinness)"],
    [16, 17, "Underweight (Moderate thinness)"],
    [17, 18.5, "Underweight (Mild thinness)"],
    [18.5, 25, "Normal Range"],
    [25, 30, "Overweight (Pre-obese)"],
    [30, 35, "Obese (Class I)"],
    [35, 40, "Obese (Class II)"],
    [40, Infinity, "Obese (Class III)"],
];

export const calculateBmi = (height: number, weight: number): string => {
    const bmi: number = weight / Math.pow((height / 100), 2);
    let result: string = "error";
    for (let i: number = 0; i < ranges.length; i++) {
        const r: [number, number, string] = ranges[i];
        if (r[0] < bmi && bmi <= r[1]) {
            return r[2];
        }
    }
    return result;
}

if (require.main === module) {
    try {
        const nArgs: number[] = parseArguments(process.argv, 4, 4);
        console.log(calculateBmi(nArgs[0], nArgs[1]));
    } catch(error: unknown) {
        if (error instanceof Error) {
            console.log("Error: " + error.message);
        } else {
            console.log("An unknown error occured");
        }
    }
}
