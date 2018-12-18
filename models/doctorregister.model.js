const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

let DoctorRegisterSchema = new Schema({
    doctorid: {
        type: String,
        required: true
    },
    doctorname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    emailid: {
        type: String,
        required: true,
        unique: true
    },
    qualification: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    awards: {
        type: String,
        required: true
    },
    syscreatedby: {
        type: String,
        required: false
    },
    sysupdatedby: {
        type: String,
        required: false
    },
    syscreateddate: {
        type: String,
        required: false
    },
    sysupdateddate: {
        type: String,
        required: false
    },
    versionnumber: {
        type: Number,
        required: true
    }


});



// Custom validation for email
DoctorRegisterSchema.path('emailid').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,13}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

module.exports = mongoose.model('Doctor',DoctorRegisterSchema)