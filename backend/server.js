import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend is running!!')
});

const port = process.env.PORT || 3003;

const startServer = async() => {
    await connectDB();
    app.listen(port, () => {
        console.log(`Server is running on ${port}`);
    });
};

startServer();

