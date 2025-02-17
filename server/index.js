import express from 'express';

const app = express();
// todo: use env variable
const port = 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
