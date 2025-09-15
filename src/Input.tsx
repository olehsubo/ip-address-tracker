import { useState } from 'react';
import type { IpifyResult } from './types/ipify';

function looksLikeIp(q: string) {
  const v4 = /^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/;
  const v6 = q.includes(':'); // simple heuristic
  return v4.test(q) || v6;
}

async function extractErrorMessage(res: Response) {
  const defaultMsg = `Request failed (${res.status})`;
  const contentType = res.headers.get('content-type') || '';

  try {
    if (contentType.includes('application/json')) {
      const body = await res.json();
      if (body) {
        const messages = Array.isArray(body.messages)
          ? body.messages.filter(Boolean)
          : undefined;
        if (messages?.length) return messages[0] as string;
        if (typeof body.message === 'string' && body.message.trim()) {
          return body.message.trim();
        }
      }
    } else {
      const text = await res.text();
      if (text.trim()) return text.trim();
    }
  } catch (e) {
    console.error('Failed to parse error response', e);
  }

  if (res.status === 422) {
    return 'No results found for that domain or IP. Double-check and try again.';
  }

  return defaultMsg;
}

export default function SearchInput({
  onResult
}: {
  onResult: (data: IpifyResult | null) => void;
}) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const apiKey = import.meta.env.VITE_IPIFY_KEY as string | undefined;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    if (!query.trim()) return setErr('Please enter a domain or IP address.');
    if (!apiKey) return setErr('Missing API key (VITE_IPIFY_KEY).');

    setLoading(true);
    try {
      const isIp = looksLikeIp(query.trim());
      const params = new URLSearchParams({
        apiKey,
        ...(isIp ? { ipAddress: query.trim() } : { domain: query.trim() })
      });

      const url = `https://geo.ipify.org/api/v2/country,city?${params.toString()}`;

      const res = await fetch(url);
      if (!res.ok) {
        const message = await extractErrorMessage(res);
        throw new Error(message);
      }
      const data = (await res.json()) as IpifyResult;

      console.log('IPIFY RESULT:', data);
      onResult(data);
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : 'Request failed';
      setErr(message);
      onResult(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className='w-full max-w-xl mx-auto lg:mx-0'>
      <div className='join w-full shadow-[0_20px_45px_rgba(15,118,255,0.15)]'>
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search for any IP address or domain'
          className='input join-item w-full border border-white/15 bg-white/10 text-lg text-white placeholder-white/60 backdrop-blur focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/40'
          aria-label='IP or domain'
        />
        <button
          type='submit'
          className='btn join-item border-0 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 px-8 text-lg font-semibold text-white shadow-[0_12px_30px_rgba(56,189,248,0.35)] hover:from-sky-300 hover:via-blue-400 hover:to-indigo-400'
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {err && (
        <p
          className='mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-rose-200 backdrop-blur'
          role='alert'
        >
          <span aria-hidden='true'>⚠️</span>
          {err}
        </p>
      )}
    </form>
  );
}
