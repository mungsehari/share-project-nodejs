const router = require("express").Router();

const AuthController = require("./controllers/auth-controller");
const userModel = require("./model/user-model");
const AuthService = require("./services/auth-service");

const authService = new AuthService(userModel);
const authController = new AuthController(authService);

router.post("/auth/sign-up", (req, res, next) =>
  authController.signUp(req, res, next)
);
router.post("/auth/login", (req, res, next) =>
  authController.login(req, res, next)
);

module.exports = router;
