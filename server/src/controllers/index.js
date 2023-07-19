const createCountries = require('./createCountries');
const findCountries = require('./findCountries');
const findCountryById = require('./findCountriesById');
const createActivity = require('./createActivity');
const getActivities = require('./findAllActivities');
const findAllCountries = require('./findAllCountries');
const linkActivityToCountry = require('./linkActivityToCountry');
const obtainCountriesActivities = require('./obtainCountriesActivities');
const findActivity = require('./findActivity');

module.exports = {
    createCountries,
    findCountries,
    findCountryById,
    findAllCountries,
    createActivity,
    findActivity,
    getActivities,
    linkActivityToCountry,
    obtainCountriesActivities
};