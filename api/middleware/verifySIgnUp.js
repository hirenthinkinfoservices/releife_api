const User = require("../models/UserModel.js");

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    User.findOne(`user_name = '${req.body.user_name}'`, (err, data) => {
        if (err) {
            User.findOne(`email_id = '${req.body.email_id}'`,  (err, res1) => {
                if (err) {
                    next();
                } else {
                    res.status(400).send({
                        message: "Failed! Email is already in use!"
                    });
                    return;
                }
            });
        } else {
            res.status(400).send({
                message: "Failed! Username is already in use!"
            });
            return;
        }
    });
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;