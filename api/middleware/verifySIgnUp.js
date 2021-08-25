const User = require("../models/UserModel.js");

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    User.findOne(`user_name = '${req.body.user_name}'`, (err, data) => {
        if (err) {
            User.findOne(`email_id = '${req.body.email_id}'`, (err, res1) => {
                if (err) {
                    next();
                } else {
                    res.status(400).send({
                        status: false,
                        message: "Failed! Email is already in use!"
                    });
                    return;
                }
            });
        } else {
            res.status(400).send({
                status: false,
                message: "Failed! Username is already in use!"
            });
            return;
        }
    });
};

checkUserTableExistOrNot = (req, res, next) => {
    // Username
    User.checkTableIsExist('users', (err, data) => {
        if (err) {
            res.status(400).send({
                status: false,
                message: "Something went wrong!"
            });
        } else {
            console.log(data.namesCount);
            if (data.namesCount == 0) {
                User.createUserTable((err, data) => {
                    if (err) {
                        if (err.kind === "not_found") {
                            res.status(404).send({
                                status: false,
                                message: `Not found`
                            });
                        } else {
                            res.status(500).send({
                                status: false,
                                message: "Something went wrong"
                            });
                        }
                    } else {
                        next()
                    }
                })
            } else {
                next()
            }
        }
    });
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail, checkUserTableExistOrNot
};

module.exports = verifySignUp;