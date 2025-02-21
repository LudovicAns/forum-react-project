import mongoose from 'mongoose';

function getEnvVariables() {
    const protocol = process.env.MONGODB_PROTOCOL;
    const host = process.env.MONGODB_HOST;
    const port = process.env.MONGODB_PORT;
    const database = process.env.MONGODB_DATABASE;
    const username = process.env.MONGODB_USERNAME;
    const password = process.env.MONGODB_PASSWORD;
    const authSource = process.env.MONGODB_AUTH_SOURCE;

    if (!protocol || !host || !port || !database) {
        throw new Error('Missing environment variables for MongoDB.');
    }

    return {protocol, host, port, database, username, password, authSource}
}

export async function connect() {
    const {protocol, host, port, database, username, password, authSource} = getEnvVariables();

    const connectionString = `${protocol}://${host}:${port}/${database}`;

    const options = {};

    if (authSource) {
        options.authSource = authSource;
    }

    if (username && password) {
        options.auth = {
            username: username,
            password: password
        }
    }

    await mongoose.connect(connectionString, options);
}