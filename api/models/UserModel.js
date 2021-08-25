const sql = require("./db.js");
var jwt = require("jsonwebtoken");
const moment = require("moment");
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

User.checkTableIsExist = (tableName, result) => {
    sql.query(`SELECT count(*) AS namesCount FROM information_schema.TABLES  WHERE (TABLE_SCHEMA = 'reliefe_app') AND (TABLE_NAME = '${tableName}')`, (err, res) => {
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

User.createUserTable = (result) => {
    sql.query("CREATE TABLE `users` ( `id` int(255) NOT NULL AUTO_INCREMENT, `first_name` varchar(255) NOT NULL,`last_name` varchar(255) NOT NULL, `mobile_number` varchar(255) NOT NULL, `email_id` varchar(255) NOT NULL, `user_name` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `verification_code` varchar(255) NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6), `updated_at` timestamp(6) NOT NULL DEFAULT '0000-00-00 00:00:00.000000', `status` varchar(255) NOT NULL DEFAULT 'pending', PRIMARY KEY (`id`)) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        result(null, res);
        return;
    });
}

User.verifyOtp = (userId, verificationCode, result) => {
    var currentTimeStamp = moment().utc().format('YYYY-MM-DD HH:mm:ss')
    sql.query(`UPDATE users SET status = ?, updated_at = ?  WHERE id = ? AND verification_code = ?`, ['active', currentTimeStamp, userId, verificationCode], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows != 0) {
            var response = {
                "success": true,
                "message": "code verify successfully."
            }
            result(null, response);
        } else {
            var response = {
                "success": false,
                "message": "Incorrect code."
            }
            result(null, response);
        }
    });
};


module.exports = User;