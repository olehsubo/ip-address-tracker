import type { IpifyResult } from './types/ipify';

function formatLocation(loc?: IpifyResult['location']) {
  if (!loc) return '—';
  const parts = [loc.city, loc.region, loc.country].filter(Boolean);
  return parts.length ? parts.join(', ') : '—';
}

function formatTimezone(tz?: string) {
  if (!tz) return '—';
  // Show as "UTC -07:00"
  return `UTC ${tz}`;
}

export default function ResultCards({ data }: { data: IpifyResult | null }) {
  if (!data) return null;

  const ip = data.ip ?? '—';
  const location = formatLocation(data.location);
  const timezone = formatTimezone(data.location?.timezone);
  const isp = data.isp ?? data.as?.name ?? '—';

  return (
    <section className='mt-6'>
      <div className='grid gap-4 grid-cols-2'>
        <article className='rounded-3xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur'>
          <h3 className='text-xs uppercase tracking-[0.35em] text-white/50'>
            IP Address
          </h3>
          <p className='mt-3 text-l font-semibold text-white/90 break-all'>
            {ip}
          </p>
        </article>

        <article className='rounded-3xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur'>
          <h3 className='text-xs uppercase tracking-[0.35em] text-white/50'>
            Location
          </h3>
          <p className='mt-3 text-l font-semibold text-white/90'>{location}</p>
        </article>

        <article className='rounded-3xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur'>
          <h3 className='text-xs uppercase tracking-[0.35em] text-white/50'>
            Timezone
          </h3>
          <p className='mt-3 text-l font-semibold text-white/90'>{timezone}</p>
        </article>

        <article className='rounded-3xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur'>
          <h3 className='text-xs uppercase tracking-[0.35em] text-white/50'>
            ISP
          </h3>
          <p className='mt-3 text-l font-semibold text-white/90'>{isp}</p>
          {data.as?.name && (
            <p className='mt-2 text-sm text-white/60'>{data.as.name}</p>
          )}
        </article>
      </div>
    </section>
  );
}
