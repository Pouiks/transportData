const express = require('express');
const app = express();

// Middleware pour parser les données JSON
app.use(express.json());
app.use(cors({
    origin: '*', // Permet toutes les origines
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Autorise toutes les méthodes
    allowedHeaders: ['Content-Type', 'Authorization'] // Autorise des en-têtes spécifiques
}));
// Route POST pour logger les données reçues
app.post('/log', (req, res) => {
    console.log('Donnée reçue:', req.body); // Log les données dans la console
    res.status(200).send('Donnée reçue et loggée.');
});

// Lancer le serveur
const PORT = 3000; // Choisissez un port
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
