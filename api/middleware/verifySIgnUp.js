const db = require("../models");
const User = db.user;
const UserMeta = db.userMeta

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    User.findAll({ where: { user_name: req.body.user_name } })
        .then(data => {
            if (data.length == 0) {
                User.findAll({ where: { first_name: req.body.first_name } })
                    .then(data => {
                        if (data.length == 0) {
                            User.findAll({ where: { last_name: req.body.last_name } })
                                .then(data => {
                                    if (data.length == 0) {
                                        UserMeta.findAll({ where: { mobile_number: req.body.mobile_number } })
                                                .then(data => {
                                                    if (data.length == 0) {
                                                        UserMeta.findAll({ where: { email_id: req.body.email_id } })
                                                                .then(data => {
                                                                    if (data.length == 0) {
                                                                        next()
                                                                    } else {
                                                                        res.status(400).send({
                                                                            status: false,
                                                                            message: "Failed! Email is already in use!"
                                                                        });
                                                                    }
                                                                })
                                                                .catch(err => {
                                                                    res.status(500).send({
                                                                        status: false,
                                                                        message: err.message || "Some error occurred while retrieving tutorials."
                                                                    });
                                                                });
                                                    } else {
                                                        res.status(400).send({
                                                            status: false,
                                                            message: "Failed! mobile_number is already in use!"
                                                        });
                                                    }
                                                })
                                                .catch(err => {
                                                    res.status(500).send({
                                                        status: false,
                                                        message: err.message || "Some error occurred while retrieving tutorials."
                                                    });
                                                });     
                                    } else {
                                        res.status(400).send({
                                            status: false,
                                            message: "Failed! last_name is already in use!"
                                        });
                                    }
                                })
                                .catch(err => {
                                    res.status(500).send({
                                        status: false,
                                        message: err.message || "Some error occurred while retrieving tutorials."
                                    });
                                });      
                        } else {
                            res.status(400).send({
                                status: false,
                                message: "Failed! first_name is already in use!"
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            status: false,
                            message: err.message || "Some error occurred while retrieving tutorials."
                        });
                    });
            } else {
                res.status(400).send({
                    status: false,
                    message: "Failed! Username is already in use!"
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


const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;


