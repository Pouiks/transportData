const data = require('./data.json');
require('dotenv').config();


const sendDataToClient = async (dataToSend) => {
    console.log(dataToSend);
    fetch(process.env.CLIENT_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.API_KEY
        },
        body: dataToSend // Convertir en JSON string
    })
        .then(response => response.json())
        .then(data => console.log('Réponse du client:', data))
        .catch(error => console.error('Erreur lors de l\'envoi des données au client:', error));
};

sendDataToClient(data);

module.exports = { sendDataToClient };
