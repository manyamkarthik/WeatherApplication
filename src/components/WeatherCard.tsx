import React from 'react';
import { motion } from 'framer-motion';
import { WeatherIcon } from './WeatherIcon';
import { WeatherData } from '../types/weather';
import { formatTime } from '../utils/dateUtils';
import { Droplets, Wind, Thermometer, Compass } from 'lucide-react';

interface WeatherCardProps {
  data: WeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  const getWindDirection = (deg: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(deg / 45) % 8];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-md bg-white/10 rounded-xl p-6 text-white shadow-lg"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold"
          >
            {data.name}, {data.sys.country}
          </motion.h2>
          <div className="flex items-center mt-2 text-white/80">
            <span>Sunrise: {formatTime(data.sys.sunrise)}</span>
            <span className="mx-2">•</span>
            <span>Sunset: {formatTime(data.sys.sunset)}</span>
          </div>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <WeatherIcon condition={data.weather[0].main} className="w-20 h-20" />
        </motion.div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <Thermometer className="w-8 h-8 text-red-300" />
            </div>
            <div>
              <p className="text-5xl font-bold">{Math.round(data.main.temp)}°C</p>
              <p className="text-white/80">Feels like {Math.round(data.main.feels_like)}°C</p>
            </div>
          </div>
          <p className="text-xl capitalize">{data.weather[0].description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <Droplets className="w-6 h-6 text-blue-300" />
            </div>
            <div>
              <p className="text-2xl font-semibold">{data.main.humidity}%</p>
              <p className="text-white/80">Humidity</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <Wind className="w-6 h-6 text-green-300" />
            </div>
            <div>
              <p className="text-2xl font-semibold">{data.wind.speed} m/s</p>
              <div className="flex items-center space-x-2">
                <Compass className="w-4 h-4" />
                <span className="text-white/80">{getWindDirection(data.wind.deg)}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};