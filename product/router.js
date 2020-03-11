const { Router } = require("express");
const Product = require("./model");
const Connect = require("../connect/model");
const Store = require("../store/model");
// const { auth } = require("../authentication/authMiddleware");
const router = new Router();
const { Op } = require("sequelize");

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
  const limit = Math.min(req.query.limit || 5, 100);
  const offset = req.query.offset || 0;
  try {
    const products = await Product.findAndCountAll({
      limit,
      offset
    });
    res.send(products);
  } catch (error) {
    next(error);
  }
});

router.get("/product/:id", async (req, res, next) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId);
    const productConnections = await Connect.findAll({
      where: { productId: productId }
    });
    const productStoresId = await productConnections.map(c => c.storeId);
    const stores = await Store.findAll({
      where: { id: productStoresId }
    });
    const data = { product, stores };
    res.send(data);
  } catch (error) {
    next(error);
  }
});

router.get("/product/find/:keyword", async (req, res, next) => {
  const keyword = req.params.keyword;
  try {
    const product = await Product.findAll({
      where: { name: { [Op.iLike]: `%${keyword}%` } }
    });
    if (!product.length > 0) {
      res.status(404).send({ message: "Product with this name doesn't exist" });
    } else {
      res.send(product);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
