const { Router } = require("express");
const User = require("./model");
const bcrypt = require("bcrypt");
const router = new Router();

// add new user = signup
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

// get all users for testing
// router.get("/user", async (req, res, next) => {
//   try {
//     const users = await User.findAll();
//     if (!users.length) {
//       res
//         .status(404)
//         .send({ message: "No users yet" })
//         .end();
//     }
//     res.send(users);
//   } catch (error) {
//     next(error);
//   }
// });

// get one user info
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
