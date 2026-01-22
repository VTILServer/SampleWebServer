/// API Key Generator
/// by: VTILServer.com (ErringPaladin10)
/// started: 01/22/2026
/// Note: This took me like 2 minutes to code, so please don't judge me too much, lol.
/// heve fun!

/// Usage: Run `node tools/generator/generateApiKey.js` in the terminal
/// to generate and print a new API key to the console.

/// Imports
import crypto from 'crypto';

/// Function to generate a random API key
/// Returns a 64-character hexadecimal string
function generateApiKey() {
    return crypto.randomBytes(32).toString('hex').toUpperCase();
}

console.log('Generated API Key:', generateApiKey());