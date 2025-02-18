const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion MongoDB
mongoose.connect('mongodb+srv://admin:admin@cluster0.bedq1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

// Modèle Film
const Film = mongoose.model('Film', {
    titre: String,
    description: String,
    image: String,
    note: Number
});

// Route pour obtenir tous les films
app.get('/api/films', async (req, res) => {
    try {
        const films = await Film.find();
        res.json(films);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// Route pour ajouter un film
app.post('/api/films', async (req, res) => {
    try {
        const film = new Film(req.body);
        await film.save();
        res.json({ message: "Film ajouté" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// Route pour supprimer un film
app.delete('/api/films/:id', async (req, res) => {
    try {
        await Film.findByIdAndDelete(req.params.id);
        res.json({ message: "Film supprimé" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// Démarrer le serveur
app.listen(8000, () => {
    console.log('Serveur démarré sur http://localhost:8000');
});
