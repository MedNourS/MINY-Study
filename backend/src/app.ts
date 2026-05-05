// Import necessary modules for app functionality
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from './middleware/logger';
import router from './routes/router';

// Make the app and add the required middleware and routes
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(logger);
app.use(express.json());
app.use('/api', router);

export default app;
