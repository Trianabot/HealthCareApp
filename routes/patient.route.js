const express = require('express');
const router = express.Router();

const patient_controller = require('../controllers/patient.controller');

router.get('/testpatient',patient_controller.testpatient);


module.exports = router;