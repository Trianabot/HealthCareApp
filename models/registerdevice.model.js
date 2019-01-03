const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RegisterDeviceSchema = new Schema({
    deviceId: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    version: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    deviceMetaData: {
        type: String,
        required: false
    },
    sysCreatedBy: {
        type: String,
        required: false
    },
    sysUpdatedBy: {
        type: String,
        required: false
    },
    sysCreatedDate: {
        type: String,
        required: false
    },
    sysUpdatedDate: {
        type: String,
        required: false
    },
    VersionNumber: {
        type: Number,
        required: true
    }

});

module.exports = mongoose.model('DeviceInfo',RegisterDeviceSchema);