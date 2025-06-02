import express from "express";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import passport from "./config/passport";
import Router from "./routes/router.routes";
import path from 'path';
import { Request, Response } from "express";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(
  session({
    secret: "secreto123",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(Router);



export default app;
