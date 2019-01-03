const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let PatientDeviceSchema = new Schema({
        patientid: {
            type: String,
            required: true 
        },
        deviceid: {
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


 module.exports = mongoose.model('PatientDevice',PatientDeviceSchema);