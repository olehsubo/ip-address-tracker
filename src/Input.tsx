import { useState } from 'react';

/**
 * Detect if the query looks like an IP (v4/v6) vs. domain.
 * We keep this forgiving; the API will still validate.
 */
function looksLikeIp(q: string) {
  // IPv4 quick check
  const v4 = /^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/;
  // IPv6 (very loose)
  const v6 = /^[0-9a-fA-F:]+$/ && q.includes(':');
  return v4.test(q) || v6;
}

export default function SearchInput() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const apiKey = import.meta.env.VITE_IPIFY_KEY as string | undefined;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    if (!query.trim()) {
      setErr('Please enter a domain or IP address.');
      return;
    }
    if (!apiKey) {
      setErr('Missing API key. Set VITE_IPIFY_KEY in your .env.');
      return;
    }

    setLoading(true);
    try {
      // Choose param based on query
      const isIp = looksLikeIp(query.trim());
      const params = new URLSearchParams({
        apiKey,
        ...(isIp ? { ipAddress: query.trim() } : { domain: query.trim() })
      });

      // country endpoint (as in your example). You can also use /country,city
      const url = `https://geo.ipify.org/api/v2/country?${params.toString()}`;

      const res = await fetch(url);
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`${res.status} ${res.statusText}: ${text}`);
      }
      const data = await res.json();

      console.log('IPIFY RESULT:', data); // <- requested behavior for now
    } catch (e: any) {
      console.error(e);
      setErr(e?.message ?? 'Request failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className='w-full max-w-xl mx-auto'>
      <div className='join w-full shadow-lg'>
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search for any IP address or domain'
          className='input input-bordered join-item w-full text-lg placeholder-gray-400 focus:outline-none focus:border-primary text-white'
          aria-label='IP or domain'
        />
        <button
          type='submit'
          className='btn btn-primary join-item px-8 text-lg font-medium'
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {err && (
        <p className='mt-2 text-sm text-red-500' role='alert'>
          {err}
        </p>
      )}
    </form>
  );
}
