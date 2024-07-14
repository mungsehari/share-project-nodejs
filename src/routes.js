const router = require("express").Router();
const AuthController = require("./controllers/auth-controller");

const authController = new AuthController();

router.post("/auth/sign-up", authController.signUp);

module.exports = router;
