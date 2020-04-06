const { Router } = require("express");
const JoinProductStore = require("./model");
const router = new Router();

router.post("/JoinProductStore", async function (req, res, next) {
  try {
    const join = await JoinProductStore.create(req.body);
    res.send(join);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
