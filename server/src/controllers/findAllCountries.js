const {Activity ,Country} = require('../db');

const findAllCountries = async() => await Country.findAll({
    include: [{model: Activity, attributes:["name"],
    through: {attributes: []}}]
});

module.exports = findAllCountries;