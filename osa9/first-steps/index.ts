import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
    const w = Number(req.query.weight);
    const h = Number(req.query.height)
    if (isNaN(w) || isNaN(h)) {
        res.status(400).send({ error: "malformatted parameters" })
    }
    const bmi: string = calculateBmi(h, w);
    res.status(200).send({ weight: w, height: h, bmi: bmi });
    
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});