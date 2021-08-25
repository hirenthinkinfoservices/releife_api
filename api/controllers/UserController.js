const User = require("../models/UserModel.js");
var md5 = require('md5');

exports.create = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var verificationCode = Math.floor(100000 + Math.random() * 900000);
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        mobile_number: req.body.mobile_number,
        email_id: req.body.email_id,
        user_name: req.body.user_name,
        password: md5(req.body.password),
        verification_code: md5(verificationCode)
    });

    User.create(user, (err, data) => {
        if (err) {
            res.status(500).send({
                status: false,
                message: err.message || "Some error occurred while creating the user."
            });
        } else {
            data.verification_code = verificationCode;
            data.status = true
            res.send(data);
        }
    });

};

exports.getUser = (req, res) => {

    User.findById(req.userId, (err, data) => {
        if (err) {
            res.status(500).send({
                status: false,
                message:
                    err.message || "Some error occurred while getting details."
            });
        } else {
            delete data.password;
            delete data.verification_code;
            res.send(data);
        }
    });

};

exports.verifyOtp = (req, res) => {

    var verification_code = md5(parseFloat(req.body.verification_code))

    User.verifyOtp(req.userId, verification_code, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: false,
                    message: `Not found`
                });
            } else {
                res.status(500).send({
                    status: false,
                    message:
                        err.message || "Some error occurred while sending code."
                });
            }
        } else {
            delete data.password;
            delete data.verification_code;
            res.send(data);
        }
    });

};