const db = require("../models");
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    User.findAll({ where: { user_name: req.body.user_name } })
        .then(data => {
            if (data.length == 0) {
                User.findAll({ where: { email_id: req.body.email_id } })
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