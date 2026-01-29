import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';

interface Props {
    onScan: (code: string) => void;
    onClose: () => void;
}

export const QrScanner: React.FC<Props> = ({ onScan, onClose }) => {
    const [error, setError] = useState<string | null>(null);

    return (
        <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50 p-4">
            <div className="w-full max-w-sm aspect-square border-4 border-blue-500 rounded-lg relative overflow-hidden bg-black mb-6">
                {error ? (
                    <div className="w-full h-full flex flex-col items-center justify-center text-red-400 p-4 text-center">
                        <p className="font-bold mb-2">Errore Fotocamera</p>
                        <p className="text-sm">{error}</p>
                    </div>
                ) : (
                    <Scanner
                        onScan={(result) => {
                            if (result && result.length > 0) {
                                // @yudiel/react-qr-scanner returns an array of results
                                const rawValue = result[0].rawValue;
                                if (rawValue) {
                                    onScan(rawValue);
                                }
                            }
                        }}
                        onError={(err) => {
                            console.error(err);
                            setError("Impossibile accedere alla fotocamera. Verifica i permessi.");
                        }}
                        components={{
                            onOff: true,        // Allow turning off
                            torch: true,        // Allow flashlight
                            zoom: true,         // Allow zoom
                            finder: false       // We have our own border, but default finder is okay too
                        }}
                        styles={{
                            container: { width: '100%', height: '100%' }
                        }}
                        formats={['qr_code']}
                    />
                )}
            </div>

            <p className="text-white text-lg font-medium mb-8">Inquadra il QR Code</p>

            <button
                onClick={onClose}
                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-full"
            >
                Chiudi
            </button>
        </div>
    );
};
