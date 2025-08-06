export const parseArguments = (args: string[], minArgs: number, maxArgs: number = -1): number[] => {
    if (args.length < minArgs) throw new Error("Not enough arguments");
    if (args.length > maxArgs && maxArgs > -1) throw new Error("Too many arguments");
    const nArgs: number[] = [];
    for (let i: number = 2; i < args.length; i++) {
        if (isNaN(Number(args[i])) == false ) {
            nArgs.push(Number(args[i]));
        } else {
            throw new Error(`Could not parse argument "${args[i]}" at index ${i} as a number`);
        }
    }
    return nArgs;
};
