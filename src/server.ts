import express, { Application } from 'express';
import router from './routes/index.routes.js';
import prisma from 'prisma';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import errorHandler from './middlewares/error.middleware.js';
import passport from './config/local.strategy.js';
dotenv.config();

const app: Application = express();

//middleware to allows cross-origin resource sharing (CORS)
app.use(cors());

//parse json data from request body use body-parser under the hood
app.use(express.json());

//enable session support for login sessions when using passport
// app.use(
//     session({
//         secret:
//             process.env.SESSION_SECRET ||
//             '15de08acca03ebdc8257b7298fb3c21d7a7819a2fb84ec64c0bf5b229c4c38819b447d19b7e4f7aef52af5268719d9c3',
//         resave: false,
//         saveUninitialized: false
//     })
// );

//initialize passport middleware for local and jwt auth
app.use(passport.initialize());

//route middleware to handle routes
app.use('/api/v1', router);

//handle error passed by previous middleware
app.use(errorHandler);

//listening to server
app.listen(process.env.APP_PORT || 8008, () => {
    console.log(`server is running on port ${process.env.APP_PORT}`);
});

//disconnect db connection after app close
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});
