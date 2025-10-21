import { useEffect, useState } from "react";
import Slider from "react-slick";
import { getTrendingMovies } from "../services/movieService";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


export default function Home() {
  const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchTrending = async () => {
        setLoading(true);
        const data = await getTrendingMovies();
        setMovies(data.results || []);
        setLoading(false);
      };
  
      fetchTrending();
    }, []);

    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 800,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: false,
    };

  return (
  <div className="p-4">
     {/* Slideshow*/}
    <div className="w-full">
      <Slider {...sliderSettings}>
        {movies.slice(0, 5).map((movie) => (
          <div key={movie.id} className="relative">
            <img 
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-[400px] object-cover rounded-xl shadow-lg" 
            />
            <h3 className="absolute bottom-4 left-4 text-2xl text-white font-bold shadow-md">
              {movie.title}
            </h3>
          </div>
        ))}
      </Slider>
      </div>
    </div>
  );
}
