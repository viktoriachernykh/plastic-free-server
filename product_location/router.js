const { Router } = require("express");
const ProductLocation = require("./model");
const router = new Router();

router.post("/product_location", async function (req, res, next) {
  try {
    const join = await ProductLocation.create(req.body);
    res.send(join);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
