import type { IpifyResult } from './types/ipify';

function formatLocation(loc?: IpifyResult['location']) {
  if (!loc) return '—';
  const parts = [loc.region, loc.country].filter(Boolean);
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
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <article className='card bg-base-200 shadow'>
          <div className='card-body'>
            <h3 className='card-title text-sm uppercase tracking-wide text-neutral-200'>
              IP Address
            </h3>
            <p className='text-2xl text-emerald-400 font-bold break-all'>
              {ip}
            </p>
          </div>
        </article>

        <article className='card bg-base-200 shadow'>
          <div className='card-body'>
            <h3 className='card-title text-sm uppercase tracking-wide text-neutral-200'>
              Location
            </h3>
            <p className='text-2xl text-emerald-400 font-bold'>{location}</p>
          </div>
        </article>

        <article className='card bg-base-200 shadow'>
          <div className='card-body'>
            <h3 className='card-title text-sm uppercase tracking-wide text-neutral-200'>
              Timezone
            </h3>
            <p className='text-2xl text-emerald-400 font-bold'>{timezone}</p>
          </div>
        </article>

        <article className='card bg-base-200 shadow'>
          <div className='card-body'>
            <h3 className='card-title text-sm uppercase tracking-wide text-neutral-200'>
              ISP
            </h3>
            <p className='text-2xl text-emerald-400 font-bold'>{isp}</p>
            {data.as?.name && (
              <p className='text-sm text-neutral-200 mt-1'>{data.as.name}</p>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}
