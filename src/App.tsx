import { useState } from 'react';
import SearchInput from './Input';
import ResultCards from './ResultCards';
import type { IpifyResult } from './types/ipify';

function App() {
  const [result, setResult] = useState<IpifyResult | null>(null);

  return (
    <main className='hero-bg grid place-items-center'>
      <h1 className='text-3xl font-bold text-white'>IP Address Tracker</h1>
      <SearchInput onResult={setResult} />
      <ResultCards data={result} />
    </main>
  );
}

export default App;
