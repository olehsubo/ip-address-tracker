import { useEffect } from 'react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import type { IpifyResult } from './types/ipify';
import type { LatLngExpression } from 'leaflet';
import L from 'leaflet';

const markerIcon = L.divIcon({
  className: 'ip-marker',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
  html: `<span class="ip-marker__pin"></span><span class="ip-marker__pulse"></span>`
});

function MapViewUpdater({ center }: { center: LatLngExpression }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, map.getZoom(), {
      animate: true,
      duration: 1.1
    });
  }, [map, center]);

  return null;
}

export default function MapView({ data }: { data: IpifyResult | null }) {
  const lat = data?.location?.lat;
  const lng = data?.location?.lng;

  if (typeof lat !== 'number' || typeof lng !== 'number') {
    return (
      <section className='relative flex min-h-[320px] flex-1 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white lg:min-h-screen'>
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.3),_transparent_55%)] opacity-80' />
        <div className='relative z-10 max-w-sm rounded-3xl border border-white/10 bg-white/5 px-8 py-10 text-center backdrop-blur'>
          <h2 className='text-lg font-semibold tracking-wide text-white/80'>Awaiting coordinates</h2>
          <p className='mt-3 text-sm text-white/60'>
            Search for a valid IP address or domain to explore its location on the map.
          </p>
        </div>
      </section>
    );
  }

  const center = [lat, lng] as LatLngExpression;

  return (
    <section className='relative flex min-h-[320px] flex-1 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white lg:min-h-screen'>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.32),_transparent_60%)] opacity-90' />
      <MapContainer
        center={center}
        zoom={13}
        zoomControl={false}
        scrollWheelZoom
        className='relative z-10 h-full w-full'
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        />
        <Marker position={center} icon={markerIcon} />
        <MapViewUpdater center={center} />
      </MapContainer>
    </section>
  );
}
