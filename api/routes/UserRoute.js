const { authJwt, verifySignUp } = require("../middleware");

module.exports = app => {
    const users = require("../controllers/UserController.js");

    app.post("/api/register", [verifySignUp.checkDuplicateUsernameOrEmail], users.create);

    app.post("/api/login", users.login);

    app.post("/api/verifyOtp", [authJwt.verifyToken], users.verifyOtp);

    app.get("/api/user", [authJwt.verifyToken], users.getUser);

};