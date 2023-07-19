const {Country} = require('../db');

const createCountries = (array) => array.forEach(async (element) => 
        await Country.findOrCreate({where: {id: element.id}, defaults:{
            name: element.name,
            flag: element.flag,
            continent: element.continent,
            capital: element.capital,
            sub_region: element.sub_region,
            area: element.area,
            population: element.population
        }})
    );

module.exports = createCountries;