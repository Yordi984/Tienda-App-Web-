import express from "express";
import morgan from "morgan";
import cors from "cors";
import Router from "./routes/router.routes";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(Router);

export default app;
