const { Router } = require("express");
const User = require("../user/model");
const bcrypt = require("bcrypt");
const { toJWT } = require("./jwt");

const router = new Router();

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(401)
      .send({ message: "Provide valid email and password" })
      .end();
  }
  try {
    const user = await User.findOne({
      where: {
        email: email
      }
    });
    if (!user) {
      res
        .status(401)
        .send({ message: "User with that email does not exist" })
        .end();
    } else if (bcrypt.compareSync(password, user.password)) {
      const { password, ...userData } = user.dataValues;
      res
        .send({
          message: "Login successful.",
          jwt: toJWT({ userId: user.id }),
          userData: { ...userData }
        })
        .end();
    } else {
      res
        .status(401)
        .send({ message: "Password incorrect" })
        .end();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
