import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { WeatherData } from '../types/weather';
import L from 'leaflet';

// Fix for default marker icon

delete (L.Icon.Default.prototype as any )._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to handle map updates
const MapUpdater: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  
  useEffect(() => {
    // Fly to new location with animation
    map.flyTo(center, 10, {
      duration: 2, // Animation duration in seconds
      easeLinearity: 0.25
    });
  }, [center, map]);

  return null;
};

interface WeatherMapProps {
  weather: WeatherData;
}

export const WeatherMap: React.FC<WeatherMapProps> = ({ weather }) => {
  const mapRef = useRef<L.Map>(null);
  const center: [number, number] = [weather.coord.lat, weather.coord.lon];

  return (
    <div className="h-[400px] w-full rounded-xl overflow-hidden shadow-lg">
      <MapContainer
        center={center}
        zoom={10}
        className="h-full w-full"
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center}>
          <Popup>
            <div className="text-center">
              <h3 className="font-semibold">{weather.name}</h3>
              <p>{Math.round(weather.main.temp)}°C</p>
              <p className="capitalize">{weather.weather[0].description}</p>
            </div>
          </Popup>
        </Marker>
        <MapUpdater center={center} />
      </MapContainer>
    </div>
  );
};