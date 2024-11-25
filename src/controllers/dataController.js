// src/controllers/dataController.js
require('dotenv').config();
const data = require('./data.json')


// Fonction pour transformer les données
const transformData = (req, res) => {
    try {
        // Exemple : Transformation de données reçues
        const inputData = req.body;
        console.log('Donnée recu: ',inputData)

        sendDataToClient(inputData)
    } catch (error) {
        console.error('Erreur dans transformData:', error);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
};

const sendDataToClient = (dataToSend) => {
    fetch(process.env.CLIENT_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.API_KEY

        },
        body: JSON.stringify(dataToSend)
    })
        .then(response => response.json())
        .then(data => console.log('Réponse du client:', data))
        .catch(error => console.error('Erreur lors de l\'envoi des données au client:', error));
}

const updateData = async (req, res) => {
    const inputData = req.body;
    fetch(process.env.CLIENT_URL, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.API_KEY
        },
        body: JSON.stringify(inputData)
    })
        .then(res => res.json())
        .then(data => console.log('Réponse du client:', data))
        .catch(error => console.error('Erreur lors de l\'envoi des données au client:', error));
}



module.exports = { transformData, updateData };
