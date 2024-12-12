import React from 'react';
import { motion } from 'framer-motion';
import { WeatherIcon } from './WeatherIcon';
import { WeatherData } from '../types/weather';
import { formatTime } from '../utils/dateUtils';
import { Droplets, Wind, Thermometer } from 'lucide-react';

interface CurrentWeatherProps {
  data: WeatherData;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6 mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{data.name}, {data.sys.country}</h2>
          <p className="text-gray-600">
            {formatTime(data.sys.sunrise)} - {formatTime(data.sys.sunset)}
          </p>
        </div>
        <WeatherIcon condition={data.weather[0].main} className="w-16 h-16 text-blue-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center">
            <Thermometer className="w-6 h-6 text-red-500 mr-2" />
            <div>
              <p className="text-4xl font-bold">{Math.round(data.main.temp)}°C</p>
              <p className="text-gray-600">Feels like {Math.round(data.main.feels_like)}°C</p>
            </div>
          </div>
          <p className="text-xl text-gray-700 capitalize">{data.weather[0].description}</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <Droplets className="w-6 h-6 text-blue-500 mr-2" />
            <div>
              <p className="text-lg">Humidity</p>
              <p className="text-2xl font-semibold">{data.main.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center">
            <Wind className="w-6 h-6 text-green-500 mr-2" />
            <div>
              <p className="text-lg">Wind Speed</p>
              <p className="text-2xl font-semibold">{data.wind.speed} m/s</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};