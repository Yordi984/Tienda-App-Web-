import cors from 'cors';
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import path from 'path';
import passport from './config/passport';
import Router from './routes/router.routes';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(
  session({
    secret: 'secreto123',
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(
  '/uploads',
  express.static(path.join(__dirname, '..', 'uploads')) // <- sube un nivel
);
app.use(passport.initialize());
app.use(passport.session());

app.use(Router);

export default app;
