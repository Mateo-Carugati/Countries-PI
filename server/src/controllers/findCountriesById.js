const {Country} = require('../db');

const findCountryById = async(id) => await Country.findAll({where: {id: id}});

module.exports = findCountryById;