const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LoginSchema = new Schema({
        userName: {
            type: String,
            required: true
        },
        emailid: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        passwordattempts: {
            type: Number,
            required: true
        },
        isLocked: {
            type: Boolean,
            required: false
        },
        sysCreatedDate: {
            type: String,
            required: true
        },
        sysUpdatedDate: {
            type: String,
            required: true
        },
        User_type: {
            type: String,
            required: true
        },
        Patient_Doctor_id: {
            type: String,
            required: true
        },
        VersionNumber: {
            type: Number,
            required: true
        }
        
});


module.exports = mongoose.model('Logininfo',LoginSchema);