import {
    Client
} from 'pg'

export const connectDB = async() => {
    return new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });

}