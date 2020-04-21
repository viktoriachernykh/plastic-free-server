const { Router } = require("express");
const ProductOnlineStore = require("./model");
const router = new Router();

router.post("/product_online_store", async function (req, res, next) {
  try {
    const join = await ProductOnlineStore.create(req.body);
    res.send(join);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
