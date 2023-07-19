const { Country } = require('../db.js');
const axios = require('axios');

// Función asincrónica para cargar datos desde la API a la base de datos.
async function loadApi() {
  // Verificamos si ya hay datos en la base de datos.
  const validationDB = await Country.findAll();
  if (validationDB.length === 0) {
    // Si no hay datos en la base de datos, hacemos una solicitud a la API.
    axios.get('http://localhost:5000/countries').then(({ data }) => {
      const countries = [];
      data.forEach((country) => {
        // Mapeamos los datos obtenidos desde la API para crear objetos que se insertarán en la base de datos.
        const newCountry = {
          id: country.cca3,
          name: country.name.common.toUpperCase(),
          flag: country.flags.png,
          continent: country.continents[0],
          capital: Array.isArray(country.capital) ? country.capital[0] : 'Sin Capital',
          sub_region: country.subregion ? country.subregion : 'Sin subregion',
          area: country.area,
          population: country.population,
        };
        countries.push(newCountry);
      });

      // Insertamos los datos mapeados en la base de datos utilizando el método bulkCreate.
      Country.bulkCreate(countries)
        .then(() => {
          console.log('DB cargada correctamente');
        })
        .catch((error) => {
          console.log(error.message);
        });
    });
  }

  // Si ya hay datos en la base de datos, mostramos un mensaje informativo.
  console.log('DB cargada correctamente');
}

module.exports = { loadApi };
