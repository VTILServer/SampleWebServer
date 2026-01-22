/// Event Logger
/// by: VTILServer.com (ErringPaladin10)
/// started: 01/22/2026
/// heve fun!

// Constants and Imports
import fs from 'fs';
import path from 'path';

// Determine directory paths
const __dirname = path.resolve();
const logDirectory = path.join(__dirname, 'logs');

// Ensure log directory exists
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

// number of logs in the logdirectory
const logFiles = fs.readdirSync(logDirectory).filter(file => file.endsWith('.log'));

// Event Logger Class
class EventLogger {
    // Constructor to initialize log file path and the number of logs
    constructor(logFileName = `${new Date().toISOString().slice(0, 10)}-${logFiles.length + 1}.log`) {
        this.logFilePath = path.join(logDirectory, logFileName);
    }

    // Method to log an event
    logEvent(eventType, eventData) {
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] [${eventType}] ${JSON.stringify(eventData)}\n`;
        fs.appendFile(this.logFilePath, logEntry, (err) => {
            if (err) {
                console.error('Failed to write log entry:', err);
            }
        });
    }
}

// Export the EventLogger class
export default EventLogger;