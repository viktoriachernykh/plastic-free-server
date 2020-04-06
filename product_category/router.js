const { Router } = require("express");
const JoinProductCategory = require("./model");
const router = new Router();

router.post("/JoinProductCategory", async function (req, res, next) {
  try {
    const join = await JoinProductCategory.create(req.body);
    res.send(join);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
