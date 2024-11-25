const data = require('./data.json');
const data2 = require('./data2.json');
require('dotenv').config();


const sendDataToClient = async (dataToSend) => {
    console.log(dataToSend);
    fetch(process.env.CLIENT_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.API_KEY
        },
        body: JSON.stringify(dataToSend)// Convertir en JSON string
    })
        .then(response => response.json())
        .then(data => console.log('Réponse du client:', data))
        .catch(error => console.error('Erreur lors de l\'envoi des données au client:', error));
};

const updateData = async (req, res) => {
    const inputData = req.body;
    console.log("Data à Update:", req.body);
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

updateData();
// sendDataToClient(data);

module.exports = { sendDataToClient, updateData };
