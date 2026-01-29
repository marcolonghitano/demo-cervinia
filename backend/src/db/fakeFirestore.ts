export interface SnowitCard {
    cardNumber: string;
    resortName: string;
    insuranceProvider: "SNOWIT" | "RESORT" | null;
    insuranceActive: boolean;
    skipassIds: string[];
}

export interface Skipass {
    id: string;
    cardNumber: string;
    validFrom: string; // ISO Date String YYYY-MM-DD
    validTo: string | string[]; // ISO Date String or Array
    type?: string;
}

// MOCK DATA STORE
const cards: SnowitCard[] = [
    {
        cardNumber: "12345678",
        resortName: "Cervinia",
        insuranceProvider: "SNOWIT",
        insuranceActive: true,
        skipassIds: ["skipass_1"],
    },
    {
        cardNumber: "87654321",
        resortName: "Cervinia",
        insuranceProvider: "RESORT",
        insuranceActive: true,
        skipassIds: ["skipass_2"],
    },
    {
        cardNumber: "01161471335349283172404",
        resortName: "Cervinia",
        insuranceProvider: "RESORT",
        insuranceActive: true,
        skipassIds: ["skipass_new_23"],
    },
    {
        cardNumber: "11223344",
        resortName: "Cervinia",
        insuranceProvider: null,
        insuranceActive: false,
        skipassIds: ["skipass_3"],
    },
    {
        cardNumber: "99887766",
        resortName: "Cervinia",
        insuranceProvider: "SNOWIT",
        insuranceActive: true,
        skipassIds: [], // Insurance only, no skipass
    },
    {
        cardNumber: "00000000",
        resortName: "Cervinia",
        insuranceProvider: null,
        insuranceActive: false,
        skipassIds: [], // Empty card
    }
];

const skipasses: Skipass[] = [
    {
        id: "skipass_1",
        cardNumber: "12345678",
        validFrom: "2024-01-01",
        validTo: "2030-12-31", // Always valid for demo
        type: "Season Pass",
    },
    {
        id: "skipass_2",
        cardNumber: "87654321",
        validFrom: "2024-01-01",
        validTo: "2030-12-31",
        type: "Giornaliero",
    },
    {
        id: "skipass_new_23",
        cardNumber: "01161471335349283172404",
        validFrom: "2024-01-01",
        validTo: "2030-12-31",
        type: "Giornaliero",
    },
    {
        id: "skipass_3",
        cardNumber: "11223344",
        validFrom: "2024-01-01",
        validTo: "2030-12-31",
        type: "Giornaliero",
    }
];

// DATA ACCESS HELPERS
export const db = {
    cards: {
        findOne: async (cardNumber: string): Promise<SnowitCard | null> => {
            return cards.find((c) => c.cardNumber === cardNumber) || null;
        },
    },
    skipasses: {
        findManyByCard: async (cardNumber: string): Promise<Skipass[]> => {
            return skipasses.filter((s) => s.cardNumber === cardNumber);
        },
    },
};
