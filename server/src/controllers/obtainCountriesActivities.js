const {Activity, Country} = require('../db');

const obtainCountriesActivities = async(id) => await Country.findAll({where: {id: id}, 
    include: [{model: Activity, attributes: ['name', 'difficulty', 'duration', 'season'],
    through: { attributes: [] }
}]});

module.exports = obtainCountriesActivities;