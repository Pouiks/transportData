// src/controllers/dataController.js
require('dotenv').config();


const transformData = (req, res) => {
    try {
        const inputData = req.body;
        console.log('Données reçues:', inputData);

        sendDataToClient(inputData)
            .then(response => {
                res.status(200).json({ message: 'Données envoyées avec succès.', response });
            })
            .catch(error => {
                console.error('Erreur dans sendDataToClient:', error);
                res.status(500).json({ error: 'Erreur lors de l\'envoi des données.' });
            });
    } catch (error) {
        console.error('Erreur dans transformData:', error);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
};


const sendDataToClient = async (dataToSend) => {
    try {
        const response = await fetch(process.env.CLIENT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.API_KEY
            },
            body: JSON.stringify(dataToSend)
        });

        const responseData = await response.json();
        console.log('Réponse du client:', responseData);
        return responseData; // Retourne la réponse pour un traitement ultérieur
    } catch (error) {
        console.error('Erreur lors de l\'envoi des données au client:', error);
        throw error; // Relance l'erreur pour la gérer ailleurs
    }
};


const updateData = async (req, res) => {
    try {
        const inputData = req.body;

        const response = await fetch(process.env.CLIENT_URL, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.API_KEY
            },
            body: JSON.stringify(inputData)
        });

        const responseData = await response.json();
        console.log('Réponse du client:', responseData);

        res.status(200).json({ message: 'Données mises à jour avec succès.', responseData });
    } catch (error) {
        console.error('Erreur lors de la mise à jour des données:', error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour des données.' });
    }
};




module.exports = { transformData, updateData };
