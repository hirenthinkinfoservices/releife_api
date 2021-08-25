const { authJwt, verifySignUp } = require("../middleware");

module.exports = app => {
    const users = require("../controllers/UserController.js");

    app.post("/register", [verifySignUp.checkDuplicateUsernameOrEmail], users.create);


    app.get("/user", [authJwt.verifyToken], users.getUser);

};