import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function App() {
  const [movie, setMovie] = useState("");
  const [movieTitle, setMovieTitle] = useState("");
  const [moviePoster, setMoviePoster] = useState("");
  const [movieDesc, setMovieDesc] = useState("");
  const [movieimdbRating, setMovieimdbRating] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchMovie = (movieName) => {
    setLoading(true);
    const apiUrl = `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}`;
    const url = `${apiUrl}&t=${movieName}`;
  

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.Title) {
        setMovieTitle(data.Title)
        setMoviePoster(data.Poster)
        setMovieDesc(data.Plot)
        setMovieimdbRating(`IMDb Rating: ${data.imdbRating}`)

      } else {
        setMovieTitle("Movie not found")
      }
      setLoading(false);
    });
  }

  const handleSearchClick = () => {
    if (movie) {
      fetchMovie(movie);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearchClick();
    }
  }

  return (
    <div>
      <div className="container text-white p-4">
      <h1 className='Title'>Movie Library</h1>
        <input className='w-full movieInput' autoComplete='off' autoFocus="on" type="text" id='movieInput'
        value={movie}
        onChange={(e) => setMovie(e.target.value)}
        onKeyDown={handleKeyPress}
        />
        <button id='movieBtn' className='w-full text-black movieBtn' onClick={handleSearchClick}>Search Movie</button>

        {loading && <p className='loadingText'>Loading movie...</p>}
        {!loading && movieTitle && (<>

        <p className='movieTitle'>{movieTitle}</p>
        <div className='movieContainer'>
        <img className='moviePoster' src={moviePoster} alt="" />
        <div className='movieDescContainer'>
        <p className='movieDesc'>{movieDesc}</p>
        {movieimdbRating && <p className='imdbRating'>{movieimdbRating}</p>}

        </div>
            </div>
            </>
        )}
        </div>
</div>
  )
}

export default App
