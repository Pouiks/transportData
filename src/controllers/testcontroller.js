require('dotenv').config();

// Fonction pour diviser un tableau en lots
const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
};

// Fonction pour envoyer des lots de données
const sendChunks = async (data, chunkSize) => {
    const chunks = chunkArray(data, chunkSize);

    for (let i = 0; i < chunks.length; i++) {
        console.log(`Envoi du lot ${i + 1}/${chunks.length}`);
        try {
            const response = await fetch(process.env.CLIENT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': process.env.API_KEY
                },
                body: JSON.stringify(chunks[i])
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status} ${response.statusText}`);
            }

            console.log(`Réponse du lot ${i + 1}:`, await response.json());
        } catch (error) {
            console.error(`Erreur lors de l'envoi du lot ${i + 1}:`, error);
        }
    }
};

// Fonction `transformData` avec division en lots
const transformData = async (req, res) => {
    try {
        const inputData = req.body;
        console.log('Données reçues:', inputData);

        // Définir la taille du lot (par exemple, 1000 objets)
        const chunkSize = 1000;

        await sendChunks(inputData, chunkSize);

        res.status(200).json({ message: 'Données envoyées par lots avec succès.' });
    } catch (error) {
        console.error('Erreur dans transformData:', error);
        res.status(500).json({ error: 'Erreur lors de la transformation des données.' });
    }
};

// Fonction `updateData` pour mettre à jour des données en une seule requête
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
