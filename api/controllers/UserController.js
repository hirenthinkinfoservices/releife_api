var md5 = require('md5');
const db = require("../models");
const User = db.user;
var jwt = require("jsonwebtoken");

exports.create = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    var verificationCode = Math.floor(100000 + Math.random() * 900000);
    const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        mobile_number: req.body.mobile_number,
        email_id: req.body.email_id,
        user_name: req.body.user_name,
        password: md5(req.body.password),
        verification_code: md5(verificationCode)
    };
    User.create(user)
        .then(data => {
            var token = jwt.sign({ id: data.id }, 'releife_app', {
                expiresIn: 86400 // 24 hours
            });
            data.verification_code = verificationCode;
            var data = {
                status: true,
                token: token,
                userData: data
            }
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                status: false,
                message: err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

exports.getUser = (req, res) => {

    User.findAll({ where: { id: req.userId, } })
        .then(data => {
            if (data.length != 0) {
                delete data.password;
                delete data.verification_code;
                res.send(data[0]);
            } else {
                res.status(400).send({
                    status: false,
                    message: "User not found!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                status: false,
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

exports.verifyOtp = (req, res) => {

    var verification_code = md5(parseFloat(req.body.verification_code))

    User.update({ status: 'active' }, {
        where: { id: req.userId, verification_code: verification_code }
    }).then(num => {
        if (num == 1) {
            res.send({
                "success": true,
                "message": "code verify successfully."
            });
        } else {
            res.send({
                "success": false,
                "message": "Incorrect code."
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error updating Tutorial with id=" + id
        });
    });
};