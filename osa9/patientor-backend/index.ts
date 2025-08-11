import express from "express";
import diagnosisRouter from "./routes/diagnoses";

const app = express();
const PORT = 3001;

app.use(express.json());


app.get("/api/ping", (_req, res) => {
    console.log("someone pinged here");
    res.send("pong");
});

app.use("/api/diagnoses", diagnosisRouter);

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
