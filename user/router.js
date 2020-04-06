const { Router } = require("express");
const User = require("./model");
const bcrypt = require("bcrypt");
const router = new Router();

router.post("/user", async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res
      .status(400)
      .send({
        message: "Please fill name, email and password fields"
      })
      .end();
  }
  try {
    const user = await User.create({
      name: name,
      email: email,
      password: bcrypt.hashSync(password, 10)
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.get("/user/:id", async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      res
        .status(404)
        .send({ message: "User with this ID doesn't exist" })
        .end();
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
