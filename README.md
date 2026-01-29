# Snowit Rescue Checker

[![Status](https://img.shields.io/badge/Status-Prototype-blue)]()

A "Rescue Checker" application for verify SkiPass and Insurance validity.
Features a React Frontend and an Express Backend, communicating via a REST API.

## Features

-   **Check Card Status**: Verify insurance and skipass validity by card number.
-   **QR Scan**: Simulate scanning a QR code to retrieve card data.
-   **23-Digit Support**: Supports both standard 8-digit and extended 23-digit card numbers.
-   **Mobile Testing**: integrated tunneling for easy testing on mobile devices.

## Project Structure

-   `frontend/`: React application (Vite + Tailwind CSS).
-   `backend/`: Node.js/Express server with mock Firestore database.

## Prerequisites

-   Node.js (v18+ recommended)
-   npm

## Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/marcolonghitano/demo-cervinia.git
    cd demo-cervinia
    ```

2.  **Install Backend Dependencies**:
    ```bash
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies**:
    ```bash
    cd ../frontend
    npm install
    ```

## Running the Application

This project uses a specialized command to run both the server and the tunnel simultaneously.

### 1. Start Backend & Automation
Open a terminal in `backend/`:
```bash
npm run share
```
*This command starts the express server, opens a tunnel, and **automatically updates** the frontend configuration with the new URL.*

### 2. Start Frontend
Open a terminal in `frontend/`:
```bash
npm run share
```
*This starts the Vite dev server and its own tunnel.*

### 3. Accessing the App
-   **Local**: `http://localhost:5173`
-   **Mobile**: check the terminal output of the Frontend command for the `https://....loca.lt` URL.

## Test Data (Mock)

You can use the following card numbers to test different scenarios:

| Card Number | Status | Description |
| :--- | :--- | :--- |
| `12345678` | ✅ **Valid** | Snowit Insurance + Season Pass |
| `87654321` | ✅ **Valid** | Resort Insurance + Daily Skipass |
| `01161471335349283172404` | ✅ **Valid** | Long ID + Resort Insurance + Daily Skipass |
| `11223344` | ⚠️ **Expired** | No Insurance, Expired Skipass |
| `99887766` | ℹ️ **Insurance Only** | Active Snowit Insurance, No Skipass |
| `00000000` | ❌ **Empty** | Valid card number, but no products active |

## License

Private / Demo Purpose.
