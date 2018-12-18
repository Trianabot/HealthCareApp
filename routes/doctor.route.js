const express = require('express');
const router = express.Router();

const doctor_controller = require('../controllers/doctor.controller');

router.get('/testdoctor',doctor_controller.testdoctor);


module.exports = router;