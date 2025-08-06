import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExcercises, ExcerciseResult } from "./excerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
    const w = Number(req.query.weight);
    const h = Number(req.query.height);
    if (isNaN(w) || isNaN(h)) {
        res.status(400).send({ error: "malformatted parameters" });
    }
    const bmi: string = calculateBmi(h, w);
    res.status(200).send({ weight: w, height: h, bmi: bmi });
    
});

app.post("/excercises", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_excercises, target } = req.body;
    if (daily_excercises == false) {
        res.status(400).send({ error: "missing parameter 'daily_excercises'"});
    }
    if (target == false) {
        res.status(400).send({ error: "missing parameter 'target'"});
    }
    if (Array.isArray(daily_excercises) == false) {
        res.status(400).send({ error: "malformatted parameter 'daily_excercises'"});
    }
    if (isNaN(Number(target))) {
        res.status(400).send({ error: "malformatted parameter 'target'"});
    }

    const d = daily_excercises as number[];
    const t = target as number;

    const result: ExcerciseResult = calculateExcercises(d, t);

    res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});