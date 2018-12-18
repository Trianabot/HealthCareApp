const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let PatientRegisterSchema = new Schema({
    patientid: {
        type: String,
        required: true
    },
    patientname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true 
    },
    patienttype: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    emailid: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
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
    },
    deviceid: {
        type: Number,
        required: true 
    },
    emergencycontact: {
        type: Number,
        required: true
    }

});

// Custom validation for email
PatientRegisterSchema.path('emailid').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,13}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');




module.exports = mongoose.model('Patient',PatientRegisterSchema);


