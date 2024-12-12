import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="w-full px-4 py-3 pl-12 rounded-full bg-white/10 backdrop-blur-md 
                   text-white placeholder-white/70 border border-white/20
                   focus:outline-none focus:ring-2 focus:ring-white/50"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2
                   px-4 py-1.5 bg-white/20 text-white rounded-full
                   hover:bg-white/30 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
};