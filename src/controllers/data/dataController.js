// src/controllers/data/dataController.js

// Fonction pour transformer les données
const transformData = (data) => {
    return data.map(item => ({
        id: item.id,
        res_id: item.res_id || null,
        numlot: item.numlot || null,
        lot_guid: item.lot_guid || null,
        res_guid: item.res_guid || null,
        ecco_product_number: item.ecco_product_number || null,
        ecco_residence_code: item.ecco_residence_code || null,
        ecco_space_full_id: item.ecco_space_full_id || null,
        res_name: item.res_name || null,
        res_nameshort: item.res_nameshort || null,
        type: item.type || null,
        nature: item.nature || null,
        etage: item.etage || null,
        surface_hab: item.surface_hab || null,
        surface_ter: item.surface_ter || null,
        conso: item.conso || null,
        ce: item.ce || "",
        ges: item.ges || null,
        expo: item.expo || null,
        pmr: item.pmr || "0",
        loyer_etud: item.loyer_etud || null,
        loyer_ht_etud: item.loyer_ht_etud || null,
        fdd_perc_etud: item.fdd_perc_etud || null,
        fdd_etud: item.fdd_etud || null,
        loyer_fdd_etud: item.loyer_fdd_etud || null,
        frais_admin_etud: item.frais_admin_etud || null,
        garantie_etud: item.garantie_etud || null,
        loyer_public: item.loyer_public || null,
        loyer_ht_public: item.loyer_ht_public || null,
        fdd_perc_public: item.fdd_perc_public || null,
        fdd_public: item.fdd_public || null,
        loyer_fdd_public: item.loyer_fdd_public || null,
        frais_admin_public: item.frais_admin_public || null,
        garantie_public: item.garantie_public || null,
        loyer_nuit: item.loyer_nuit || null,
        nb_pax: item.nb_pax || null,
        visible: item.visible || "True",
        date_dispo: item.date_dispo || null,
        date_dispo_minimale: item.date_dispo_minimale || null,
        status: item.status || "Actif"
    }));
};

// Contrôleur pour gérer la requête
const transformDataController = (req, res) => {
    try {
        console.log('Donnée reçue:', req.body); // Log les données dans la console
        const inputData = req.body; // Récupère les données envoyées
        const transformedData = transformData(inputData); // Transforme les données
        res.status(200).json(transformedData); // Retourne les données transformées
    } catch (error) {
        console.error("Erreur lors de la transformation des données :", error);
        res.status(500).send("Erreur lors de la transformation des données.");
    }
};

module.exports = { transformDataController };
