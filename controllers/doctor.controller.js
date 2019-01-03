const DoctorRegister = require('../models/doctorregister.model');
const DoctorPatientModel = require('../models/doctorpatient.model');
const PatientRegisterModel = require('../models/patientregister.model');

exports.testdoctor = (req,res) => {
    res.send('This is doctor');
}

/**Get the patients added by the doctor */
exports.getpatients = (req, res, next) => {
    DoctorPatientModel.find({doctorid: req.body.userid},{_id: 0},(err,result) => {
        if (err) {
            return next(err);
          
        }else if(result== [] || result == ''){
            res.send({message:"No data found"});
        }

        checkPatientInfo(result,res);
    });
}

function checkPatientInfo(patients,res){
    for(var i=0; i<patients.length; i++){
        PatientRegisterModel.find({patientid: patients[i].patientid},{_id: 0},(err,result) => {
            if (err) {
                return next(err);
              
            }
            res.send(result);
        });
    }
}
