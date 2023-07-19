const { STATUS_OK, STATUS_ERROR, SERVER_ERROR } = require('../utilities/statusCodes');
const { findCountries, findAllCountries, obtainCountriesActivities } = require('../controllers/index');

// Función asincrónica para obtener todos los países.
async function getAllCountries(req, res) {
    try {
        // Obtenemos todos los países desde la base de datos.
        const countries = await findAllCountries();

        // Si no se encontraron países, devolvemos un mensaje de error.
        if (!countries) return res.status(Number(STATUS_ERROR)).json({ error: "Countries weren't found" });

        // Mapeamos los datos necesarios de cada país para enviar en la respuesta.
        let formattedCountries = countries.map(country => {
            return {
                id: country.id,
                flag: country.flag,
                name: country.name,
                continent: country.continent,
                population: country.population,
                activities: country.activities
            };
        });

        // Enviamos una respuesta exitosa con todos los países.
        return res.status(Number(STATUS_OK)).json(formattedCountries);
    } catch (error) {
        // Si ocurrió un error durante el proceso, enviamos un mensaje de error del servidor.
        res.status(Number(SERVER_ERROR)).json({ error: error.message });
    }
};

// Función asincrónica para obtener países por nombre.
async function getCountryQuery(req, res) {
    try {
        // Obtenemos el nombre del país desde los parámetros de la consulta.
        const { name } = req.query;

        // Verificamos si el nombre del país está presente en la consulta.
        if (!name) return res.status(Number(STATUS_ERROR)).json({ error: "The required information is missing" });
        
        // Buscamos los países que coincidan con el nombre proporcionado.
        const countries = await findCountries(name);
        
        // Enviamos una respuesta exitosa con los países encontrados.
        return res.status(Number(STATUS_OK)).json(countries);
    } catch (error) {
        // Si ocurrió un error durante el proceso, enviamos un mensaje de error del servidor.
        res.status(Number(SERVER_ERROR)).json({ error: error.message });
    }
};

// Función asincrónica para obtener un país por su ID.
async function getCountryByID(req, res) {
    try {        
        // Obtenemos el ID del país desde los parámetros de la ruta.
        const { idPais } = req.params;

        // Verificamos si el ID del país está presente en la ruta.
        if (!idPais) return res.status(Number(STATUS_ERROR)).json({ error: "The required information is missing" });

        // Obtenemos el país junto con sus actividades asociadas por su ID.
        const country = await obtainCountriesActivities(idPais);

        // Enviamos una respuesta exitosa con el país encontrado.
        return res.status(Number(STATUS_OK)).json(country[0]);
    } catch (error) {
        // Si ocurrió un error durante el proceso, enviamos un mensaje de error del servidor.
        res.status(Number(SERVER_ERROR)).json({ error: error.message });
    }
};

module.exports = {
    getAllCountries,
    getCountryQuery,
    getCountryByID
};
