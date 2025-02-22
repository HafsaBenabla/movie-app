import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Movie from './models/Movie.js';

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = 'mongodb+srv://admin:admin@cluster0.bedq1.mongodb.net/filmsdb?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/movies', async (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    description: req.body.description,
    posterUrl: req.body.posterUrl,
    rating: req.body.rating,
    trailerUrl: req.body.trailerUrl
  });

  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add some initial movies
const addInitialMovies = async () => {
  try {
    const count = await Movie.countDocuments();
    if (count === 0) {
      const initialMovies = [
        {
          title: "Inception",
          description: "Un voleur expérimenté dans l'art de l'extraction de secrets en s'immisçant dans les rêves.",
          posterUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
          rating: 8.8,
          trailerUrl: "https://www.youtube.com/embed/YoHD9XEInc0"
        },
        {
          title: "The Dark Knight",
          description: "Batman s'allie au procureur Harvey Dent pour démanteler le crime organisé à Gotham.",
          posterUrl: "https://image.tmdb.org/t/p/w500/1hRoyzDtpgMU7Dz4JF22RANzQO7.jpg",
          rating: 9.0,
          trailerUrl: "https://www.youtube.com/embed/EXeTwQWrcwY"
        },
        {
          title: "Interstellar",
          description: "Un groupe d'explorateurs utilise une faille dans l'espace-temps pour sauver l'humanité.",
          posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
          rating: 8.6,
          trailerUrl: "https://www.youtube.com/embed/zSWdZVtXT7E"
        }
      ];

      await Movie.insertMany(initialMovies);
      console.log('Initial movies added successfully');
    }
  } catch (error) {
    console.error('Error adding initial movies:', error);
  }
};

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  addInitialMovies();
});
