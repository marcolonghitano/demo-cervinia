import { db, SnowitCard, Skipass } from "../db/fakeFirestore";
import { parseISO, isWithinInterval, isSameDay } from "date-fns";

export interface CardStatus {
    exists: boolean;
    insurancePresent: boolean;
    insuranceProvider: "SNOWIT" | "RESORT" | null;
    insuranceActive: boolean;
    hasSkipassToday: boolean;
    todaySkipass: Skipass | null;
    errors: string[];
}

export const checkCardStatus = async (cardNumber: string): Promise<CardStatus> => {
    const card = await db.cards.findOne(cardNumber);

    if (!card) {
        return {
            exists: false,
            insurancePresent: false,
            insuranceProvider: null,
            insuranceActive: false,
            hasSkipassToday: false,
            todaySkipass: null,
            errors: ["Card not found"],
        };
    }

    const allSkipasses = await db.skipasses.findManyByCard(cardNumber);

    // Check for skipass valid TODAY
    const today = new Date();
    let todaySkipass: Skipass | null = null;

    for (const pass of allSkipasses) {
        const start = parseISO(pass.validFrom);

        // Handle single date or range/array
        if (Array.isArray(pass.validTo)) {
            // Not implemented in mock data yet, assuming simple range for MVP
        } else {
            const end = parseISO(pass.validTo as string);
            if (isWithinInterval(today, { start, end })) {
                todaySkipass = pass;
                break; // Found one
            }
        }
    }

    return {
        exists: true,
        insurancePresent: !!card.insuranceProvider,
        insuranceProvider: card.insuranceProvider,
        insuranceActive: card.insuranceActive,
        hasSkipassToday: !!todaySkipass,
        todaySkipass: todaySkipass,
        errors: [],
    };
};
