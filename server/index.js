import express from 'express';
import 'dotenv/config'
import {connect as connectMongoDB} from "./model/database/MongoDB.js";
import AuthRouter from "./controller/AuthRouter.js";
import logger from "./middleware/Logger.js";

const app = express();
// todo: use env variable
const PORT = process.env.APP_PORT;

if (!PORT) {
    throw new Error('PORT is not defined');
}

app.use(logger);

app.use(express.json());

connectMongoDB()
    .then(() => {
        console.log(`Connexion avec la base de données: OK.`)
    })
    .catch((error) => {
        console.error(`Erreur lors de la connexion à la base de données: ${error.message}`);
    });

app.use("/api/auth", AuthRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
