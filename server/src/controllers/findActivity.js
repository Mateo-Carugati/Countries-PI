const {Activity} = require('../db');

const findActivity = async(name) => await Activity.findAll({where: {name: name}});

module.exports = findActivity;