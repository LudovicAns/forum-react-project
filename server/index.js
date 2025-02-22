import express from 'express';
import 'dotenv/config'
import {connect as connectMongoDB} from "./model/database/mongodb.js";
import UserController from "./controller/user-controller.js";
import PostController from "./controller/post-controller.js";
import loggerMiddleware from "./middleware/logger-middleware.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
import CommentController from "./controller/comment-controller.js";

const app = express();
const PORT = process.env.APP_PORT;

if (!PORT) {
    throw new Error('PORT is not defined');
}

app.use(express.static('public'));
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

app.use(cors(corsOptions));

app.use(loggerMiddleware);

app.use(express.json());

connectMongoDB()
    .then(() => {
        console.log(`Connexion avec la base de données: OK.`)
    })
    .catch((error) => {
        console.error(`Erreur lors de la connexion à la base de données: ${error.message}`);
    });

app.use("/api/users", UserController);
app.use("/api/posts", PostController);
app.use("/api/comments", CommentController)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
