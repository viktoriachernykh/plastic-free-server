const request = require("superagent");
const { Router } = require("express");
const Store = require("./model");
const Product = require("../product/model");
const Join = require("../join/model");
// const { auth } = require("../authentication/authMiddleware");
const router = new Router();
const { Op } = require("sequelize");

router.post("/store", async function(req, res, next) {
  const { newStore, userId, productId } = req.body;
  googleId = newStore.google_place_id;
  const sameStore = await Store.findOne({
    where: {
      address: newStore.address
    }
  });
  if (sameStore) {
    try {
      const join = await Join.create({
        productId,
        storeId: sameStore.id
      });
      res.send(sameStore);
    } catch (error) {
      next(error);
    }
  } else {
    try {
      const googleRequest = await request(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${googleId}&fields=name,opening_hours,rating,formatted_phone_number&key=${process.env.API_KEY}`
      );
      const updatedStore = {
        ...newStore,
        name: googleRequest.body.result.name
        // opening_hours: googleRequest.body.result.opening_hours.weekday_text
      };
      const createdStore = await Store.create(updatedStore);
      const join = await Join.create({
        productId,
        storeId: createdStore.id
      });
      res.send(createdStore);
    } catch (error) {
      next(error);
    }
  }
});

router.get("/store", async (req, res, next) => {
  const limit = Math.min(req.query.limit || 5, 100);
  const offset = req.query.offset || 0;
  try {
    const stores = await Store.findAndCountAll({
      limit,
      offset,
      include: [{ model: Product, as: "Product" }]
    });
    res.send(stores);
  } catch (error) {
    next(error);
  }
});

router.get("/store/:id", async (req, res, next) => {
  const storeId = req.params.id;
  try {
    const store = await Store.findByPk(storeId, {
      include: [{ model: Product, as: "Product" }]
    });
    res.send(store);
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
