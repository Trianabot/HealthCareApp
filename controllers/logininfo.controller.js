const LogininfoModel = require('../models/logininfo.model');
const DoctorRegister = require('../models/doctorregister.model');
const PatientRegister = require('../models/patientregister.model');
const PatientDoctor = require('../models/patientdoctor.model');
const DoctorPatient = require('../models/doctorpatient.model');
const uuid = require('uuid4');
const jwt = require('jsonwebtoken');

exports.testuser = (req, res) => {
    res.send('this is user data');
};

/**Register the user */
exports.registeruser = (req, res, next) => {
    var id = uuid();
    if (req.body.usertype == "Doctor") {
        try {
            let doctor = new DoctorRegister(
                {
                    doctorid: id,
                    doctorname: req.body.name,
                    password: req.body.password,
                    gender: req.body.gender,
                    age: req.body.age,
                    emailid: req.body.emailid,
                    qualification: req.body.qualification,
                    specialization: req.body.specialization,
                    experience: req.body.experience,
                    awards: req.body.awards,
                    syscreatedby: req.body.syscreatedby,
                    sysupdatedby: req.body.sysupdatedby,
                    syscreateddate: new Date(),
                    sysupdateddate: new Date(),
                    versionnumber: req.body.versionnumber
                }
            );


            doctor.save((err, doctordata) => {
                if (!err) {
                    // res.send(doctordata);
                    logininfo(req, doctordata);
                }
                else {
                    if (err.code == 11000)
                        res.status(422).send({ message: 'Duplicate email adrress found.' });
                    else
                        return next(err);
                }

            });


        } catch (e) {
            log.error('Route /users/ failed with error', e);
            res.status(500).send(e);
        }

    } else if (req.body.usertype == "Patient") {
        let patient = new PatientRegister(
            {
                patientid: id,
                patientname: req.body.name,
                password: req.body.password,
                age: req.body.age,
                gender: req.body.gender,
                patienttype: req.body.patienttype,
                address: req.body.address,
                emailid: req.body.emailid,
                phone: req.body.phone,
                syscreatedby: req.body.syscreatedby,
                sysupdatedby: req.body.sysupdatedby,
                syscreateddate: new Date(),
                sysupdateddate: new Date(),
                versionnumber: req.body.versionnumber,
                deviceid: req.body.deviceid,
                emergencycontact: req.body.emergencycontact
            }
        );


        patient.save((err, patientdata) => {
            if (!err) {
                // res.send(patientdata);
                logininfo(req, patientdata);
            } else {
                if (err.code == 11000)
                    res.status(422).send({ message: 'Duplicate email adrress found.' });
                else
                    return next(err);
            }

        });

    } else {
        res.send({ message: "Usertype not valid or present" });
    }

    function logininfo(reqs, userdata) {

        var logininfo = new LogininfoModel(
            {
                userName: reqs.body.name,
                emailid: reqs.body.emailid,
                password: reqs.body.password,
                passwordattempts: 3,
                isLocked: false,
                sysCreatedDate: new Date(),
                sysUpdatedDate: new Date(),
                User_type: reqs.body.usertype,
                Patient_Doctor_id: id,
                VersionNumber: reqs.body.versionnumber
            }
        );

        logininfo.save((err, logindata) => {
            if (!err)
                res.send({ message: "user resgistered succesfully", user_data: userdata, login_data: logindata });
            else {
                if (err.code == 11000)
                    res.status(422).send({ message: 'Duplicate email adrress found.' });
                else
                    return next(err);
            }

        });
    }
};

/**Authenticating the user */

exports.authenticate_user = (req, res, next) => {
    LogininfoModel.findOne({
        emailid: req.body.emailid,
        password: req.body.password
    }, (err, user) => {
        if (err) throw err;

        if (!user) {
            res.send({ success: false, msg: 'Authentication failed. Wrong credentials' });
        } else {
            var token = jwt.sign({ emailid: user.emailid }, 'trianabot');
            var data = {
                success: true,
                msg: "Authenticated",
                emailid: user.emailid,
                userid: user.Patient_Doctor_id,
                uertype: user.User_type,
                token: token
            };
            res.send(data);
        }

    });
};

