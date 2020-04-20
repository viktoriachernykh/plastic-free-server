const request = require("superagent");
const { Router } = require("express");
const OnlineStore = require("../store_online/model");
const Country = require("../country/model");

const router = new Router();

router.post("/store_online", async function (req, res, next) {
  // const countriesId = req.params.id
  try {
    const onlineStore = await OnlineStore.create(req.body);
    res.send(onlineStore);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
