import express from 'express';
import 'dotenv/config'

const app = express();
// todo: use env variable
const PORT = process.env.APP_PORT;

if (!PORT) {
    throw new Error('PORT is not defined');
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
