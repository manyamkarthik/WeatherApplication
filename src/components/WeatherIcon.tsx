import React from 'react';
import { Cloud, CloudRain, CloudSnow, Sun, CloudLightning } from 'lucide-react';

interface WeatherIconProps {
  condition: string;
  className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, className = "w-8 h-8" }) => {
  const getIcon = () => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun className={className} />;
      case 'clouds':
        return <Cloud className={className} />;
      case 'rain':
        return <CloudRain className={className} />;
      case 'snow':
        return <CloudSnow className={className} />;
      case 'thunderstorm':
        return <CloudLightning className={className} />;
      default:
        return <Cloud className={className} />;
    }
  };

  return getIcon();
};