const request = require("superagent");
const { Router } = require("express");
const Store = require("./model");
const Product = require("../product/model");
const Connect = require("../connect/model");
// const { auth } = require("../authentication/authMiddleware");
const router = new Router();
const { Op } = require("sequelize");

// router.post("/store", auth, async function(req, res, next) {
router.post("/store", async function(req, res, next) {
  googleId = req.body.google_place_id;
  // console.log("my store", req.body);
  try {
    request(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${googleId}&fields=name,opening_hours,rating,formatted_phone_number&key=${process.env.API_KEY}`
    )
      // .then(res => console.log("=====GOOGLE RES=====", res.body));
      .then(res => {
        const newStore = {
          ...req.body,
          name: res.body.result.name,
          opening_hours: res.body.result.opening_hours.weekday_text
        };
        console.log("newStore!!!!!!!!!", newStore);

        const store = Store.create(newStore).then(res =>
          console.log("res", res)
        );
        // res.send(res.body);
      });
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

router.get("/store/find/:keyword", async (req, res, next) => {
  const keyword = req.params.keyword;
  try {
    const store = await Store.findAll({
      where: {
        name: { [Op.iLike]: `%${keyword}%` }
      }
    });
    if (!store.length > 0) {
      res.status(404).send({ message: "Store with this name doesn't exist" });
    } else {
      res.send(store);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
