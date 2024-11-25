const { exec } = require('child_process');
const path = require('path'); // Import pour résoudre les chemins
require('dotenv').config();

const sendDataWithCurl = () => {
    // Résolution du chemin absolu vers data.json
    const dataFilePath = path.resolve(__dirname, './data.json');

    if (!process.env.CLIENT_URL) {
        console.error('Erreur : CLIENT_URL n\'est pas défini dans le fichier .env.');
        return;
    }

    const command = `
        curl -k -X POST ${process.env.CLIENT_URL} \
        -H "Content-Type: application/json" \
        -d @${dataFilePath}
    `;

    console.log(`Exécution de la commande : ${command.trim()}`);

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erreur lors de l'exécution de cURL : ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Erreur dans la réponse cURL : ${stderr}`);
            return;
        }
        console.log(`Réponse cURL : ${stdout}`);
    });
};

sendDataWithCurl();
