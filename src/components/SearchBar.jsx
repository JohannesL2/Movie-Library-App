import PropTypes from 'prop-types';
import { useState } from 'react';

export default function SearchBar({ movie, setMovie, suggestions, setSuggestions, fetchMovie }) {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (movie.trim()) {
      fetchMovie(movie);
      setMovie("");
      setSuggestions([]);
      setHighlightedIndex(-1);
    }
  };

  const handleSelect = (title) => {
    fetchMovie(title);
    setMovie('');
    setSuggestions([]);
    setHighlightedIndex(-1);
  }

  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => 
      prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => 
      prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[highlightedIndex].title);
    } else if (e.key === 'Escape') {
      setSuggestions([]);
      setHighlightedIndex(-1);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='Search for a movie...'
          className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400'
          />
      </form>

      {suggestions.length > 0 && (
        <ul className='absolute z-10 w-full bg-transparent border border-gray-300 rounded-lg mt-1 shadow-lg'>
          {suggestions.map((s, index) => (
            <li
              key={s.id}
              onClick={() => handleSelect(s.title)}
              className={`p-2 cursor-pointer ${index === highlightedIndex
                ? 'bg-yellow-400 text-black'
                : 'hover:bg-white/5'
              }`}
            >
              {s.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

SearchBar.propTypes = {
  movie: PropTypes.string.isRequired,
  setMovie: PropTypes.func.isRequired,
  suggestions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    })
  ).isRequired,
  setSuggestions: PropTypes.func.isRequired,
  fetchMovie: PropTypes.func.isRequired,
};