const express = require("express");
const app = express();

const userRoutes = require("./src/controllers/UserController")
app.use("/user",userRoutes)

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Port stated on port ${PORT}`);
});
