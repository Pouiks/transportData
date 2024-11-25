const https = require('https'); // Module pour configurer l'agent HTTPS
const data = require('./data.json');
require('dotenv').config();

// Création d'un agent HTTPS qui ignore la vérification du certificat
const agent = new https.Agent({
    rejectUnauthorized: false, // Désactive la vérification SSL
});

const sendDataToClient = async (dataToSend) => {
    console.log(data);
    fetch(process.env.CLIENT_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend), // Convertir en JSON string
        agent, // Ajout de l'agent HTTPS pour ignorer le certificat
    })
        .then(response => response.json())
        .then(data => console.log('Réponse du client:', data))
        .catch(error => console.error('Erreur lors de l\'envoi des données au client:', error));
};

sendDataToClient(data);

module.exports = { sendDataToClient };
