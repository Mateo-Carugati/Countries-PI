const {Activity} = require('../db');

const createActivity = async(name, difficulty, duration, season) => await Activity.create({
    name: name, difficulty: difficulty, duration: duration, season: season
});

module.exports = createActivity;