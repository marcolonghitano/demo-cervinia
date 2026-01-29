import React from 'react';
import type { CardStatus } from '../services/apiClient';

interface Props {
    data: CardStatus;
    searchedCardNumber?: string;
    onReset: () => void;
}

export const ResultCard: React.FC<Props> = ({ data, searchedCardNumber, onReset }) => {
    if (!data.exists) {
        return (
            <div className="w-full max-w-md bg-red-900/50 border border-red-500 p-6 rounded-xl text-center">
                <div className="text-red-300 text-6xl mb-4">⚠️</div>
                <h2 className="text-2xl font-bold text-white mb-2">Tessera Non Trovata</h2>
                {searchedCardNumber && <p className="text-white font-mono text-lg mb-2">{searchedCardNumber}</p>}
                <p className="text-red-200 mb-6">Il numero inserito non corrisponde a nessuna Snowitcard nota.</p>
                <button onClick={onReset} className="text-white underline hover:text-red-200">Riprova</button>
            </div>
        );
    }

    // Determine Insurance Status Color/Text
    const insuranceBg = data.insuranceActive ? "bg-green-600" : "bg-red-600";
    const insuranceTitle = data.insuranceActive ? "ASSICURAZIONE ATTIVA" : "NESSUNA ASSICURAZIONE";
    const insuranceDetail = data.insurancePresent
        ? `Provider: ${data.insuranceProvider === 'SNOWIT' ? 'Snowit' : 'Comprensorio'}`
        : "Nessuna polizza associata";

    // Determine Skipass Status Color/Text
    const skipassBg = data.hasSkipassToday ? "bg-green-600" : "bg-gray-600";
    const skipassTitle = data.hasSkipassToday ? "SKIPASS VALIDO OGGI" : "NESSUN BIGLIETTO CARICATO";

    return (
        <div className="w-full max-w-md bg-snow-800 p-6 rounded-xl shadow-lg border border-snow-700 animate-fade-in">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-xl font-bold text-snow-50">Esito Verifica</h2>
                    {searchedCardNumber && <p className="text-snow-300 font-mono text-sm">Tessera: {searchedCardNumber}</p>}
                </div>
                <button onClick={onReset} className="text-snow-100 hover:text-white text-sm bg-snow-700 px-3 py-1 rounded">
                    Nuova Verifica
                </button>
            </div>

            <div className={`mb-4 p-5 rounded-lg text-white ${insuranceBg} shadow-md`}>
                <div className="flex items-center gap-3 mb-1">
                    {data.insuranceActive ? (
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    ) : (
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    )}
                    <h3 className="text-lg font-bold">{insuranceTitle}</h3>
                </div>
                <p className="opacity-90 pl-11">{insuranceDetail}</p>
            </div>

            <div className={`p-5 rounded-lg text-white ${skipassBg} shadow-md`}>
                <div className="flex items-center gap-3 mb-1">
                    {data.hasSkipassToday ? (
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    ) : (
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    )}
                    <h3 className="text-lg font-bold">{skipassTitle}</h3>
                </div>
                {data.todaySkipass && (
                    <p className="opacity-90 pl-11">{data.todaySkipass.type}</p>
                )}
            </div>

        </div>
    );
};
