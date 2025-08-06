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
    [0, 0.5],
    [0.5, 1.0],
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
        if (range[0] * goal < average && average <= range[1] * goal) {
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
        (a, c): number => c > 0 ? a : a + 1
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

console.log(calculateExcercises([3, 0, 2, 4.5, 0, 3, 1], 2));
