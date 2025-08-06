const authRouter = require("express").Router();
const userController = require("../controllers/userController");
const verifyJWT = require("../middleware/verifyJWT");

authRouter.post("/register", userController.registerController);
authRouter.post("/login", userController.loginController);
authRouter.post("/logout", userController.loggedOutController);
authRouter.get("/home",  userController.homeController);

module.exports = authRouter;
