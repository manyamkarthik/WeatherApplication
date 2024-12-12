import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ForecastCard } from '../components/ForecastCard';
import { weatherApi } from '../services/weatherApi';
import { ForecastData } from '../types/weather';
import { ArrowLeft } from 'lucide-react';

export const Forecast = () => {
  const { city } = useParams<{ city: string }>();
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForecast = async () => {
      if (!city) return;
      try {
        const data = await weatherApi.getForecast(city);
        // Filter forecast data to show one entry per day
        const dailyData = data.list.filter((item, index) => index % 8 === 0);
        setForecast({ ...data, list: dailyData });
        setLoading(false);
      } catch (err) {
        setError('Error fetching forecast data.');
        setLoading(false);
      }
    };

    fetchForecast();
  }, [city]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center text-white mb-8 hover:text-white/80 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Current Weather
        </Link>

        <h1 className="text-3xl font-bold text-white mb-8">
          5-Day Forecast for {city}
        </h1>

        {loading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
          </div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-500/20 backdrop-blur-md text-white p-4 rounded-lg text-center"
          >
            {error}
          </motion.div>
        )}

        {forecast && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {forecast.list.map((item, index) => (
              <ForecastCard key={item.dt} data={item} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};