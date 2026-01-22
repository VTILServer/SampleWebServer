/// Web Server
/// by: VTILServer.com (ErringPaladin10)
/// started: 01/22/2026
/// heve fun!

/// Constants and Imports
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';

/// Imports from files
import EventLogger from './EventLogger.js';

/// Initialize Event Logger
const eventLogger = new EventLogger();


/// Load environment variables from .env file
dotenv.config();

/// Configuration variables
const PORT = process.env.PORT;
const API_KEY = process.env.API_KEY;
const WAIT_TIME_MS = process.env.WAIT_TIME_MS;

/// Initialize Express app
const app = express();
const __dirname = path.resolve();

/// create public directory if it doesn't exist
const publicDirectory = path.join(__dirname, 'public');
if (!fs.existsSync(publicDirectory)) {
    fs.mkdirSync(publicDirectory);
}

/// Wait function
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

/// Middleware to serve static files
app.use(express.static(publicDirectory));
app.use(express.json());

/// Middleware to parse api key from headers
app.use((req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    // Check if api key is valid and is not a get request
    if (req.method !== 'GET' && apiKey !== API_KEY) {
        eventLogger.logEvent('UNAUTHORIZED_ACCESS', { ip: req.ip, path: req.path });
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // Proceed to next middleware or route handler
    next();
});

/// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/// Endpoint to serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/// Example API endpoint
app.post('/api/v1/data', (req, res) => {
    const requestData = req.body;
    eventLogger.logEvent('DATA_RECEIVED', { ip: req.ip, data: requestData });
    res.json({ status: 'success', receivedData: requestData });
});

/// My holy process event handlers
process.on('SIGINT', () => {
    eventLogger.logEvent("SERVER_STOP", { port: PORT });
    eventLogger.logEvent('INFO', { message: 'Server is shutting down' });
    
    wait(WAIT_TIME_MS).then(() => process.exit());
});
process.on('SIGTERM', () => {
    eventLogger.logEvent("SERVER_STOP", { port: PORT });
    eventLogger.logEvent('INFO', { message: 'Server is shutting down' });
    wait(WAIT_TIME_MS).then(() => process.exit());
});
process.on('exit', (code) => {
    eventLogger.logEvent("SERVER_STOP", { port: PORT });
    eventLogger.logEvent('INFO', { message: `Server exited with code ${code}` });
    wait(WAIT_TIME_MS).then(() => process.exit());
});
process.on('uncaughtException', (err) => {
    eventLogger.logEvent("SERVER_ERROR", { port: PORT });
    eventLogger.logEvent('ERROR', { message: `Uncaught Exception: ${err.message}`, stack: err.stack });
    wait(WAIT_TIME_MS).then(() => process.exit(1));
});
process.on('unhandledRejection', (reason, promise) => {
    eventLogger.logEvent("SERVER_ERROR", { port: PORT });
    eventLogger.logEvent('ERROR', { message: `Unhandled Rejection at: ${promise}`, reason: reason });
    wait(WAIT_TIME_MS).then(() => process.exit(1));
});


/// Listen on the specified port
app.listen(PORT, () => {
    eventLogger.logEvent('SERVER_START', { port: PORT });
    eventLogger.logEvent('INFO', { message: `Server is running on port ${PORT}` });
});