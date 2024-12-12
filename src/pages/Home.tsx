import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SearchBar } from '../components/SearchBar';
import { WeatherCard } from '../components/WeatherCard';
import { WeatherBackground } from '../components/WeatherBackground';
import { WeatherMap } from '../components/WeatherMap';
import { Footer } from '../components/Footer';
import { weatherApi } from '../services/weatherApi';
import { WeatherData } from '../types/weather';
import { MapPin, Calendar } from 'lucide-react';

export const Home = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isNight, setIsNight] = useState(false);

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await weatherApi.getCurrentWeather(city);
      setWeather(data);
      checkIfNight(data.sys.sunrise, data.sys.sunset);
    } catch  {
      setError('City not found. Please try again.');
    }
    setLoading(false);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const data = await weatherApi.getWeatherByLocation(
              position.coords.latitude,
              position.coords.longitude
            );
            setWeather(data);
            checkIfNight(data.sys.sunrise, data.sys.sunset);
            setLoading(false);
          } catch  {
            setError('Error fetching weather data.');
            setLoading(false);
          }
        },
        () => {
          setError('Location access denied. Please search for a city.');
          setLoading(false);
        }
      );
    }
  };

  const checkIfNight = (sunrise: number, sunset: number) => {
    const now = Math.floor(Date.now() / 1000);
    setIsNight(now < sunrise || now > sunset);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col">
      {weather && (
        <WeatherBackground 
          condition={weather.weather[0].main} 
          isNight={isNight} 
        />
      )}
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <motion.header 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold text-white mb-2">WeatherScope</h1>
          <p className="text-white/80 mb-8">Your Personal Weather Companion</p>
          <SearchBar onSearch={handleSearch} />
        </motion.header>

        {loading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
          </div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-500/20 backdrop-blur-md text-white p-4 rounded-lg text-center max-w-md mx-auto"
          >
            {error}
          </motion.div>
        )}

        {weather && (
          <div className="max-w-4xl mx-auto space-y-8">
            <WeatherCard data={weather} />
            
            <motion.div 
              className="flex justify-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                to={`/forecast/${weather.name}`}
                className="flex items-center px-6 py-3 rounded-full
                         bg-white/10 backdrop-blur-md text-white
                         hover:bg-white/20 transition-colors"
              >
                <Calendar className="w-5 h-5 mr-2" />
                5-Day Forecast
              </Link>
              <button
                onClick={getCurrentLocation}
                className="flex items-center px-6 py-3 rounded-full
                         bg-white/10 backdrop-blur-md text-white
                         hover:bg-white/20 transition-colors"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Use My Location
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-2xl font-semibold text-white mb-4">Location Map</h2>
              <WeatherMap weather={weather} />
            </motion.div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};