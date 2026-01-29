import React, { useState } from 'react';

interface Props {
    onSearch: (cardNumber: string) => void;
    onScanClick: () => void;
    isLoading: boolean;
}

export const CardSearchForm: React.FC<Props> = ({ onSearch, onScanClick, isLoading }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.length === 8 || input.length === 23) {
            onSearch(input);
        }
    };

    return (
        <div className="w-full max-w-md bg-snow-800 p-6 rounded-xl shadow-lg border border-snow-700">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-snow-100 mb-1">
                        Numero Tessera (8 o 23 Cifre)
                    </label>
                    <input
                        id="cardNumber"
                        type="text"
                        maxLength={23}
                        value={input}
                        onChange={(e) => setInput(e.target.value.replace(/\D/g, ''))} // Digits only
                        placeholder="12345678"
                        className="w-full bg-snow-900 border border-snow-700 rounded-lg px-4 py-3 text-white text-lg tracking-widest focus:ring-2 focus:ring-blue-500 outline-none placeholder-snow-700"
                    />
                </div>

                <button
                    type="submit"
                    disabled={(input.length !== 8 && input.length !== 23) || isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                    ) : (
                        "Verifica Tessera"
                    )}
                </button>

                <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-snow-700"></div>
                    <span className="flex-shrink mx-4 text-snow-700 text-sm">OPPURE</span>
                    <div className="flex-grow border-t border-snow-700"></div>
                </div>

                <button
                    type="button"
                    onClick={onScanClick}
                    disabled={isLoading}
                    className="w-full bg-snow-700 hover:bg-snow-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                    Scansiona QR Code
                </button>
            </form>
        </div>
    );
};
