import PropTypes from 'prop-types';

export default function SearchBar({ movie, setMovie, suggestions, setSuggestions, fetchMovie }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (movie.trim()) {
      fetchMovie(movie);
      setMovie("");
      setSuggestions([]);
    }
  };

  const handleSelect = (title) => {
    fetchMovie(title);
    setMovie('');
    setSuggestions([]);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
          placeholder='Search for a movie...'
          className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400'
          />
      </form>

      {suggestions.length > 0 && (
        <ul className='absolute z-10 w-full bg-transparent border border-gray-300 rounded-lg mt-1 shadow-lg'>
          {suggestions.map((s) => (
            <li
              key={s.id}
              onClick={() => handleSelect(s.title)}
              className='p-2 cursor-pointer hover:bg-white/5'
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