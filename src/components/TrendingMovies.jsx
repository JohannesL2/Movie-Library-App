import React from 'react'

export default function TrendingMovies({movies, onSelect}) {
  return (
    <div className='trending-container'>
      <h2>Trending Movies</h2>
      <div className='trending-grid'>
        {movies.map((m) => (
          <div key={m.id} className='trending-movie' onClick={() => onSelect(m.title)}>
            <img src={`https://image.tmdb.org/t/p/w500${m.poster_path}`} alt="" />
            <p>{m.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}