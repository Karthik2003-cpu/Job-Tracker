import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import cors from 'cors';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.get('/', (req, res) => {
    res.send('Backend is running!!')
});

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

const port = process.env.PORT || 3003;

const startServer = async () => {
    await connectDB();
    app.listen(port, () => {
        console.log(`Server is running on ${port}`);
    });
};

startServer();

