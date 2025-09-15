import { useState } from 'react';
import SearchInput from './Input';
import ResultCards from './ResultCards';
import MapView from './MapView';
import type { IpifyResult } from './types/ipify';

function App() {
  const [result, setResult] = useState<IpifyResult | null>(null);

  return (
    <main className='min-h-screen bg-slate-950 text-white'>
      <div className='grid min-h-screen lg:grid-cols-2'>
        <section className='hero-bg flex flex-col items-center justify-center px-6 py-14 sm:px-10 lg:items-start lg:min-h-screen lg:px-16 min-h-[70vh]'>
          <div className='w-full max-w-xl space-y-10 text-center lg:text-left'>
            <div className='space-y-3'>
              <p className='text-sm uppercase tracking-[0.4em] text-white/60'>Locate anywhere</p>
              <h1 className='text-4xl font-semibold leading-tight text-white sm:text-5xl'>
                IP Address Tracker
              </h1>
              <p className='text-base text-white/70'>
                Discover network details and visualize the location of any valid IP address or domain in real time.
              </p>
            </div>
            <SearchInput onResult={setResult} />
            <ResultCards data={result} />
          </div>
        </section>

        <MapView data={result} />
      </div>
    </main>
  );
}

export default App;
