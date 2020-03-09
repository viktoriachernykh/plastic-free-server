const { Router } = require("express");
const Store = require("./model");
const Product = require("../product/model");
const Connect = require("../connect/model");
// const { auth } = require("../authentication/authMiddleware");
const router = new Router();

// router.post("/store", auth, async function(req, res, next) {
router.post("/store", async function(req, res, next) {
  // console.log(req.body);
  try {
    const store = await Store.create(req.body);
    // console.log("store created???", store);
    res.send(store);
  } catch (error) {
    next(error);
  }
});

router.get("/store", async (req, res, next) => {
  try {
    const stores = await Store.findAll();
    res.send(stores);
  } catch (error) {
    next(error);
  }
});

router.get("/store/:id", async (req, res, next) => {
  const storeId = req.params.id;
  try {
    const store = await Store.findByPk(storeId);
    if (!store) {
      res.status(404).send({ message: "Store with this ID doesn't exist" });
    } else {
      const storeProducts = await Connect.findAll({
        where: { storeId: storeId }
      });
      const storeProductsIds = storeProducts.map(connect => connect.productId);
      const allProducts = await Product.findAll();
      const products = allProducts.filter(product =>
        storeProductsIds.includes(product.id)
      );
      const data = { store, products };
      res.send(data);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
