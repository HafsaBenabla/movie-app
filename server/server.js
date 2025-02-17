const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect('mongodb+srv://admin:admin@cluster0.bedq1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

// Modèle de film
const Film = mongoose.model('Film', {
    titre: String,
    description: String,
    image: String,
    dateAjout: { type: Date, default: Date.now },
    note: { type: Number, default: 0 }
});

// Route pour récupérer tous les films
app.get('/api/films', (req, res) => {
    Film.find()
        .sort({ dateAjout: -1 }) // Du plus récent au plus ancien
        .then(films => res.json(films))
        .catch(err => res.status(500).json({ message: "Erreur lors de la récupération des films" }));
});

// Route pour ajouter un film
app.post('/api/films', (req, res) => {
    const film = new Film({
        titre: req.body.titre,
        description: req.body.description,
        image: req.body.image,
        note: req.body.note || 0
    });

    film.save()
        .then(filmSauvegarde => {
            res.status(201).json({
                message: "Film ajouté avec succès",
                film: filmSauvegarde
            });
        })
        .catch(err => {
            res.status(500).json({ message: "Erreur lors de l'ajout du film" });
        });
});

// Route pour supprimer un film
app.delete('/api/films/:id', (req, res) => {
    Film.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: "Film supprimé avec succès" }))
        .catch(err => res.status(500).json({ message: "Erreur lors de la suppression" }));
});

app.listen(5000, () => {
    console.log('Serveur démarré sur http://localhost:5000');
    console.log('API disponible sur http://localhost:5000/api/films');
});
