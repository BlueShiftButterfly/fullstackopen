import express from "express";
import diagnosisRouter from "./routes/diagnoses";
import patientsRouter from "./routes/patients";

const cors = require("cors");


const app = express();
const PORT = 3001;
const FRONTEND_PORT = 5173;

app.use(express.json());
const corsOptions = {
    origin: [`http://localhost:${FRONTEND_PORT}`], 
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions));


app.get("/api/ping", (_req, res) => {
    console.log("someone pinged here");
    res.send("pong");
});

app.use("/api/diagnoses", diagnosisRouter);
app.use("/api/patients", patientsRouter);

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
