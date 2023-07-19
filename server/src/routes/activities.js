const express = require('express');
const router = express.Router();
const {postActivity, getActivity} = require('../handlers/handleActivities');

router.post('/', postActivity);
router.get('/', getActivity);

module.exports = router;