import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaHeart, FaPlay } from 'react-icons/fa';

const API_KEY = '98d79a7251b4050b7449d0443748f383';
const TMDB_API_URL = 'https://api.themoviedb.org/3';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get(`${TMDB_API_URL}/movie/${id}`, {
          params: {
            api_key: API_KEY,
            language: 'fr-FR'
          }
        });

        const videosResponse = await axios.get(`${TMDB_API_URL}/movie/${id}/videos`, {
          params: {
            api_key: API_KEY
          }
        });

        const trailerVideo = videosResponse.data.results.find(
          video => video.type === 'Trailer' && video.site === 'YouTube'
        );

        setMovie({
          ...movieResponse.data,
          posterUrl: `https://image.tmdb.org/t/p/original${movieResponse.data.backdrop_path}`
        });
        
        if (trailerVideo) {
          setTrailer(trailerVideo.key);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div className="text-center p-4">Chargement...</div>;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Image de fond avec overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent"></div>
      </div>

      {/* Contenu */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <nav className="flex items-center space-x-6 text-white/80 mb-8">
          <button onClick={() => navigate('/')} className="hover:text-white">
            ABOUT
          </button>
          <button className="hover:text-white">VIDEOS</button>
          <button className="hover:text-white">FEATURED</button>
          <button className="hover:text-white">GALLERY</button>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-6xl font-bold mb-6">{movie.title}</h1>
            <p className="text-lg text-white/80 mb-8">{movie.overview}</p>
            
            <div className="space-y-4 mb-8">
              <div>
                <h3 className="text-white/60 uppercase text-sm">PREMIERE</h3>
                <p>{new Date(movie.release_date).toLocaleDateString('fr-FR')}</p>
              </div>
              <div>
                <h3 className="text-white/60 uppercase text-sm">DIRECTOR</h3>
                <p>Todd Phillips</p>
              </div>
              <div>
                <h3 className="text-white/60 uppercase text-sm">GENRE</h3>
                <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold flex items-center space-x-2 hover:bg-gray-200 transition">
                <FaPlay className="text-sm" />
                <span>WATCH TRAILER</span>
              </button>
              <button className="border border-white/30 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition">
                LEARN MORE
              </button>
            </div>
          </div>

          {trailer && (
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${trailer}`}
                title="Movie Trailer"
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>

        <div className="absolute bottom-8 right-8 flex items-center space-x-4 text-white/60">
          <span>FOLLOW US</span>
          <div className="flex space-x-2">
            <a href="#" className="hover:text-white">FB</a>
            <a href="#" className="hover:text-white">IG</a>
            <a href="#" className="hover:text-white">TW</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
