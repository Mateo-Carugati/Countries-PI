const {Country} = require('../db');
const {Op} = require('sequelize');

const findCountries = async(name) => await Country.findAll({
    where: {name: {[Op.iLike]: `%${name}%`}}
});

module.exports = findCountries;