/**Patient Doctor or Doctor Patient adding */
exports.patient_doctor = (req, res, next) => {

    if (req.body.usertype == "Doctor") {

        let doctorpatient = new DoctorPatient(
            {
                doctorid: req.body.userid,
                patientid: req.body.selecteduserid,
                enable: false,
                deleted: false,
                deletedby: "doctor_patient",
                sysCreatedDate: new Date(),
                sysUpdatedDate: new Date()
            }
        );
        console.log(doctorpatient);
        doctorpatient.save((err, doctorpatientdata) => {
            if (!err)
                res.send({ message: "patient added succesfully", addeddata: doctorpatientdata });
            else {
                // res.send({message:"Patient not added"});
                return next(err);
            }
        });
    } else if (req.body.usertype == "Patient") {
        let patientdoctor = new PatientDoctor(
            {
                patientid: req.body.userid,
                doctorid: req.body.selecteduserid,
                enable: false,
                deleted: false,
                deletedby: "patient_doctor",
                sysCreatedDate: new Date(),
                sysUpdatedDate: new Date()
            }
        );

        patientdoctor.save((err, patientdoctordata) => {
            if (!err)
                res.send({ message: "Doctor added succesfully", addeddata: patientdoctordata });
            else {
                // res.send({message:"Doctor not added"});
                return next(err);
            }
        });
    } else {
        res.send({ message: "Usertype not valid or present" });
    }
}

/**Get the users list */
exports.getusers_list = (req, res, next) => {
    if (req.body.usertype == "Doctor") {
        DoctorPatient.find({ doctorid: req.body.userid }, { _id: 0 }, (err, result) => {
            if (err) {
                return next(err);
            } else if (result == [] || result == '') {
                getAllPatients(res);
            } else {
                // res.send(result);
                checkPatients(result, res, req);
            }
        })
    } else if (req.body.usertype == "Patient") {

        PatientDoctor.find({ patientid: req.body.userid }, { _id: 0 }, (err, result) => {
            if (err) {
                return next(err);
            } else if (result == [] || result == '') {
                getAllDoctors(res);
            } else {
                // res.send(result);
                checkDoctors(result, res, req);
            }
        })
    } else {
        res.send({ message: "Usertype not valid or present" });
    }

    function checkPatients(patients, res, req,next) {
        for (var i = 0; i < patients.length; i++) {
            PatientRegister.find({patientid:{ $ne: patients[i].patientid }}, { _id: 0 }, (err, result) => {
                if (err) {
                    return next(err);
                } else if (result == [] || result == '') {
                    res.send({ message: 'No data found' });
                } else {
                    res.send(result);
                }
            })
        }
    }

    function checkDoctors(doctors, res, req,next) {
        for (var i = 0; i < doctors.length; i++) {
            DoctorRegister.find({doctorid:{ $ne: doctors[i].doctorid }}, { _id: 0 }, (err, result) => {
                if (err) {
                    return next(err);
                } else if (result == [] || result == '') {
                    res.send({ message: 'No data found' });
                } else {
                    res.send(result);
                }
            })
        }
    }

    function getAllPatients(res) {
        PatientRegister.find({}, { _id: 0 }, (err, result) => {
            if (err) {
                return next(err);
            } else if (result == [] || result == '') {
                res.send({ message: 'No data found' });
            } else {
                res.send(result);
            }
        })
    }


    function getAllDoctors(res) {
        DoctorRegister.find({}, { _id: 0 }, (err, result) => {
            if (err) {
                return next(err);
            } else if (result == [] || result == '') {
                res.send({ message: 'No data found' });
            } else {
                res.send(result);
            }
        })
    }
}
