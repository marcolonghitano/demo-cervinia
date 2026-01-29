const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const FRONTEND_ENV_PATH = path.join(__dirname, '../../frontend/.env.local');
const PORT = 4010;

console.log('Starting localtunnel...');

const tunnel = spawn('npx', ['-y', 'localtunnel', '--port', PORT]);

tunnel.stdout.on('data', (data) => {
    const output = data.toString();
    console.log(`[tunnel] ${output.trim()}`);

    const match = output.match(/your url is: (https:\/\/[a-zA-Z0-9-]+\.loca\.lt)/);
    if (match) {
        const tunnelUrl = match[1];
        console.log(`Tunnel URL captured: ${tunnelUrl}`);
        updateEnvFile(tunnelUrl);
    }
});

tunnel.stderr.on('data', (data) => {
    console.error(`[tunnel error] ${data}`);
});

tunnel.on('close', (code) => {
    console.log(`Tunnel process exited with code ${code}`);
});

function updateEnvFile(url) {
    try {
        let envContent = '';
        if (fs.existsSync(FRONTEND_ENV_PATH)) {
            envContent = fs.readFileSync(FRONTEND_ENV_PATH, 'utf8');
        }

        // Check if VITE_API_URL exists
        const key = 'VITE_API_URL';
        const newValue = `${key}=${url}/api`;

        if (envContent.includes(key)) {
            // Replace existing line
            envContent = envContent.replace(new RegExp(`${key}=.*`), newValue);
        } else {
            // Append new line
            envContent += `\n${newValue}`;
        }

        fs.writeFileSync(FRONTEND_ENV_PATH, envContent.trim() + '\n');
        console.log(`Updated ${FRONTEND_ENV_PATH} with new URL.`);
    } catch (err) {
        console.error('Failed to update .env.local:', err);
    }
}
