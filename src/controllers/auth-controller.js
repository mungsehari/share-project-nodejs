const Joi = require("joi");

const User = require("../model/user-model");
class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  async signUp(req, res, next) {
    const { name, email, password, confirmPassword } = req.body;
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      confirmPassword: Joi.ref("password"),
    });

    const { error } = schema.validate(req.body);
    if (!!error)
      return res.status(400).json({ error: error.details[0].message });

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match." });
    }

    const userExist = await this.authService.findUserByEmail({ email });
    if (userExist) {
      return res.status(400).json({
        message: "Email already registered",
        error: "Email already registered",
      });
    }

    const user = await this.authService.createUser({
      email,
      fullName: name,
      password,
    });

    return res.json({ message: "User register successfully", user });
  }

  async login(req, res) {
    const { email, password } = req.body;
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });
    const { error } = schema.validate(req.body);
    if (!!error)
      return res.status(400).json({ error: error.details[0].message });

    return res.json({ message: "Logged in successfully" });
  }
}

module.exports = AuthController;
