const express = require('express');
const app = express();

// Middleware pour parser les données JSON
app.use(express.json());

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
