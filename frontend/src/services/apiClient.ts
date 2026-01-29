export interface CardStatus {
    exists: boolean;
    insurancePresent: boolean;
    insuranceProvider: "SNOWIT" | "RESORT" | null;
    insuranceActive: boolean;
    hasSkipassToday: boolean;
    todaySkipass: {
        id: string;
        cardNumber: string;
        validFrom: string;
        validTo: string | string[];
        type?: string;
    } | null;
    errors: string[];
}

const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:3001/api").replace(/\/$/, "") + (import.meta.env.VITE_API_URL?.endsWith("/api") ? "" : "/api");

export const fetchCardStatus = async (cardNumber: string): Promise<CardStatus> => {
    const response = await fetch(`${API_BASE_URL}/cards/${cardNumber}`, {
        headers: {
            "Bypass-Tunnel-Reminder": "true",
        },
    });
    if (!response.ok) {
        if (response.status === 404) {
            // Handle 404 specifically if needed, or let the backend response structure handle it
            // Our backend returns JSON even on 404/400 usually if strictly handled, but fetch throws on network error only.
            // Check if response has body.
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Error ${response.status}`);
    }
    return response.json();
};

export const scanQrCode = async (qrData: string): Promise<CardStatus> => {
    const response = await fetch(`${API_BASE_URL}/cards/scan`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Bypass-Tunnel-Reminder": "true",
        },
        body: JSON.stringify({ qrData }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Error ${response.status}`);
    }
    return response.json();
};
