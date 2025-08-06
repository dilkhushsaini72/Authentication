const { adminProductController } = require("../controllers/adminController");
const verifyJWT = require("../middleware/verifyJWT");
const adminRouter = require("express").Router();

adminRouter.get("/dashboard",verifyJWT, adminProductController);

module.exports = adminRouter;