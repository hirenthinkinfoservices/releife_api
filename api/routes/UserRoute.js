const { authJwt, verifySignUp } = require("../middleware");

module.exports = app => {
    const users = require("../controllers/UserController.js");

    app.post("/register", [verifySignUp.checkUserTableExistOrNot], [verifySignUp.checkDuplicateUsernameOrEmail], users.create);

    app.post("/verifyOtp", [authJwt.verifyToken], users.verifyOtp);

    app.get("/user", [authJwt.verifyToken], users.getUser);

};