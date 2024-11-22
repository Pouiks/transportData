// src/controllers/dataController.js

// Fonction pour transformer les données
const transformData = (req, res) => {
    try {
        // Exemple : Transformation de données reçues
        const inputData = req.body;
        console.log('Donnée recu: ',inputData)
        if (!inputData || Object.keys(inputData).length === 0) {
            return res.status(400).json({ error: 'Aucune donnée reçue.' });
        }

        // Transformation fictive : Ajoute un champ "transformed" à l'objet
        const transformedData = {
            ...inputData,
            transformed: true,
            timestamp: new Date().toISOString() // Ajout d'un timestamp
        };

        // Envoie la réponse avec les données transformées
        res.status(200).json({
            message: 'Données transformées avec succès.',
            data: transformedData
        });
    } catch (error) {
        console.error('Erreur dans transformData:', error);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
};

module.exports = { transformData };
