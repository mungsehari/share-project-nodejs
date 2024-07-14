const express = require("express");
const app = express();
const router = require("./routes");

app.use(express.json());
app.use("/api", router);
app.get("/", (req, res) => {
  return res.send("Hello, world!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = app;
