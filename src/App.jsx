import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import AddMovie from './components/AddMovie';
import Favorites from './components/Favorites';
import { FaHeart } from 'react-icons/fa';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg mb-4">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              Cinema App
            </Link>
            <div className="flex gap-4 items-center">
              <Link
                to="/favorites"
                className="flex items-center gap-2 text-red-500 hover:text-red-600"
              >
                <FaHeart className="text-xl" />
                Favoris
              </Link>
              <Link
                to="/add-movie"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Ajouter un film
              </Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/add-movie" element={<AddMovie />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
