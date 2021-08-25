const sql = require("./db.js");
var jwt = require("jsonwebtoken");
// constructor
const User = function (user) {
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.mobile_number = user.mobile_number;
    this.email_id = user.email_id;
    this.user_name = user.user_name;
    this.password = user.password;
    this.verification_code = user.verification_code;
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        var token = jwt.sign({ id: res.insertId }, 'releife_app', {
            expiresIn: 86400 // 24 hours
        });
        result(null, { id: res.insertId, token: token, ...newUser });
    });
};

User.findById = (userId, result) => {
    sql.query(`SELECT * FROM users WHERE id = ${userId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found product with the id
        result({ kind: "not_found" }, null);
    });
};

User.findOne = (query, result) => {
    sql.query(`SELECT * FROM users WHERE ${query}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // not found product with the id
        result({ kind: "not_found" }, null);
    });
}



module.exports = User;