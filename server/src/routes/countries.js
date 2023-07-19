const express = require('express');
const router = express.Router();
const {getAllCountries, getCountryQuery, getCountryByID} = require('../handlers/handleCountries');

router.get('/', getAllCountries)
router.get('/name', getCountryQuery);
router.get('/:idPais', getCountryByID);

module.exports = router;