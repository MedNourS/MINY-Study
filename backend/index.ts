// Import and configure dotenv for env variables
import { config } from 'dotenv';
config({
    path: '.env',
});

// After successfully loading the env variables, import the app and listen on the specified port
import app from './src/app';
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(
        `[${new Date().toISOString()}] Server is running on port ${PORT}`,
    );
});
