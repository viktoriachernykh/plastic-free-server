const { Router } = require("express");
const Product = require("./model");
// const { auth } = require("../authentication/authMiddleware");
const router = new Router();

// router.post("/product", auth, async function(req, res, next) {
router.post("/product", async function(req, res, next) {
  try {
    const product = await Product.create(req.body);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

router.get("/product", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

router.get("/product/:id", async (req, res, next) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      res
        .status(404)
        .send({ message: "Product with this ID doesn't exist" })
        .end();
    }
    res.send(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
