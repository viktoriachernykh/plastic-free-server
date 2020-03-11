const { Router } = require("express");
const Join = require("./model");
const router = new Router();

router.post("/join", async function(req, res, next) {
  try {
    const join = await Join.create(req.body);
    res.send(join);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
