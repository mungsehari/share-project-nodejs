const express = require("express");
const Joi = require("joi");
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  return res.send("Hello, world!");
});

app.post("/api/sign-up", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.ref("password"),
  });
  const { error } = schema.validate(req.body);
  if (!!error) return res.status(400).json({ error: error.details[0].message });

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match." });
  }
  return res.json({ massage: "Otp" });
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = app;
