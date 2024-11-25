require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
const { transformData, updateData } = require('./src/controllers/dataController');

// Middleware pour parser les données JSON
app.use(express.json());
app.use(cors({
    origin: '*', // Permet toutes les origines
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Autorise toutes les méthodes
    allowedHeaders: ['Content-Type', 'Authorization'] // Autorise des en-têtes spécifiques
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '100mb' })); // Augmente la limite à 100 Mo
app.use(express.urlencoded({ limit: '100mb', extended: true }));
// app.use(express.limit('100M'));
// Route POST pour logger les données reçues
app.post('/log', (req, res) => {
    console.log('Donnée reçue:', req.body); // Log les données dans la console
    res.status(200).send('Donnée reçue et loggée.');
});

// Route POST pour transformer les données
app.post('/transform', transformData);
app.patch('/update', updateData);


// Lancer le serveur
const PORT = 3000; // Choisissez un port
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
