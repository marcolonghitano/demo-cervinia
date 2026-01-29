import { useState } from 'react';
import { CardSearchForm } from './components/CardSearchForm';
import { ResultCard } from './components/ResultCard';
import { QrScanner } from './components/QrScanner';
import { fetchCardStatus } from './services/apiClient';
import type { CardStatus } from './services/apiClient';

function App() {
  const [data, setData] = useState<CardStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [searchedCardNumber, setSearchedCardNumber] = useState<string>("");

  const handleSearch = async (cardNumber: string) => {
    setLoading(true);
    setError(null);
    setData(null);
    setSearchedCardNumber(cardNumber);
    try {
      const result = await fetchCardStatus(cardNumber);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Si è verificato un errore');
    } finally {
      setLoading(false);
    }
  };

  const handleScan = async (qrData: string) => {
    setIsScanning(false);
    setLoading(true);
    setError(null);
    setData(null);
    try {
      // In this real version, onScan gives us the raw string.
      const cardNumber = qrData.trim();
      setSearchedCardNumber(cardNumber);
      // Only 8 digits allowed in our domain
      if (cardNumber.length < 8) {
        setError("QR Code non valido (codice troppo corto)");
        return;
      }

      const result = await fetchCardStatus(cardNumber);
      setData(result);
    } catch (err) {

      setError(err instanceof Error ? err.message : 'Errore scansione');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center bg-gradient-to-b from-snow-900 to-snow-800 text-snow-50">

      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Snowit Rescue</h1>
        <p className="text-snow-100 opacity-80">Verifica Skipass e Assicurazione</p>
      </header>

      <main className="w-full flex flex-col items-center justify-center gap-6">

        {error && (
          <div className="w-full max-w-md bg-red-500/10 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {!data && !isScanning && (
          <CardSearchForm
            onSearch={handleSearch}
            onScanClick={() => setIsScanning(true)}
            isLoading={loading}
          />
        )}

        {isScanning && (
          <QrScanner
            onScan={handleScan}
            onClose={() => setIsScanning(false)}
          />
        )}

        {data && (
          <ResultCard data={data} searchedCardNumber={searchedCardNumber} onReset={reset} />
        )}

      </main>

      <footer className="mt-12 text-sm text-snow-700">
        &copy; {new Date().getFullYear()} Snowit Rescue Checker
      </footer>
    </div>
  );
}

export default App;
