# Exposing the Application with Localtunnel

This project uses `localtunnel` to give you a public URL for both the backend and frontend, allowing you to test on external devices (like your phone).

## Prerequisites

- You do NOT need to install anything globally. The scripts use `npx` to run `localtunnel` on demand.

## Instructions

### 1. Start the Backend

Open a terminal in the `backend` directory and run:

```bash
npm run share
```

This will start both your backend server AND the tunnel.
Look for the line that says `[tunnel] your url is: ...`.
**Keep this terminal open.**

### 2. Update Frontend Configuration

Copy the backend URL from step 1 (e.g., `https://slimy-dog-42.loca.lt`).
Open `frontend/.env.local` and update the `VITE_API_URL` variable:

```env
# Don't forget to add /api at the end if your routes expect it!
VITE_API_URL=https://slimy-dog-42.loca.lt/api
```

### 3. Start the Frontend

Open a separate terminal in the `frontend` directory and run:

```bash
npm run share
```

This will start both your frontend server AND the tunnel.
Look for the line that says `[tunnel] your url is: ...`.
**Keep this terminal open.**

### 4. Verification

1.  Open the **Frontend URL** on your mobile phone.
2.  If you see a "Bypass-Tunnel-Reminder" page, click "Click to Continue".
3.  The app should load. Try searching for a card or scanning a QR code.

## Troubleshooting

-   **"504 Gateway Time-out"**: ensure you are using `npm run share`, which runs both the server and the tunnel. Checking the logs in the terminal to see if the server (Dev) started correctly.
-   **CORS Issues**: Localtunnel usually handles headers well, but if you have strict CORS settings in your backend `index.ts`, you might need to allow the frontend's `loca.lt` domain.
    -   Currently the backend allows all CORS (`app.use(cors())`), so this should work fine.
