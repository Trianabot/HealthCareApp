const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let DoctorPatientSchema = new Schema({
        doctorid: {
            type: String,
            required: true 
        },
        patientid: {
            type: String,
            required: true
        },
        enable: {
            type: Boolean,
            required: true
        },
        deleted: {
            type: Boolean,
            required: false
        },
        deletedby: {
            type: String,
            required: false
        },
        sysCreatedDate: {
            type: String,
            required: true
        },
        sysUpdatedDate: {
            type: String,
            required: true
        }
 });


 module.exports = mongoose.model('DoctorPatient',DoctorPatientSchema);