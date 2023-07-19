const { STATUS_OK, STATUS_ERROR, SERVER_ERROR } = require('../utilities/statusCodes');
const { createActivity, getActivities, findCountryById, linkActivityToCountry, findActivity } = require('../controllers/index');

// Función asincrónica para crear una nueva actividad.
async function postActivity(req, res) {
    try {
        // Extraemos la información de la actividad del cuerpo de la solicitud.
        const { name, difficulty, duration, season, countryID } = req.body;
        // Verificamos si todos los campos requeridos están presentes.
        if (!name || !difficulty || !duration || !season || countryID.length === 0) 
            return res.status(Number(STATUS_ERROR)).json({ error: "The required information is missing" });

        // Verificamos si la actividad ya existe en la base de datos.
        const exist = await findActivity(name);
        if (exist.length !== 0) return res.status(Number(STATUS_ERROR)).json({ error: "The activity already exists" });
        
        // Creamos la nueva actividad en la base de datos.
        const activity = await createActivity(name, difficulty, duration, season);

        // Buscamos los países por sus IDs proporcionados.
        let countries = await findCountryById(countryID);
        // Vinculamos la actividad recién creada a cada país encontrado.
        countries.forEach(async (id) => await linkActivityToCountry(id, activity));
        
        // Si ocurrió algún error durante la creación de la actividad, devolvemos un mensaje de error.
        if (!activity) return res.status(Number(SERVER_ERROR)).json({ error: "There was an error while creating the activity" });

        // Enviamos una respuesta exitosa con la actividad creada.
        return res.status(Number(STATUS_OK)).json(activity);
    } catch (error) {
        // Si ocurrió un error durante el proceso, enviamos un mensaje de error del servidor.
        res.status(Number(SERVER_ERROR)).json({ error: error.message });
    }
};

// Función asincrónica para obtener todas las actividades.
async function getActivity(req, res) {
    try {
        // Obtenemos todas las actividades desde la base de datos.
        const activities = await getActivities();

        // Si ocurrió algún error durante la obtención de las actividades, devolvemos un mensaje de error.
        if (!activities) return res.status(Number(STATUS_ERROR)).json({ error: "There was an error trying to get the activities" });

        // Enviamos una respuesta exitosa con todas las actividades obtenidas.
        return res.status(Number(STATUS_OK)).json(activities);
    } catch (error) {
        // Si ocurrió un error durante el proceso, enviamos un mensaje de error del servidor.
        res.status(Number(SERVER_ERROR)).json({ error: error.message });
    }
};

module.exports = {
    postActivity,
    getActivity
};
