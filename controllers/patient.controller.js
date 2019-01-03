const PatientRegister = require('../models/patientregister.model');
const DeviceRegisterModel = require('../models/registerdevice.model');
const PatientDeviceModel = require('../models/patientdevice.model');
const PatientDoctorModel = require('../models/patientdoctor.model');
const uuid = require('uuid4');

exports.testpatient = (req, res) => {
    res.send('this is patient data');
}

/** Register the device by patient */
exports.register_device = (req, res, next) => {
    var id = uuid();
    try {
        if (req.body.usertype == "Patient") {
            let registerdevice = new DeviceRegisterModel(
                {
                    deviceId: id,
                    name: req.body.devicename,
                    type: req.body.devicetype,
                    version: req.body.deviceversion,
                    status: req.body.status,
                    deviceMetaData: req.body.devicemetadata,
                    sysCreatedBy: req.body.syscreatedby,
                    sysUpdatedBy: req.body.sysupdatedby,
                    sysCreatedDate: new Date(),
                    sysUpdatedDate: new Date(),
                    VersionNumber: req.body.versionumber
                }
            )

            registerdevice.save((err, devicedata) => {
                    if(!err){
                        patientdevice(req,devicedata);
                    }else {
                        return next(err);
                    }
            })
        } else {
            res.send({message :'Something Wrong'});
        }
    } catch (e) {
        log.error('Route /users/ failed with error', e);
        res.status(500).send(e);
    }

    function patientdevice(reqs,devicedata) {
        let patientdeviceinfo = new PatientDeviceModel(
            {
                patientid: reqs.body.patientid,
                deviceid: id,
                enable: false,
                deleted: false,
                deletedby: "patient",
                sysCreatedDate: new Date(),
                sysUpdatedDate: new Date()
            }
        );

        patientdeviceinfo.save((err,patientdevicedata) => {
            if(!err) {
                let body = {
                    status: true,
                    message : "Device registered and added successfully",
                    device_data : devicedata,
                    patient_device : patientdevicedata
                }
                res.send(body);
            }else {
                return next(err);
            }
        })
    }
} 
