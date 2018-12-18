const express = require('express');
const router = express.Router();

const logininfo_controller = require('../controllers/logininfo.controller');

router.get('/test',logininfo_controller.testuser);

router.post('/register',logininfo_controller.registeruser);

router.post('/authenticate', logininfo_controller.authenticate_user);

router.post('/addpatientdoctor', logininfo_controller.patient_doctor);

router.post('/getuserlist', logininfo_controller.getusers_list);

module.exports = router;