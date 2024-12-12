import React from 'react';
import { motion } from 'framer-motion';
import { WeatherIcon } from './WeatherIcon';
import { getDayName } from '../utils/dateUtils';

interface ForecastCardProps {
  data: {
    dt_txt: string;
    main: {
      temp: number;
      humidity: number;
    };
    weather: Array<{
      main: string;
      description: string;
    }>;
    wind: {
      speed: number;
    };
  };
  index: number;
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ data, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
    >
      <div className="text-center">
        <p className="text-lg font-semibold text-gray-700">{getDayName(data.dt_txt)}</p>
        <WeatherIcon condition={data.weather[0].main} className="w-12 h-12 mx-auto my-2 text-blue-500" />
        <p className="text-2xl font-bold">{Math.round(data.main.temp)}°C</p>
        <p className="text-sm text-gray-600 capitalize">{data.weather[0].description}</p>
      </div>
    </motion.div>
  );
};