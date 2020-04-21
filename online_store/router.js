const { Router } = require("express");
const OnlineStore = require("./model");
const ProductOnlineStore = require("../product_online_store/model");

const router = new Router();

router.post("/online_store", async function (req, res, next) {
  const { link, productId, countryId } = req.body;
  try {
    const sameStore = await OnlineStore.findOne({
      where: {
        link: link,
        countryId: countryId,
      },
    });
    const newOnlineStore = sameStore
      ? sameStore
      : { link: link, countryId: countryId };
    const createdStore = await OnlineStore.create(newOnlineStore);
    const join = await ProductOnlineStore.create({
      productId,
      onlineStoreId: createdStore.id,
    });
    res.send(createdStore);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
