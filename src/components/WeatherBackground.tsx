import React from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Moon } from 'lucide-react';

interface WeatherBackgroundProps {
  condition: string;
  isNight: boolean;
}

export const WeatherBackground: React.FC<WeatherBackgroundProps> = ({ condition, isNight }) => {
  const getBackgroundClass = () => {
    if (isNight) return 'from-indigo-900 via-purple-900 to-slate-900';
    
    switch (condition.toLowerCase()) {
      case 'clear':
        return 'from-blue-400 via-sky-500 to-blue-600';
      case 'clouds':
        return 'from-gray-400 via-gray-500 to-gray-600';
      case 'rain':
        return 'from-blue-700 via-blue-800 to-gray-900';
      case 'snow':
        return 'from-blue-100 via-blue-200 to-gray-200';
      case 'thunderstorm':
        return 'from-gray-700 via-purple-900 to-gray-900';
      default:
        return 'from-blue-500 via-blue-600 to-blue-700';
    }
  };

  const renderWeatherParticles = () => {
    const particles = [];
    const count = 20;

    for (let i = 0; i < count; i++) {
      const delay = Math.random() * 2;
      const size = Math.random() * 0.5 + 0.5;
      const left = `${Math.random() * 100}%`;
      const opacity = Math.random() * 0.3 + 0.1;

      particles.push(
        <div
          key={i}
          className="absolute animate-float"
          style={{
            left,
            top: '-20%',
            opacity,
            animation: `float ${10 + Math.random() * 10}s linear ${delay}s infinite`,
            transform: `scale(${size})`,
          }}
        >
          {condition.toLowerCase() === 'clear' && !isNight && <Sun className="text-yellow-200" />}
          {condition.toLowerCase() === 'clouds' && <Cloud className="text-white" />}
          {condition.toLowerCase() === 'rain' && <CloudRain className="text-blue-200" />}
          {condition.toLowerCase() === 'snow' && <CloudSnow className="text-white" />}
          {condition.toLowerCase() === 'thunderstorm' && <CloudLightning className="text-yellow-100" />}
          {isNight && <Moon className="text-yellow-100" />}
        </div>
      );
    }

    return particles;
  };

  return (
    <div className={`fixed inset-0 bg-gradient-to-br ${getBackgroundClass()} -z-10`}>
      <div className="absolute inset-0 overflow-hidden">
        {renderWeatherParticles()}
      </div>
    </div>
  );
};